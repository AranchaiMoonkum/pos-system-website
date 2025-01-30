import authOptions from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import fs from "fs/promises"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const userId = session.user.id

        const formData = await req.formData()

        // Get form fields
        const name = formData.get("name") as string
        const categoryId = formData.get("categoryId") as string
        const cost = parseFloat(formData.get("cost") as string)
        const price = parseFloat(formData.get("price") as string)
        const image = formData.get("image") as File

        // Validate required fields
        if (!name || !categoryId || !cost || !price || !image) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        await fs.mkdir("public/menus", { recursive: true })
        const imagePath = `/menus/${crypto.randomUUID()}-${image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()))

        const newMenu = await prisma.menu.create({
            data: {
                name,
                price,
                cost,
                image: imagePath,
                category: { connect: { id: categoryId } },
                createdBy: { connect: { id: userId } }
            }
        })


        return Response.json({
            message: "Menu created successfully",
            data: newMenu,
        }, { status: 201 })
    } catch (error) {
        console.error("Server error:", error)
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return Response.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const userId = session.user.id

        const menus = await prisma.menu.findMany({
            where: { createdBy: { id: userId } },
        })

        return Response.json(menus, { status: 200 })
    } catch (error) {
        console.error("Server error:", error)
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
