import type { RegisterInput } from "@/lib/validation";

export type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword", string[]>
>;

export type RegisterResult =
  | { success: true }
  | { success: false; status: number; message?: string; errors?: FieldErrors };

export async function registerUser(data: RegisterInput): Promise<RegisterResult> {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: body.message,
        errors: body.errors,
      };
    }

    return { success: true };
  } catch {
    return { success: false, status: 0 };
  }
}
