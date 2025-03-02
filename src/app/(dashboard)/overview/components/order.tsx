import React from "react"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import authOptions from "@/lib/auth"

// ui
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

// icons
import { ReceiptText } from "lucide-react"

//components
import OrderItemDialog from "../ui/orderItemDialog"

async function getOrders() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error("Session not found")
    }

    const userId = session.user.id

    const ordersAsc = await prisma.order.findMany({
        where: { userId: userId },
        include: {
            items: true,
        },
        orderBy: {
            createdAt: "asc",
        }
    })

    // assign a stable order number based on creation order
    const numberedOrders = ordersAsc.map((order, index) => ({
        ...order,
        orderNumber: index + 1
    }))

    const ordersDesc = numberedOrders.slice().reverse()
    return ordersDesc
}

export default async function order() {
    const orders = await getOrders()

    return (
        <div className="bg-white p-5 rounded-xl">
            <h1 className="text-2xl font-semibold flex justify-center">Orders</h1>
            <hr className="my-3" />
            <h2 className="mb-3">Total {orders.length} Orders</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Number of Items</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order, index) => {
                        // Calculate total number of items for the order
                        const numberOfItems = order.items.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                        );
                        // Calculate total price for the order (price * quantity for each item)
                        const totalPrice = order.items.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                        );
                        return (
                            <Dialog key={order.id}>
                                <DialogTrigger asChild>
                                    <TableRow className="cursor-pointer hover:bg-gray-100 transition">
                                        <TableCell className="font-medium flex gap-2">
                                            <ReceiptText />
                                            Order #{order.orderNumber}
                                        </TableCell>
                                        <TableCell>{numberOfItems}</TableCell>
                                        <TableCell>
                                            ฿{totalPrice.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </DialogTrigger>
                                <OrderItemDialog order={order} />
                            </Dialog>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
