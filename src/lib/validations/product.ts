import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, "invalid category ID"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
});

export type ProductInpute = z.infer<typeof productSchema>