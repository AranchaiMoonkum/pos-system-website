import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const { email, password, phone } = await req.json()

        // check for existing email
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        })
        if (existingEmail) {
            return Response.json(
                { message: "Email already exists" },
                { status: 400 }
            )
        }

        // check for existing phone
        const existingPhone = await prisma.user.findUnique({
            where: { phone }
        })
        if (existingPhone) {
            return Response.json(
                { message: "Phone number already exists" },
                { status: 400 }
            )
        }

        // if no conflicts exist, create the new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                phone,
            },
        })

        return Response.json({
            message: "User created successfully",
            data: newUser
        }, { status: 201 })

    } catch (error: any) {
        console.error("Server error:", error)
        return Response.json({
            message: "Something went wrong",
            error: error.message
        }, { status: 500 })
    }
}
