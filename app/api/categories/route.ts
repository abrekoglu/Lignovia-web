import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  requireAdmin,
  forbiddenResponse,
  unauthorizedResponse,
} from "@/lib/api-helpers";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";

// GET /api/categories - Get category list with filtering, pagination, and search
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const parentId = searchParams.get("parentId");
    const search = searchParams.get("search");
    const isActiveParam = searchParams.get("isActive");
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");
    const includeSubcategories =
      searchParams.get("includeSubcategories") === "true";

    // Whitelist of allowed sort fields
    const allowedSortFields = ["createdAt", "updatedAt", "name", "order"];

    // Validate sortBy (if provided)
    if (sortByParam && !allowedSortFields.includes(sortByParam)) {
      return NextResponse.json(
        {
          error: `Geçersiz sıralama alanı. İzin verilen alanlar: ${allowedSortFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Use validated sortBy or default
    const sortBy =
      sortByParam && allowedSortFields.includes(sortByParam)
        ? sortByParam
        : "order"; // Default to order for categories

    // Validate sortOrder (if provided)
    const allowedSortOrders = ["asc", "desc"];
    if (
      sortOrderParam &&
      !allowedSortOrders.includes(sortOrderParam.toLowerCase())
    ) {
      return NextResponse.json(
        {
          error: `Geçersiz sıralama yönü. İzin verilen değerler: ${allowedSortOrders.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Use validated sortOrder or default
    const sortOrder =
      sortOrderParam && allowedSortOrders.includes(sortOrderParam.toLowerCase())
        ? sortOrderParam.toLowerCase()
        : "asc"; // Default to asc for categories (order field)

    // Validate and parse page parameter
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Page parametresi 1 veya daha büyük bir sayı olmalıdır." },
        { status: 400 }
      );
    }

    // Validate and parse limit parameter
    const limit = limitParam ? parseInt(limitParam, 10) : 20;
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: "Limit parametresi 1 veya daha büyük bir sayı olmalıdır." },
        { status: 400 }
      );
    }

    // Set maximum limit to prevent excessive data retrieval
    const maxLimit = 100;
    const finalLimit = limit > maxLimit ? maxLimit : limit;

    const skip = (page - 1) * finalLimit;

    // Build where clause
    const where: any = {
      deletedAt: null,
    };

    // Filter by isActive (default: true if not specified)
    if (isActiveParam !== null) {
      where.isActive = isActiveParam === "true";
    } else {
      // Default: only active categories
      where.isActive = true;
    }

    // Filter by parentId
    if (parentId !== null) {
      if (parentId === "null" || parentId === "") {
        // Root categories (no parent)
        where.parentId = null;
      } else {
        // Subcategories of specific parent
        where.parentId = parentId;
      }
    }

    // Search functionality
    if (search && search.trim() !== "") {
      const searchTerm = search.trim();
      where.AND = [
        {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { nameEn: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { descriptionEn: { contains: searchTerm, mode: "insensitive" } },
          ],
        },
      ];
    }

    // Build orderBy clause
    let orderBy: any;
    if (sortBy === "name") {
      orderBy = { name: sortOrder };
    } else if (sortBy === "order") {
      // Secondary sort by name for consistent ordering
      orderBy = [{ order: sortOrder }, { name: "asc" }];
    } else {
      orderBy = { [sortBy]: sortOrder };
    }

    // Fetch categories
    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: finalLimit,
        orderBy,
        include: {
          parent: {
            select: {
              id: true,
              name: true,
              nameEn: true,
              slug: true,
            },
          },
          subcategories: includeSubcategories
            ? {
                where: {
                  deletedAt: null,
                },
                select: {
                  id: true,
                  name: true,
                  nameEn: true,
                  slug: true,
                  order: true,
                  isActive: true,
                },
                orderBy: {
                  order: "asc",
                },
              }
            : false,
          _count: {
            select: {
              products: true,
              subcategories: true,
            },
          },
        },
      }),
      prisma.category.count({ where }),
    ]);

    const totalPages = Math.ceil(total / finalLimit);

    return NextResponse.json({
      data: categories,
      pagination: {
        page,
        limit: finalLimit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Get categories error:", error);
    return NextResponse.json(
      {
        error: "Kategoriler getirilirken bir hata oluştu.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create category (Admin only)
export async function POST(request: NextRequest) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.session) {
      if (adminCheck.status === 401) {
        return unauthorizedResponse();
      }
      return forbiddenResponse();
    }

    const body = await request.json();

    // Validation
    // Validate name is a string and not empty
    if (typeof body.name !== "string" || body.name.trim() === "") {
      return NextResponse.json(
        { error: "Kategori adı gerekli ve string olmalıdır." },
        { status: 400 }
      );
    }

    // Validate name contains at least one alphanumeric character
    const nameHasAlphanumeric = /[a-zA-Z0-9]/.test(body.name.trim());
    if (!nameHasAlphanumeric) {
      return NextResponse.json(
        { error: "Kategori adı en az bir harf veya rakam içermelidir." },
        { status: 400 }
      );
    }

    // Validate parentId if provided
    if (body.parentId !== undefined && body.parentId !== null) {
      if (typeof body.parentId !== "string" || body.parentId.trim() === "") {
        return NextResponse.json(
          { error: "Parent ID geçerli bir string olmalıdır." },
          { status: 400 }
        );
      }

      // Check if parent category exists, is active, and not deleted
      const parentCategory = await prisma.category.findUnique({
        where: { id: body.parentId },
      });

      if (!parentCategory) {
        return NextResponse.json(
          { error: "Geçersiz parent kategori." },
          { status: 400 }
        );
      }

      if (!parentCategory.isActive || parentCategory.deletedAt) {
        return NextResponse.json(
          { error: "Parent kategori aktif değil veya silinmiş." },
          { status: 400 }
        );
      }
    }

    // Validate order if provided
    if (body.order !== undefined && body.order !== null) {
      const order = parseInt(body.order, 10);
      if (isNaN(order) || order < 0) {
        return NextResponse.json(
          { error: "Sıra geçerli bir tam sayı olmalıdır (0 veya pozitif)." },
          { status: 400 }
        );
      }
    }

    // Generate unique slug
    const baseSlug = generateSlug(body.name);
    let slug = await generateUniqueSlug(baseSlug, async (slug) => {
      const existing = await prisma.category.findUnique({
        where: { slug },
      });
      return !existing;
    });

    // Type validation for optional string fields
    const nameEn =
      body.nameEn !== undefined
        ? typeof body.nameEn === "string"
          ? body.nameEn
          : null
        : null;
    const description =
      body.description !== undefined
        ? typeof body.description === "string"
          ? body.description
          : null
        : null;
    const descriptionEn =
      body.descriptionEn !== undefined
        ? typeof body.descriptionEn === "string"
          ? body.descriptionEn
          : null
        : null;
    const imageUrl =
      body.imageUrl !== undefined
        ? typeof body.imageUrl === "string"
          ? body.imageUrl
          : null
        : null;
    const metaTitle =
      body.metaTitle !== undefined
        ? typeof body.metaTitle === "string"
          ? body.metaTitle
          : null
        : null;
    const metaDescription =
      body.metaDescription !== undefined
        ? typeof body.metaDescription === "string"
          ? body.metaDescription
          : null
        : null;

    // Create category with retry mechanism for slug race condition
    let category;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        category = await prisma.category.create({
          data: {
            name: body.name.trim(),
            nameEn,
            slug,
            description,
            descriptionEn,
            imageUrl,
            parentId: body.parentId || null,
            order: body.order !== undefined ? parseInt(body.order, 10) : 0,
            isActive: body.isActive !== undefined ? body.isActive : true,
            metaTitle,
            metaDescription,
          },
          include: {
            parent: {
              select: {
                id: true,
                name: true,
                nameEn: true,
                slug: true,
              },
            },
            _count: {
              select: {
                products: true,
                subcategories: true,
              },
            },
          },
        });
        break; // Success, exit retry loop
      } catch (error: any) {
        if (error?.code === "P2002" && error?.meta?.target?.includes("slug")) {
          retryCount++;
          if (retryCount >= maxRetries) {
            // Final attempt: generate a new unique slug with timestamp
            slug = await generateUniqueSlug(
              `${baseSlug}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
              async (newSlug) => {
                const existing = await prisma.category.findUnique({
                  where: { slug: newSlug },
                });
                return !existing;
              }
            );
            // Wrap final attempt in its own try-catch
            try {
              category = await prisma.category.create({
                data: {
                  name: body.name.trim(),
                  nameEn,
                  slug,
                  description,
                  descriptionEn,
                  imageUrl,
                  parentId: body.parentId || null,
                  order:
                    body.order !== undefined ? parseInt(body.order, 10) : 0,
                  isActive: body.isActive !== undefined ? body.isActive : true,
                  metaTitle,
                  metaDescription,
                },
                include: {
                  parent: {
                    select: {
                      id: true,
                      name: true,
                      nameEn: true,
                      slug: true,
                    },
                  },
                  _count: {
                    select: {
                      products: true,
                      subcategories: true,
                    },
                  },
                },
              });
              break;
            } catch (finalError: any) {
              // If even the timestamped slug collides, re-throw
              throw finalError;
            }
          } else {
            // Retry with a new slug
            slug = await generateUniqueSlug(
              `${baseSlug}-${retryCount}`,
              async (newSlug) => {
                const existing = await prisma.category.findUnique({
                  where: { slug: newSlug },
                });
                return !existing;
              }
            );
            continue; // Retry with new slug
          }
        } else {
          throw error; // Re-throw non-slug constraint errors
        }
      }
    }

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Create category error:", error);
    return NextResponse.json(
      { error: "Kategori oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
