import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./db";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";


export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider(
            {
                name: 'credentials',
                credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
                },

                async authorize(credentials) {
                    if(!credentials?.email || !credentials?.password) {
                        return null
                    }

                    await dbConnect()

                    const user = await User.findOne({ email: credentials?.email });
                    if(!user) {
                        return null
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    )

                    if(!isPasswordValid) {
                        return null
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email
                    }
                }
            }
        )
    ],

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.id = user.id
                token.loginTime = new Date().toISOString()
            }

            return token
        },

        async session({ session, token }) {
            if(session.user) {
                session.user.id = token.id as string
                session.loginTime = token.loginTime as string
            }

            return session
        }
    },

    secret: process.env.NEXTAUTH_SECRET
}