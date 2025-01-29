import authOptions from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) { throw new Error("Session not found") }

        const userId = session.user.id

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, image: true }
        })

        if (!user) { throw new Error("User not found") }

        return Response.json(user, { status: 200 })
    } catch (error: any) {
        return Response.json({
            message: "Something went wrong",
            error: error.message
        }, { status: 500 })
    }
}