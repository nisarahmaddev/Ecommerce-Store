import { MongoClient } from "mongodb";
import { products } from "../lib/data/products";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lumen_store";
const DB_NAME = "lumen_store";

async function seedDatabase() {
  let client: MongoClient | null = null;

  try {
    console.log("🔌 Connecting to MongoDB...");
    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);

    console.log("✅ Connected to database:", DB_NAME);

    // ========================================
    // PRODUCTS COLLECTION
    // ========================================
    const productsCollection = db.collection("products");

    // Create unique index on slug to prevent duplicates
    await productsCollection.createIndex({ slug: 1 }, { unique: true });
    console.log("📇 Created unique index on products.slug");

    // Insert products (update if slug already exists)
    let insertedCount = 0;
    let updatedCount = 0;

    for (const product of products) {
      const result = await productsCollection.updateOne(
        { slug: product.slug },
        { $set: product },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        insertedCount++;
      } else if (result.modifiedCount > 0) {
        updatedCount++;
      }
    }

    console.log(`\n✨ Products seeded successfully!`);
    console.log(`   📦 Inserted: ${insertedCount} products`);
    console.log(`   🔄 Updated: ${updatedCount} products`);
    console.log(`   📊 Total: ${products.length} products in database`);

    // Verify the data
    const count = await productsCollection.countDocuments();
    console.log(`   ✅ Verification: ${count} products in collection`);

    // ========================================
    // ORDERS COLLECTION INDEXES
    // ========================================
    const ordersCollection = db.collection("orders");
    
    console.log("\n📇 Creating orders collection indexes...");
    
    // Create unique index on orderReference
    await ordersCollection.createIndex(
      { orderReference: 1 },
      { unique: true, background: true }
    );
    console.log("   ✅ Created unique index on orders.orderReference");
    
    // Create index on idempotencyKey for faster duplicate detection
    await ordersCollection.createIndex(
      { idempotencyKey: 1 },
      { sparse: true, background: true }
    );
    console.log("   ✅ Created index on orders.idempotencyKey");
    
    // Create index on customerEmail for customer lookups
    await ordersCollection.createIndex(
      { customerEmail: 1 },
      { background: true }
    );
    console.log("   ✅ Created index on orders.customerEmail");
    
    // Create index on createdAt for date-based queries
    await ordersCollection.createIndex(
      { createdAt: -1 },
      { background: true }
    );
    console.log("   ✅ Created index on orders.createdAt");

    console.log("\n🎉 Database initialization complete!\n");

  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("🔌 Database connection closed");
    }
  }
}

seedDatabase();
