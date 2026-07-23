import { describe, it, expect } from 'vitest';
import { registerSchema, loginSchema } from '@/lib/validation';



describe("regusterSchema", () => {
  const validPayload = {
    name: 'John Doe',
    email: 'john@example.com',
    password: "password123",
    confirmPassword: "password123",
  }

  it("accepts a valid payload", () => {
    const result = registerSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  })

  it("rejects a name shorter than 3 characters", () => {
    const result = registerSchema.safeParse({ ...validPayload, name: "Jo" });
    expect(result.success).toBe(false);
    if(!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  })

  it("rejects an invalid email", () => {
    const result = registerSchema.safeParse({ ...validPayload, email: "not-an-email" });
    expect(result.success).toBe(false);

    if(!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  })

  it("rejects a password shorter than 8 characters", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      password: 'short',
      confirmPassword: 'short'
    });

    expect(result.success).toBe(false);
    if(!result.success) {
      expect(result.error.flatten().fieldErrors.password).toBeDefined();
    }
  })

  it("rejects mismatched passwords and attaches the error to confirmPassword", () => {
    const result = registerSchema.safeParse({
      ...validPayload,
      confirmPassword: "different123"
    });

    expect(result.success).toBe(false);
    if(!result.success){
      expect(result.error.flatten().fieldErrors.confirmPassword).toContain(
        "Passwords do not match"
      )
    }

  })
})

describe("loginSchema", () => {
  it("accespts a valid payload", () => {
    const result = loginSchema.safeParse({
      email: "john@example.com",
      password: "password123",
    })

    expect(result.success).toBe(true);
  })

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: 'password123',
    })

    expect(result.success).toBe(false);
    if(!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({
      email: "john@example.com",
      password: "",
    })

    expect(result.success).toBe(false);
    if(!result.success) {
      expect(result.error.flatten().fieldErrors.password).toBeDefined();
    }
  })

})