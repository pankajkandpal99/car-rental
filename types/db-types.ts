/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "moderator";
  created_at: string;
  updated_at: string;
}

export interface Listing {
  id?: string;
  title: string;
  description: string;
  price: number;
  images?: string[];
  location?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
}

export interface AuditLog {
  id: string;
  action: string;
  listingId: number;
  userId: number;
  previousData?: any;
  newData?: any;
  createdAt: string;
  updatedAt: string;
}
