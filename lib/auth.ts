"use server";

import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { getDB } from "./db";

export const verifyAuth = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("jwt")?.value;
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
      userId: number;
      email: string;
    };

    // Verify user exists in DB
    const db = await getDB();
    const user = await db.get(
      "SELECT id FROM users WHERE id = ?",
      decoded.userId
    );

    if (!user) return null;

    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};

// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export const verifyAuth = async (req: NextRequest) => {
//   try {
//     const token = req.cookies.get("jwt")?.value;
//     if (!token) return null;

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
//       userId: string;
//       email?: string;
//       iat?: number;
//       exp?: number;
//     };

//     return { userId: decoded.userId };
//   } catch (error) {
//     console.error("Invalid JWT:", error);
//     return null;
//   }
// };
