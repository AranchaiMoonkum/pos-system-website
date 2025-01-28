import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            throw new Error("Session not found")
        }

        const userId = session.user.id
        const { name } = await req.json()

        // check for existing category
        const existingCategory = await prisma.category.findUnique({
            where: { name: name }
        })

        if (existingCategory) {
            return Response.json({
                message: "Category already exists",
                category: existingCategory
            }, { status: 409 })
        }

        // create new category
        const category = await prisma.category.create({
            data: {
                name,
                createdBy: { connect: { id: userId } }
            }
        })

        return Response.json({
            message: "Category created successfully",
            category
        }, { status: 201 })
    } catch (error: any) {
        console.error("Server error:", error)
        return Response.json({
            message: "Something went wrong",
            error: error.message
        }, { status: 500 })
    }
}

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: { createdBy: true }
        })

        return Response.json(categories, { status: 200 })
    } catch (error: any) {
        return Response.json({
            message: "Something went wrong",
            error: error.message
        }, { status: 500 })
    }
}
