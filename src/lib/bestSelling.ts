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
            price: true,
            cost: true,
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
            const avgPrice =
                group._sum.price && group._sum.quantity
                    ? group._sum.price / group._sum.quantity
                    : 0
                    const avgCost =
                        group._sum.cost && group._sum.quantity
                            ? group._sum.cost / group._sum.quantity
                            : 0

                            // calculate profit margin: ((price - cost) / price) * 100
                            const profitMargin =
                                avgPrice > 0 ? (((avgPrice - avgCost) / avgPrice) * 100).toFixed(2) : "0.00"

                            return {
                                menuId: menu.id,
                                menuName: menu.name,
                                category: menu.category.name,
                                quantity: group._sum.quantity || 0,
                                cost: avgCost,
                                price: avgPrice,
                                profitMargin,
                                image: menu.image,
                            }
    })

    // filter out any null values (in case of unmatched records)
    return bestSelling.filter((item) => item !== null)
}
