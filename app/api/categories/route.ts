import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDb();

    // Get unique categories from products collection
    const categories = await db
      .collection("products")
      .distinct("category");

    return Response.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}
