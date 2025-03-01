import React from "react"

// ui
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// icons
import { ReceiptText } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getOrders() {
    return await prisma.order.findMany({
        include: {
            items: true, // include items in the order
        },
        orderBy: {
            createdAt: "desc", // order by created date descending
        }
    })
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
                            <TableRow key={order.id}>
                                <TableCell className="font-medium flex gap-2">
                                    <ReceiptText />
                                    Order #{index + 1}
                                </TableCell>
                                <TableCell>{numberOfItems}</TableCell>
                                <TableCell>฿{totalPrice.toFixed(2)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    )
}
