import { z } from "zod"

export const movementSchema = z.object({
  product: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),
  type: z.enum(["IN", "OUT"], {
    message: "Type must be either IN or OUT",
  }),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be at least 1"),
  note: z
    .string()
    .optional(),
})

export type MovementInput = z.infer<typeof movementSchema>