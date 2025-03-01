import { prisma } from "@/lib/prisma"

export async function getBestSellings() {
    const grouped = await prisma.orderItem.groupBy({
        by: ["menuId"],
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

    // get the menu details for the aggregated data
    const menuIds = grouped.map((group) => group.menuId)
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

    const bestSelling = grouped.map((group) => {
        const menu = menus.find((m) => m.id === group.menuId)
        if (!menu) return null
        // assume price and cost are stored per unit on OrderItem
        // calculate average price/cost (in case there are multiple values)

        const avgPrice =
          group._sum.price && group._sum.quantity
            ? group._sum.price / group._sum.quantity
            : 0
        const avgCost =
          group._sum.cost && group._sum.quantity
            ? group._sum.cost / group._sum.quantity
            : 0
        // profit margin: ((price - cost) / price) * 100
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
        };
      });
    
      // filter out any null values in case some menu didn't match
      return bestSelling.filter((item) => item !== null)
}