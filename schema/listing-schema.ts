import { z } from "zod";

export const listingSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be at least 1"),
  images: z.array(z.string()).optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  userId: z.number().optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;
