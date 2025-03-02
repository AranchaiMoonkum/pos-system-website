import { prisma } from "@/lib/prisma"

export async function getBestSellings(userId: string) {
    // find all menus created by the current user
    const userMenus = await prisma.menu.findMany({
        where: { createdById: userId },
        select: { id: true },
    })
    const menuIds = userMenus.map((menu) => menu.id)

    // if there are no menus for this user, return an empty array
    if (menuIds.length === 0) {
        return []
    }

    // group order items for only the menus belonging to this user
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

    // fetch menu details for the grouped menu IDs
    const menus = await prisma.menu.findMany({
        where: { id: { in: menuIds } },
        select: {
            id: true,
            name: true,
            image: true,
            price: true,
            cost: true,
            category: { select: { name: true } },
        },
    })

    // map the aggregated order data to the menu details
    const bestSelling = grouped.map((group) => {
        const menu = menus.find((m) => m.id === group.menuId)
        if (!menu) return null

        // calculate average price and cost per unit
        const originalPrice = menu.price
        const originalCost = menu.cost

        // calculate profit margin: ((price - cost) / price) * 100
        const profitMargin =
            originalPrice > 0
                ? (
                      ((originalPrice - originalCost) / originalPrice) *
                      100
                  ).toFixed(2)
                : "0.00"

        return {
            menuId: menu.id,
            menuName: menu.name,
            category: menu.category.name,
            quantity: group._sum.quantity || 0,
            cost: originalCost,
            price: originalPrice,
            profitMargin,
            image: menu.image,
        }
    })

    // filter out any null values (in case of unmatched records)
    return bestSelling.filter((item) => item !== null)
}
