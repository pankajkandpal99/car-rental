/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { User, Listing } from "@/types/db-types";
import { mockListings } from "./mockListings";

let db: Awaited<ReturnType<typeof open>>;

async function initializeDB() {
  if (!db) {
    db = await open({
      filename: "./listings.db",
      driver: sqlite3.Database,
    });

    await db.run("PRAGMA foreign_keys = ON");

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin' NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS listings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        image_url TEXT NOT NULL,
        status TEXT DEFAULT 'pending' NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );
      
      CREATE TABLE IF NOT EXISTS audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        listing_id INTEGER NOT NULL,
        admin_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY(listing_id) REFERENCES listings(id) ON DELETE CASCADE,
        FOREIGN KEY(admin_id) REFERENCES users(id)
      );
    `);

    try {
      const tableInfo = await db.all("PRAGMA table_info(users)");
      const hasEmailColumn = tableInfo.some(
        (column: any) => column.name === "email"
      );

      if (!hasEmailColumn) {
        await db.run("ALTER TABLE users ADD COLUMN email TEXT");

        await db.run(
          'UPDATE users SET email = username || "@example.com" WHERE email IS NULL OR email = ""'
        );

        await db.exec(`
          CREATE TABLE users_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'admin' NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
          );
          
          INSERT INTO users_new SELECT * FROM users;
          DROP TABLE users;
          ALTER TABLE users_new RENAME TO users;
        `);
      }
    } catch (error) {
      console.log("Email column migration handled:", error);
    }

    const userCount = await db.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM users"
    );

    if (userCount && userCount.count === 0) {
      await db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        "admin",
        "admin@example.com",
        "password123" // In production, use hashed passwords!
      );
    }
  }
  return db;
}

export async function getDB() {
  return initializeDB();
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = await getDB();
  return db.get<User>("SELECT * FROM users WHERE id = ?", id);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDB();
  return db.get<User>("SELECT * FROM users WHERE email = ?", email);
}

export async function createUser(
  username: string,
  email: string,
  hashedPassword: string
): Promise<any> {
  const db = await getDB();
  return db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    username,
    email,
    hashedPassword
  );
}

export async function getListingById(id: number): Promise<Listing | undefined> {
  return mockListings.find((listing) => listing.id === String(id));
}

export async function getListings(
  page: number = 1,
  limit: number = 10,
  status?: "pending" | "approved" | "rejected"
): Promise<{ listings: Listing[]; total: number }> {
  let filteredListings = [...mockListings];

  if (status) {
    filteredListings = filteredListings.filter(
      (listing) => listing.status === status
    );
  }

  const offset = (page - 1) * limit;
  const paginatedListings = filteredListings.slice(offset, offset + limit);

  return {
    listings: paginatedListings,
    total: filteredListings.length,
  };
}

export async function updateListingStatus(
  id: number,
  status: "pending" | "approved" | "rejected"
): Promise<Listing | undefined> {
  const listing = mockListings.find((listing) => listing.id === String(id));
  if (listing) {
    listing.status = status;
    listing.updatedAt = new Date();
  }
  return listing;
}

export async function updateListing(
  id: number,
  data: Partial<Listing>
): Promise<Listing | undefined> {
  const listing = mockListings.find((listing) => listing.id === String(id));
  if (listing) {
    Object.assign(listing, {
      ...data,
      updatedAt: new Date(),
    });
  }
  return listing;
}

export async function deleteListing(id: number): Promise<boolean> {
  const index = mockListings.findIndex((listing) => listing.id === String(id));
  if (index !== -1) {
    mockListings.splice(index, 1);
    return true;
  }
  return false;
}
