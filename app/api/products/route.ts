import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, forbiddenResponse } from "@/lib/api-helpers";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";

// GET /api/products - Get product list with filtering, pagination, and search
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const isFeatured = searchParams.get("featured") === "true";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");

    // Whitelist of allowed sort fields
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "price",
      "name",
      "stock",
      "isFeatured",
    ];

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
        : "createdAt";

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
        : "desc";

    // Validate and parse page parameter
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Page parametresi 1 veya daha büyük bir sayı olmalıdır." },
        { status: 400 }
      );
    }

    // Validate and parse limit parameter
    const limit = limitParam ? parseInt(limitParam, 10) : 12;
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
      isActive: true,
      deletedAt: null,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (isFeatured) {
      where.isFeatured = true;
    }

    // Search should work with other filters (AND), not as an alternative (OR)
    if (search) {
      where.AND = [
        ...(where.AND || []),
        {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { sku: { contains: search, mode: "insensitive" } },
          ],
        },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        const minPriceNum = parseFloat(minPrice);
        if (!isNaN(minPriceNum)) {
          where.price.gte = minPriceNum;
        }
      }
      if (maxPrice) {
        const maxPriceNum = parseFloat(maxPrice);
        if (!isNaN(maxPriceNum)) {
          where.price.lte = maxPriceNum;
        }
      }
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get products and total count
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: finalLimit,
        orderBy,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          images: {
            select: {
              id: true,
              url: true,
              altText: true,
              order: true,
            },
            orderBy: {
              order: "asc",
            },
            take: 1, // Only get first image for list view
          },
          _count: {
            select: {
              reviews: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / finalLimit);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit: finalLimit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Ürünler yüklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return forbiddenResponse();
    }

    const body = await request.json();

    // Validation
    if (!body.name || body.name.trim() === "") {
      return NextResponse.json({ error: "Ürün adı gerekli." }, { status: 400 });
    }

    if (body.price === undefined || body.price === null) {
      return NextResponse.json({ error: "Fiyat gerekli." }, { status: 400 });
    }

    // Validate price is a valid number (including 0)
    const price = parseFloat(body.price);
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: "Fiyat geçerli bir sayı olmalıdır (0 veya pozitif)." },
        { status: 400 }
      );
    }

    // Validate stock if provided
    if (body.stock !== undefined && body.stock !== null) {
      const stock = parseInt(body.stock, 10);
      if (isNaN(stock) || stock < 0) {
        return NextResponse.json(
          { error: "Stok geçerli bir tam sayı olmalıdır (0 veya pozitif)." },
          { status: 400 }
        );
      }
    }

    if (!body.categoryId || body.categoryId.trim() === "") {
      return NextResponse.json({ error: "Kategori gerekli." }, { status: 400 });
    }

    // Validate category exists
    const category = await prisma.category.findUnique({
      where: { id: body.categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Geçersiz kategori." },
        { status: 400 }
      );
    }

    // Generate unique slug
    const baseSlug = generateSlug(body.name);
    const slug = await generateUniqueSlug(baseSlug, async (slug) => {
      const existing = await prisma.product.findUnique({
        where: { slug },
      });
      return !existing;
    });

    // Check SKU uniqueness if provided
    if (body.sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku: body.sku },
      });
      if (existingSku) {
        return NextResponse.json(
          { error: "Bu SKU zaten kullanılıyor." },
          { status: 400 }
        );
      }
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name: body.name,
        nameEn: body.nameEn || null,
        slug,
        description: body.description || null,
        descriptionEn: body.descriptionEn || null,
        price,
        priceUsd: body.priceUsd ? parseFloat(body.priceUsd) : null,
        priceEur: body.priceEur ? parseFloat(body.priceEur) : null,
        comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
        stock:
          body.stock !== undefined && body.stock !== null
            ? parseInt(body.stock, 10)
            : 0,
        categoryId: body.categoryId,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : false,
        sku: body.sku || null,
        weight: body.weight ? parseFloat(body.weight) : null,
        dimensions: body.dimensions || null,
        material: body.material || null,
        taxRate: body.taxRate ? parseFloat(body.taxRate) : 20,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Ürün başarıyla oluşturuldu.",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Ürün oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
