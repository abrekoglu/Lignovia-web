/**
 * Create an admin user for testing
 * Run with: node scripts/create-admin-user.js
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const email = "admin@lignovia.com";
    const password = "admin123456";

    // Check if admin already exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      // Update to admin if not already
      if (existing.role !== "ADMIN") {
        await prisma.user.update({
          where: { id: existing.id },
          data: { role: "ADMIN" },
        });
        console.log("✅ User updated to ADMIN:");
      } else {
        console.log("✅ Admin user already exists:");
      }
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`   Role: ADMIN`);
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Admin User",
        role: "ADMIN",
        isActive: true,
        emailVerified: new Date(),
      },
    });

    console.log("✅ Admin user created:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: ADMIN`);
    console.log(`   ID: ${admin.id}`);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
