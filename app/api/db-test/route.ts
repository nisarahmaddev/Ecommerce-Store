import { getDb } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDb();

    // Test the connection by running a ping command
    const result = await db.admin().ping();
    const dbName = db.databaseName;

    return Response.json({
      success: true,
      message: "MongoDB connected successfully",
      database: dbName,
      serverTime: new Date().toISOString(),
      ping: result,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return Response.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown database connection error",
      },
      { status: 500 }
    );
  }
}
