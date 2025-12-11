import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, forbiddenResponse } from "@/lib/api-helpers";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";

// GET /api/products - Get product list with filtering, pagination, and search
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const isFeatured = searchParams.get("featured") === "true";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

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

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        where.price.lte = parseFloat(maxPrice);
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
        take: limit,
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

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
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
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { error: "Ürün adı, fiyat ve kategori gerekli." },
        { status: 400 }
      );
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
        price: parseFloat(body.price),
        priceUsd: body.priceUsd ? parseFloat(body.priceUsd) : null,
        priceEur: body.priceEur ? parseFloat(body.priceEur) : null,
        comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
        stock: body.stock ? parseInt(body.stock) : 0,
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
