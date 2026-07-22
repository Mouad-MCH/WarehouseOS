// src/types/next-auth.d.ts
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
    }
    loginTime: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    loginTime: string
  }
}