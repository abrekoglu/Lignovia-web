/**
 * Test script for Product CRUD APIs
 * Run with: node scripts/test-products-api.js
 */

const BASE_URL = "http://localhost:3000";

// Test data
const testCategoryId = null;
let testProductId = null;
const adminCookie = null;

// Helper function to make requests
async function request(url, options = {}) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(adminCookie && { Cookie: adminCookie }),
      ...options.headers,
    },
  });
  const data = await response.json();
  return { status: response.status, data };
}

// Test functions
async function testGetProducts() {
  console.log("\n📋 Test 1: GET /api/products (List)");
  const { status, data } = await request("/api/products?page=1&limit=5");
  console.log(`Status: ${status}`);
  console.log(`Success: ${data.success}`);
  if (data.pagination) {
    console.log(`Total: ${data.pagination.total}`);
  }
  return status === 200 && data.success;
}

async function testGetProductsWithFilters() {
  console.log("\n🔍 Test 2: GET /api/products (With Filters)");
  const { status, data } = await request(
    "/api/products?page=1&limit=5&featured=true"
  );
  console.log(`Status: ${status}`);
  console.log(`Success: ${data.success}`);
  return status === 200 && data.success;
}

async function testCreateCategory() {
  console.log("\n📁 Test 3: Create Test Category (via Prisma)");
  // Note: We'll need to create this via a script or manually
  // For now, we'll assume a category exists or create one via API if available
  console.log(
    "⚠️  Category creation skipped - please create manually or via API"
  );
  return true;
}

async function testCreateProduct() {
  console.log("\n➕ Test 4: POST /api/products (Create - Admin Only)");

  if (!testCategoryId) {
    console.log("⚠️  Skipping - No category ID available");
    return false;
  }

  const productData = {
    name: "Test Ahşap Mutfak Ürünü",
    description: "Bu bir test ürünüdür",
    price: 299.99,
    categoryId: testCategoryId,
    stock: 10,
    sku: `TEST-${Date.now()}`,
    isActive: true,
  };

  const { status, data } = await request("/api/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });

  console.log(`Status: ${status}`);
  console.log(`Success: ${data.success}`);
  if (data.data) {
    testProductId = data.data.id;
    console.log(`Product ID: ${testProductId}`);
    console.log(`Slug: ${data.data.slug}`);
  } else {
    console.log(`Error: ${data.error}`);
  }
  return status === 201 && data.success;
}

async function testGetProductById() {
  console.log("\n🔍 Test 5: GET /api/products/[id] (Detail)");

  if (!testProductId) {
    console.log("⚠️  Skipping - No product ID available");
    return false;
  }

  const { status, data } = await request(`/api/products/${testProductId}`);
  console.log(`Status: ${status}`);
  console.log(`Success: ${data.success}`);
  if (data.data) {
    console.log(`Product Name: ${data.data.name}`);
  }
  return status === 200 && data.success;
}

async function testUpdateProduct() {
  console.log("\n✏️  Test 6: PATCH /api/products/[id] (Update - Admin Only)");

  if (!testProductId) {
    console.log("⚠️  Skipping - No product ID available");
    return false;
  }

  const updateData = {
    name: "Test Ahşap Mutfak Ürünü (Güncellendi)",
    price: 349.99,
    stock: 15,
  };

  const { status, data } = await request(`/api/products/${testProductId}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });

  console.log(`Status: ${status}`);
  console.log(`Success: ${data.success}`);
  if (data.data) {
    console.log(`Updated Name: ${data.data.name}`);
    console.log(`Updated Price: ${data.data.price}`);
  } else {
    console.log(`Error: ${data.error}`);
  }
  return status === 200 && data.success;
}

async function testDeleteProduct() {
  console.log("\n🗑️  Test 7: DELETE /api/products/[id] (Delete - Admin Only)");

  if (!testProductId) {
    console.log("⚠️  Skipping - No product ID available");
    return false;
  }

  const { status, data } = await request(`/api/products/${testProductId}`, {
    method: "DELETE",
  });

  console.log(`Status: ${status}`);
  console.log(`Success: ${data.success}`);
  console.log(`Message: ${data.message || data.error}`);
  return status === 200 && data.success;
}

// Main test runner
async function runTests() {
  console.log("🚀 Starting Product API Tests...\n");
  console.log("⚠️  Note: Admin endpoints require authentication");
  console.log("⚠️  Note: Category must exist before creating products\n");

  const results = [];

  results.push(await testGetProducts());
  results.push(await testGetProductsWithFilters());
  results.push(await testCreateCategory());

  // Admin tests (will fail without auth, but we test the structure)
  results.push(await testCreateProduct());
  results.push(await testGetProductById());
  results.push(await testUpdateProduct());
  results.push(await testDeleteProduct());

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Test Summary");
  console.log("=".repeat(50));
  const passed = results.filter((r) => r).length;
  const total = results.length;
  console.log(`Passed: ${passed}/${total}`);
  console.log(`Failed: ${total - passed}/${total}`);
  console.log("=".repeat(50));
}

// Run tests
runTests().catch(console.error);
