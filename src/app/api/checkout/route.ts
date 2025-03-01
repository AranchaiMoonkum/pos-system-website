import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId, cart } = await req.json()

        // extract menu IDs from cart items
        const menuIds = cart.map((item: any) => item.id)

        // fetch menu details
        const menus = await prisma.menu.findMany({
            where: { id: { in: menuIds } },
            select: { id: true, price: true, cost: true }
        })

        // map cart items to order items using the data from the menu table
        const orderItemsData = cart.map((item: any) => {
            // find the menu item in the menus array
            const menu = menus.find((m: any) => m.id === item.id)

            // throw an error if the menu item is not found
            if (!menu) { throw new Error(`Menu with ID ${item.id} not found`) }

            return {
                quantity: item.quantity,
                description: item.description,
                price: menu.price,
                cost: menu.cost,
                menuId: menu.id
            }
        })

        const order = await prisma.order.create({
            data: {
                userId,
                items: {
                    create: orderItemsData
                }
            }
        })

        return NextResponse.json(order)
    } catch (error) {
        return NextResponse.json({ error: "Error creating order" }, { status: 500 })
    }
}