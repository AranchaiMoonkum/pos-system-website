import React from "react"
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// icons
import { Sandwich } from "lucide-react"
import { getBestSellings } from "@/lib/bestSelling"

export default async function bsm() {
    const session = await getServerSession(authOptions) 

    if (!session || !session.user) {
        throw new Error("Session not found")
    }

    const userId = session.user.id

    const bestSellingMenus = await getBestSellings(userId)

    return (
        <div className="bg-white p-5 rounded-xl">
            <h1 className="text-2xl font-semibold flex justify-center">
                Best-Selling Menu
            </h1>
            <hr className="my-3" />
            <h2 className="">Total {bestSellingMenus.length} Items</h2>
            <hr className="my-3" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Menu</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Profit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bestSellingMenus.map((item) => (
                        <TableRow key={item.menuId}>
                            <TableCell className="font-medium flex gap-2 items-center">
                                <Avatar className="rounded-md">
                                    <AvatarImage className="rounded-md" src={item.image} />
                                    <AvatarFallback className="rounded-md">
                                        <Sandwich />
                                    </AvatarFallback>
                                </Avatar>
                                {item.menuName}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>฿{item.cost.toFixed(2)}</TableCell>
                            <TableCell>฿{item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.profitMargin}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
