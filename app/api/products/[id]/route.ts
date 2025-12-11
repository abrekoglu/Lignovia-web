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
      // Validate name is not empty
      if (!body.name || body.name.trim() === "") {
        return NextResponse.json(
          { error: "Ürün adı boş olamaz." },
          { status: 400 }
        );
      }

      // Validate name contains at least one alphanumeric character
      // This prevents names with only special characters that would generate empty slugs
      const nameHasAlphanumeric = /[a-zA-Z0-9]/.test(body.name.trim());
      if (!nameHasAlphanumeric) {
        return NextResponse.json(
          { error: "Ürün adı en az bir harf veya rakam içermelidir." },
          { status: 400 }
        );
      }

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

    // Validate numeric fields to prevent NaN values
    if (body.price !== undefined) {
      const price = parseFloat(body.price);
      if (isNaN(price) || price < 0) {
        return NextResponse.json(
          { error: "Fiyat geçerli bir sayı olmalıdır (0 veya pozitif)." },
          { status: 400 }
        );
      }
      updateData.price = price;
    }

    if (body.priceUsd !== undefined) {
      const priceUsd = parseFloat(body.priceUsd);
      if (isNaN(priceUsd) || priceUsd < 0) {
        return NextResponse.json(
          { error: "USD fiyatı geçerli bir sayı olmalıdır (0 veya pozitif)." },
          { status: 400 }
        );
      }
      updateData.priceUsd = priceUsd;
    }

    if (body.priceEur !== undefined) {
      const priceEur = parseFloat(body.priceEur);
      if (isNaN(priceEur) || priceEur < 0) {
        return NextResponse.json(
          { error: "EUR fiyatı geçerli bir sayı olmalıdır (0 veya pozitif)." },
          { status: 400 }
        );
      }
      updateData.priceEur = priceEur;
    }

    if (body.comparePrice !== undefined) {
      const comparePrice = parseFloat(body.comparePrice);
      if (isNaN(comparePrice) || comparePrice < 0) {
        return NextResponse.json(
          {
            error:
              "Karşılaştırma fiyatı geçerli bir sayı olmalıdır (0 veya pozitif).",
          },
          { status: 400 }
        );
      }
      updateData.comparePrice = comparePrice;
    }

    if (body.stock !== undefined) {
      const stock = parseInt(body.stock, 10);
      if (isNaN(stock) || stock < 0) {
        return NextResponse.json(
          { error: "Stok geçerli bir tam sayı olmalıdır (0 veya pozitif)." },
          { status: 400 }
        );
      }
      updateData.stock = stock;
    }

    if (body.categoryId !== undefined) {
      // Validate category exists
      if (!body.categoryId || body.categoryId.trim() === "") {
        return NextResponse.json(
          { error: "Kategori gerekli." },
          { status: 400 }
        );
      }
      const category = await prisma.category.findUnique({
        where: { id: body.categoryId },
      });
      if (!category) {
        return NextResponse.json(
          { error: "Geçersiz kategori." },
          { status: 400 }
        );
      }
      updateData.categoryId = body.categoryId;
    }

    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.isFeatured !== undefined) updateData.isFeatured = body.isFeatured;

    if (body.sku !== undefined) {
      // Normalize empty string to null (consistent with POST endpoint)
      const normalizedSku =
        body.sku && body.sku.trim() !== "" ? body.sku : null;

      // Check SKU uniqueness if provided (and different from current)
      if (normalizedSku && normalizedSku !== existingProduct.sku) {
        const existingSku = await prisma.product.findUnique({
          where: { sku: normalizedSku },
        });
        if (existingSku) {
          return NextResponse.json(
            { error: "Bu SKU zaten kullanılıyor." },
            { status: 400 }
          );
        }
      }
      updateData.sku = normalizedSku;
    }

    if (body.weight !== undefined) {
      const weight = parseFloat(body.weight);
      if (isNaN(weight) || weight < 0) {
        return NextResponse.json(
          { error: "Ağırlık geçerli bir sayı olmalıdır (0 veya pozitif)." },
          { status: 400 }
        );
      }
      updateData.weight = weight;
    }

    if (body.dimensions !== undefined) updateData.dimensions = body.dimensions;
    if (body.material !== undefined) updateData.material = body.material;

    if (body.taxRate !== undefined) {
      const taxRate = parseFloat(body.taxRate);
      if (isNaN(taxRate) || taxRate < 0 || taxRate > 100) {
        return NextResponse.json(
          { error: "KDV oranı 0-100 arasında geçerli bir sayı olmalıdır." },
          { status: 400 }
        );
      }
      updateData.taxRate = taxRate;
    }

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
