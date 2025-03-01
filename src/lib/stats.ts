import { prisma } from "@/lib/prisma"

export async function getOverallStats() {
    const orderItem = await prisma.orderItem.findMany({
        select: {
            quantity: true,
            price: true,
            cost: true,
        },
    })

    let netSales = 0
    let netExpenses = 0

    // calculate the net sales and net expenses
    orderItem.forEach((item) => {
        netSales += item.price * item.quantity
        netExpenses += item.cost * item.quantity
    })

    // calculate the gross profit
    const grossProfit = netSales - netExpenses

    // count the total number of orders
    const orderCount = await prisma.order.count()

    return { netSales, netExpenses, grossProfit, orderCount }
}