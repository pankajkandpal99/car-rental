import { registerSchema } from "@/schema/auth-schema";
import { NextResponse } from "next/server";
import { getDB, getUserByEmail, createUser } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { username, email, password } = validationResult.data;

    await getDB();

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await createUser(username, email, hashedPassword);

    if (!result.lastID) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    console.log("result : ", result);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.lastID,
          email,
          username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    // Handle specific SQLite errors
    if (error instanceof Error) {
      if (error.message.includes("UNIQUE constraint failed")) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
