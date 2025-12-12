import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  requireAdmin,
  forbiddenResponse,
  unauthorizedResponse,
} from "@/lib/api-helpers";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";

// GET /api/categories/[id] - Get category by ID or slug
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const category = await prisma.category.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        deletedAt: null,
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
        subcategories: {
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
            imageUrl: true,
          },
          orderBy: {
            order: "asc",
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

    if (!category) {
      return NextResponse.json(
        { error: "Kategori bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Get category error:", error);
    return NextResponse.json(
      { error: "Kategori getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

// PATCH /api/categories/[id] - Update category (Admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.session) {
      if (adminCheck.status === 401) {
        return unauthorizedResponse();
      }
      return forbiddenResponse();
    }

    const { id } = params;
    const body = await request.json();

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Kategori bulunamadı." },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: any = {};

    if (body.name !== undefined) {
      // Validate name is a string and not empty
      if (typeof body.name !== "string" || body.name.trim() === "") {
        return NextResponse.json(
          { error: "Kategori adı boş olamaz ve string olmalıdır." },
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

      const trimmedName = body.name.trim();
      updateData.name = trimmedName;
      // Auto-generate slug if name changed
      if (trimmedName !== existingCategory.name) {
        const baseSlug = generateSlug(trimmedName);
        updateData.slug = await generateUniqueSlug(baseSlug, async (slug) => {
          const existing = await prisma.category.findUnique({
            where: { slug },
          });
          return !existing || existing.id === id;
        });
      }
    }

    // Type validation for optional string fields
    if (body.nameEn !== undefined)
      updateData.nameEn = typeof body.nameEn === "string" ? body.nameEn : null;
    if (body.description !== undefined)
      updateData.description =
        typeof body.description === "string" ? body.description : null;
    if (body.descriptionEn !== undefined)
      updateData.descriptionEn =
        typeof body.descriptionEn === "string" ? body.descriptionEn : null;
    if (body.imageUrl !== undefined)
      updateData.imageUrl =
        typeof body.imageUrl === "string" ? body.imageUrl : null;
    if (body.metaTitle !== undefined)
      updateData.metaTitle =
        typeof body.metaTitle === "string" ? body.metaTitle : null;
    if (body.metaDescription !== undefined)
      updateData.metaDescription =
        typeof body.metaDescription === "string" ? body.metaDescription : null;

    // Validate parentId if provided
    if (body.parentId !== undefined) {
      if (body.parentId === null) {
        // Allow setting parentId to null (root category)
        updateData.parentId = null;
      } else {
        if (typeof body.parentId !== "string" || body.parentId.trim() === "") {
          return NextResponse.json(
            { error: "Parent ID geçerli bir string olmalıdır." },
            { status: 400 }
          );
        }

        // Prevent setting parent to itself
        if (body.parentId === id) {
          return NextResponse.json(
            { error: "Kategori kendisinin parent'ı olamaz." },
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

        // Prevent circular references (check if parent is a descendant)
        let currentParentId = body.parentId;
        const visited = new Set<string>([id]); // Start with current category
        while (currentParentId) {
          if (visited.has(currentParentId)) {
            return NextResponse.json(
              { error: "Döngüsel referans oluşturulamaz." },
              { status: 400 }
            );
          }
          visited.add(currentParentId);
          const parent = await prisma.category.findUnique({
            where: { id: currentParentId },
            select: { parentId: true },
          });
          if (!parent || !parent.parentId) break;
          currentParentId = parent.parentId;
        }

        updateData.parentId = body.parentId;
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
      updateData.order = order;
    }

    // Validate isActive if provided
    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          { error: "isActive boolean olmalıdır." },
          { status: 400 }
        );
      }
      updateData.isActive = body.isActive;
    }

    // Update category with retry mechanism for slug race condition
    let updatedCategory;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        updatedCategory = await prisma.category.update({
          where: { id },
          data: updateData,
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
      } catch (error: any) {
        if (
          error?.code === "P2002" &&
          error?.meta?.target?.includes("slug") &&
          updateData.slug
        ) {
          retryCount++;
          if (retryCount >= maxRetries) {
            // Final attempt: generate a new unique slug with timestamp
            const baseSlug = generateSlug(body.name);
            updateData.slug = await generateUniqueSlug(
              `${baseSlug}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
              async (newSlug) => {
                const existing = await prisma.category.findUnique({
                  where: { slug: newSlug },
                });
                return !existing || existing.id === id;
              }
            );
            // Wrap final attempt in its own try-catch
            try {
              updatedCategory = await prisma.category.update({
                where: { id },
                data: updateData,
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
              throw finalError;
            }
          } else {
            // Retry with a new slug
            const baseSlug = generateSlug(body.name);
            updateData.slug = await generateUniqueSlug(
              `${baseSlug}-${retryCount}`,
              async (newSlug) => {
                const existing = await prisma.category.findUnique({
                  where: { slug: newSlug },
                });
                return !existing || existing.id === id;
              }
            );
            continue;
          }
        } else {
          throw error;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Kategori başarıyla güncellendi.",
      data: updatedCategory,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: "Kategori güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete category (Admin only - soft delete)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.session) {
      if (adminCheck.status === 401) {
        return unauthorizedResponse();
      }
      return forbiddenResponse();
    }
    const session = adminCheck.session;

    const { id } = params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Kategori bulunamadı." },
        { status: 404 }
      );
    }

    // Check if category has products
    const productCount = await prisma.product.count({
      where: {
        categoryId: id,
        deletedAt: null,
      },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          error: `Bu kategoriye ait ${productCount} ürün bulunmaktadır. Önce ürünleri silin veya başka bir kategoriye taşıyın.`,
        },
        { status: 400 }
      );
    }

    // Check if category has active subcategories
    const subcategoryCount = await prisma.category.count({
      where: {
        parentId: id,
        deletedAt: null,
      },
    });

    if (subcategoryCount > 0) {
      return NextResponse.json(
        {
          error: `Bu kategoriye ait ${subcategoryCount} alt kategori bulunmaktadır. Önce alt kategorileri silin veya başka bir kategoriye taşıyın.`,
        },
        { status: 400 }
      );
    }

    // Soft delete
    await prisma.category.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id,
        isActive: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Kategori başarıyla silindi.",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Kategori silinirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
