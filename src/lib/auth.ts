import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log("Received credentials", credentials)
                if (!credentials) {
                    console.log("Missing credentials")
                    throw new Error("Missing credentials")
                }

                if (!credentials.email || !credentials.password) {
                    console.error("Missing email or password");
                    throw new Error("Invalid email or password");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user) {
                    console.error("User not found with email:", credentials.email);
                    throw new Error("Invalid email or password");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    console.error("Invalid password for email:", credentials.email);
                    throw new Error("Invalid email or password");
                }

                return { id: user.id, email: user.email };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return { ...token, id: user.id }
            }

            return token
        },

        async session({ session, token }) {
            console.log("session callback", { session, token })

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string
                }
            }
        }
    }
}

export default authOptions
