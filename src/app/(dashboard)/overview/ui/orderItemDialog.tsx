import React from "react"

//ui
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface OrderItem {
    id: string
    menuName: string
    quantity: number
    price: number
    description: string
}

interface Order {
    id: string
    orderNumber: number
    items: OrderItem[]
}

interface OrderItemDialogProps {
    order: Order
}

export default function OrderItemDialog({ order }: OrderItemDialogProps) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Order #{order.orderNumber}</DialogTitle>
            </DialogHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Menu</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order.items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div>
                                    <span className="font-semibold">
                                        {item.menuName}
                                    </span>
                                    {item.description && (
                                        <p className="text-sm text-gray-500">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>฿{item.price.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DialogClose className="mt-4 px-4 py-2 bg-jade text-white rounded-lg">
                Close
            </DialogClose>
        </DialogContent>
    )
}
