/**
 * Create a test category for product testing
 * Run with: node scripts/create-test-category.js
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createTestCategory() {
  try {
    // Check if test category already exists
    const existing = await prisma.category.findFirst({
      where: {
        slug: "test-kategori",
      },
    });

    if (existing) {
      console.log("✅ Test category already exists:");
      console.log(`   ID: ${existing.id}`);
      console.log(`   Name: ${existing.name}`);
      console.log(`   Slug: ${existing.slug}`);
      return existing.id;
    }

    // Create test category
    const category = await prisma.category.create({
      data: {
        name: "Test Kategori",
        slug: "test-kategori",
        description: "Test amaçlı kategori",
        isActive: true,
      },
    });

    console.log("✅ Test category created:");
    console.log(`   ID: ${category.id}`);
    console.log(`   Name: ${category.name}`);
    console.log(`   Slug: ${category.slug}`);
    return category.id;
  } catch (error) {
    console.error("❌ Error creating category:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createTestCategory();
