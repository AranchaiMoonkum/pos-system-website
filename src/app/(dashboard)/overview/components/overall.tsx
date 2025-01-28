import React from "react"

//components
import { RoundChart } from "../ui/piechart"

//ui
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

//icons
import {
    ChartColumnBig,
    HandCoins,
    Wallet,
    ScrollText,
    ReceiptText,
} from "lucide-react"

export default function overall() {
    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-3">
            <RoundChart />
            <Card className="px-2 ">
                <div className="flex items-center">
                    <ChartColumnBig size={52} className="text-jade" />
                    <CardHeader>
                        <CardTitle>Net Sales</CardTitle>
                        <CardDescription>ยอดขายสุทธิ</CardDescription>
                    </CardHeader>
                </div>
                <CardFooter className="justify-end text-2xl text-jade">
                    <p>฿1350.00</p>
                </CardFooter>
            </Card>
            <Card className="px-2 ">
                <div className="flex items-center">
                    <HandCoins size={52} className="text-amber" />
                    <CardHeader>
                        <CardTitle>Net Expenses</CardTitle>
                        <CardDescription>ค่าใช้จ่ายสุทธิ</CardDescription>
                    </CardHeader>
                </div>
                <CardFooter className="justify-end text-2xl text-amber">
                    <p>฿2000.00</p>
                </CardFooter>
            </Card>
            <Card className="px-2 col-start-2">
                <div className="flex items-center">
                    <Wallet size={52} className="text-aqua" />
                    <CardHeader>
                        <CardTitle>Gross Profit</CardTitle>
                        <CardDescription>กำไรขั้นต้น</CardDescription>
                    </CardHeader>
                </div>
                <CardFooter className="justify-end text-2xl text-aqua">
                    <p>฿500.00</p>
                </CardFooter>
            </Card>
            <Card className="px-2 col-start-3">
                <div className="flex items-center">
                    <ScrollText size={52} />
                    <CardHeader>
                        <CardTitle>Number Of Orders</CardTitle>
                        <CardDescription>จำนวนออเดอร์</CardDescription>
                    </CardHeader>
                </div>
                <CardFooter className="justify-end text-2xl">
                    <p>15</p>
                </CardFooter>
            </Card>
            <div className="col-span-2 row-span-2 col-start-2 row-start-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Type</TableHead>
                            <TableHead>Number of Items</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Profit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                ShopeeFood
                            </TableCell>
                            <TableCell>3</TableCell>
                            <TableCell>฿150.00</TableCell>
                            <TableCell>24%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
