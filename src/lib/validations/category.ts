import { z } from 'zod';


export const categorySchema = z.object({
    name: z.string().min(3, "Category name must be at least 3 characters"),
    description: z.string().min(1, "Description is required"),
})

export type CategoryIpute = z.infer<typeof categorySchema>;
