import { getDb } from "@/lib/db";
import { Product } from "@/types/product";

/**
 * Server-side product data access functions
 * These functions connect directly to MongoDB and should only be used in Server Components
 */

export async function getAllProducts(): Promise<Product[]> {
  try {
    const db = await getDb();
    const products = await db
      .collection<Product>("products")
      .find({})
      .toArray();
    return products;
  } catch (error) {
    console.error("Error fetching products from database:", error);
    return [];
  }
}

export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  try {
    const db = await getDb();
    const query = db
      .collection<Product>("products")
      .find({ featured: true });
    
    const products = limit ? await query.limit(limit).toArray() : await query.toArray();
    return products;
  } catch (error) {
    console.error("Error fetching featured products from database:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const db = await getDb();
    const product = await db
      .collection<Product>("products")
      .findOne({ slug });
    return product;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const db = await getDb();
    const products = await db
      .collection<Product>("products")
      .find({ category })
      .toArray();
    return products;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const db = await getDb();
    const products = await db
      .collection<Product>("products")
      .find({})
      .project({ slug: 1 })
      .toArray();
    return products.map(p => p.slug);
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
}
