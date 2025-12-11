import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, forbiddenResponse } from "@/lib/api-helpers";

// GET /api/products/[id] - Get product by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isActive: true,
        deletedAt: null,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            slug: true,
            description: true,
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
        },
        variants: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            nameEn: true,
            sku: true,
            price: true,
            stock: true,
            color: true,
            size: true,
            imageUrl: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Get product error:", error);
    return NextResponse.json(
      { error: "Ürün yüklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id] - Update product (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return forbiddenResponse();
    }

    const { id } = params;
    const body = await request.json();

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }

    // Build update data
    const updateData: any = {};

    if (body.name !== undefined) {
      updateData.name = body.name;
      // Auto-generate slug if name changed
      if (body.name !== existingProduct.name) {
        const { generateSlug } = await import("@/lib/utils/slug");
        const baseSlug = generateSlug(body.name);
        const { generateUniqueSlug } = await import("@/lib/utils/slug");
        updateData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          const existing = await prisma.product.findUnique({
            where: { slug },
          });
          return !existing || existing.id === id;
        });
      }
    }

    if (body.nameEn !== undefined) updateData.nameEn = body.nameEn;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.descriptionEn !== undefined)
      updateData.descriptionEn = body.descriptionEn;
    if (body.price !== undefined) updateData.price = parseFloat(body.price);
    if (body.priceUsd !== undefined)
      updateData.priceUsd = parseFloat(body.priceUsd);
    if (body.priceEur !== undefined)
      updateData.priceEur = parseFloat(body.priceEur);
    if (body.comparePrice !== undefined)
      updateData.comparePrice = parseFloat(body.comparePrice);
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock);
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;
    if (body.sku !== undefined) updateData.sku = body.sku;
    if (body.weight !== undefined) updateData.weight = parseFloat(body.weight);
    if (body.dimensions !== undefined) updateData.dimensions = body.dimensions;
    if (body.material !== undefined) updateData.material = body.material;
    if (body.taxRate !== undefined)
      updateData.taxRate = parseFloat(body.taxRate);
    if (body.metaTitle !== undefined) updateData.metaTitle = body.metaTitle;
    if (body.metaDescription !== undefined)
      updateData.metaDescription = body.metaDescription;

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
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
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ürün başarıyla güncellendi.",
      data: updatedProduct,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: "Ürün güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product (Admin only - soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return forbiddenResponse();
    }

    const { id } = params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }

    // Soft delete
    await prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id,
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ürün başarıyla silindi.",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Ürün silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
