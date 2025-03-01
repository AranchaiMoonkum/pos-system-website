import React from "react"
import { getOverallStats } from "@/lib/stats"

// components
import { RoundChart } from "../ui/piechart"

// ui
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// icons
import {
    ChartColumnBig,
    HandCoins,
    Wallet,
    ScrollText,
} from "lucide-react"

export default async function overall() {
    const stats = await getOverallStats()

    return (
        <div className="grid grid-cols-3 grid-rows-4 gap-3">
            <RoundChart stats={stats} />
            <Card className="px-2 ">
                <div className="flex items-center">
                    <ChartColumnBig size={52} className="text-jade" />
                    <CardHeader>
                        <CardTitle>Net Sales</CardTitle>
                        <CardDescription>ยอดขายสุทธิ</CardDescription>
                    </CardHeader>
                </div>
                <CardFooter className="justify-end text-2xl text-jade">
                    <p>{stats.netSales.toFixed(2)} ฿</p>
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
                    <p>{stats.netExpenses.toFixed(2)} ฿</p>
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
                    <p>{stats.grossProfit.toFixed(2)} ฿</p>
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
                    <p>{stats.orderCount}</p>
                </CardFooter>
            </Card>
        </div>
    )
}
