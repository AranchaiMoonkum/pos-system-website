import React from "react"

//ui
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

//icons
import { ReceiptText } from "lucide-react"

export default function order() {
    return (
        <div className="bg-white p-5 rounded-xl">
            <h1 className="text-2xl font-semibold flex justify-center">
                Orders
            </h1>
            <hr className="my-3" />
            <h2 className="">Total 23 Orders</h2>
            <hr className="my-3" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Number of Items</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium flex gap-2">
                            <ReceiptText />
                            Order #31
                        </TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Dine-in</TableCell>
                        <TableCell>฿150.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium flex gap-2">
                            <ReceiptText />
                            Order #31
                        </TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Dine-in</TableCell>
                        <TableCell>฿150.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
