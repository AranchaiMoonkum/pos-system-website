import authOptions from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import fs from "fs/promises"
import { getServerSession } from "next-auth"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params

    try {
        const menu = await prisma.menu.delete({ where: { id } })

        await fs.unlink(`public${menu.image}`)

        return Response.json(menu, { status: 200 })
    } catch (error) {
        return Response.json({ error: "Failed to delete category" }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params

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

        // get form fields
        const name = formData.get("name") as string
        const categoryId = formData.get("categoryId") as string
        const cost = parseFloat(formData.get("cost") as string)
        const price = parseFloat(formData.get("price") as string)
        const image = formData.get("image") as File

        const menu = await prisma.menu.findUnique({
            where: { id }
        })

        if (menu == null) {
            console.error("Menu not found:", id)
            return Response.json(
                { error: "Menu not found" },
                { status: 404 }
            )
        }

        // start with existing image path
        let imagePath = menu.image

        // only process new image if it exists and has size
        if (image != null && image.size > 0) {
            // delete old image
            await fs.unlink(`public${menu.image}`)

            // create new iamge path and save file
            imagePath = `/menus/${crypto.randomUUID()}-${image.name}`
            await fs.writeFile(`public${imagePath}`, Buffer.from(await image.arrayBuffer()))
        }

        const updateMenu = await prisma.menu.update({
            where: { id },
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
            message: "Menu updated successfully",
            data: updateMenu,
        }, { status: 200 })
    } catch (error) {
        console.error("Server error:", error)
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
