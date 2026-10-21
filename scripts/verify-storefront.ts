// Verification script to confirm storefront is reading from MongoDB
// Run with: npm run verify-storefront

import { getAllProducts, getFeaturedProducts, getProductBySlug } from "../lib/data/products-db";
import { closeDatabaseConnection } from "../lib/db";

async function verifyStorefront() {
  console.log("🔍 Verifying Storefront MongoDB Connection");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  try {
    // Test 1: Verify homepage featured products
    console.log("📄 Testing Homepage (Featured Products)...");
    const featuredProducts = await getFeaturedProducts(6);
    console.log(`   ✅ Fetched ${featuredProducts.length} featured products`);
    if (featuredProducts.length > 0) {
      console.log(`   📦 Sample: ${featuredProducts[0].name} ($${featuredProducts[0].price})`);
    }

    // Test 2: Verify shop page all products
    console.log("\n🛍️  Testing Shop Page (All Products)...");
    const allProducts = await getAllProducts();
    console.log(`   ✅ Fetched ${allProducts.length} total products`);
    const categories = [...new Set(allProducts.map(p => p.category))];
    console.log(`   📂 Categories: ${categories.join(", ")}`);

    // Test 3: Verify product detail page
    console.log("\n📦 Testing Product Detail Page...");
    const testSlug = "essential-cleanser";
    const product = await getProductBySlug(testSlug);
    if (product) {
      console.log(`   ✅ Fetched product: ${product.name}`);
      console.log(`   💰 Price: $${product.price}`);
      console.log(`   🏷️  Category: ${product.category}`);
      console.log(`   ⭐ Featured: ${product.featured ? "Yes" : "No"}`);
      console.log(`   📸 Images: ${product.images.length}`);
    } else {
      console.log(`   ❌ Failed to fetch product with slug: ${testSlug}`);
      await closeDatabaseConnection();
      process.exit(1);
    }

    // Test 4: Verify data integrity
    console.log("\n🔒 Verifying Data Integrity...");
    const requiredFields = ["id", "slug", "name", "description", "price", "category", "images", "inStock", "featured"];
    const sampleProduct = allProducts[0];
    const missingFields = requiredFields.filter(field => !(field in sampleProduct));
    
    if (missingFields.length > 0) {
      console.log(`   ⚠️  Warning: Missing fields: ${missingFields.join(", ")}`);
    } else {
      console.log(`   ✅ All required fields present`);
    }

    // Summary
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ STOREFRONT VERIFICATION COMPLETE");
    console.log("\n📊 Summary:");
    console.log(`   - Homepage: ${featuredProducts.length} featured products`);
    console.log(`   - Shop Page: ${allProducts.length} total products`);
    console.log(`   - Product Pages: Individual product loading works`);
    console.log(`   - Categories: ${categories.length} unique categories`);
    console.log("\n✨ The storefront is successfully reading from MongoDB!\n");

    await closeDatabaseConnection();

  } catch (error) {
    console.error("\n❌ Verification failed:", error);
    console.error("\nMake sure:");
    console.error("  1. MongoDB is running");
    console.error("  2. Database has been seeded (npm run seed)");
    console.error("  3. .env.local has correct MONGODB_URI\n");
    await closeDatabaseConnection();
    process.exit(1);
  }
}

verifyStorefront();
