import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
    email: z.email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
})
 .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
 })


export type RegisterInput = z.infer<typeof registerSchema>;