import { getDb } from "@/lib/db";
import { Product } from "@/types/product";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    // Build filter query
    const filter: Partial<Pick<Product, 'category' | 'featured'>> = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (featured === "true") {
      filter.featured = true;
    }

    const products = await db
      .collection<Product>("products")
      .find(filter)
      .toArray();

    return Response.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
