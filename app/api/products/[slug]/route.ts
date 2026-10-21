import { getDb } from "@/lib/db";
import { Product } from "@/types/product";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = await getDb();
    const { slug } = await params;

    const product = await db
      .collection<Product>("products")
      .findOne({ slug });

    if (!product) {
      return Response.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}
