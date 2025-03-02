import { prisma } from "@/lib/prisma"

export async function getOrderItems(orderId: string) {
    const orderItems = await prisma.orderItem.findMany({
        where: { orderId },
        select: {
            id: true,
            quantity: true,
            price: true,
            description: true,
            menuId: true,
        },
    })

    const menuIds = orderItems.map((item) => item.menuId)

    if (menuIds.length === 0) {
        return []
    }

    const menus = await prisma.menu.findMany({
        where: { id: { in: menuIds } },
        select: {
            id: true,
            name: true,
        },
    })

    const grouped = await prisma.orderItem.groupBy({
        by: ["menuId"],
        where: {
            menuId: { in: menuIds },
        },
        _sum: {
            quantity: true,
        },
        orderBy: {
            _sum: {
                quantity: "desc",
            },
        },
    })

    const groupedMenus = grouped
        .map((group) => {
            const menu = menus.find((m) => m.id === group.menuId)
            if (!menu) return null

            return {
                menuId: menu.id,
                menuName: menu.name,
                quantity: group._sum.quantity || 0,
            }
        })
        .filter(Boolean)

    return groupedMenus
}
