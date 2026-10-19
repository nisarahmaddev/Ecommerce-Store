
import { getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT
        DB_NAME() AS databaseName,
        GETDATE() AS serverTime
    `);

    return Response.json({
      success: true,
      message: "SQL Server connected successfully",
      ...result.recordset[0],
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed. Check server settings and credentials.",
      },
      { status: 500 }
    );
  }
}
