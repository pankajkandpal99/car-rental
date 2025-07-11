import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const db = await getDB();

    if (userId) {
      const userIdNum = parseInt(userId);

      if (isNaN(userIdNum)) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
      }

      const user = await db.get(
        `SELECT id, username, email, role, created_at, updated_at 
         FROM users 
         WHERE id = ?`,
        userIdNum
      );

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        user,
      });
    }
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
