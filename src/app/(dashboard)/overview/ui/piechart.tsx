"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { category: "ยอดขายสุทธิ", value: 1350, fill: "#2F4F4F" },
    { category: "ค่าใช้จ่ายสุทธิ", value: 2000, fill: "#AF7D18" },
    { category: "กำไรขั้นต้น", value: 500, fill: "#425AB0" },
]

const chartConfig = {
    value: {
        label: "Value",
    },
    netSales: {
        label: "ยอดขายสุทธิ",
        color: "#2F4F4F",
    },
    netExpenses: {
        label: "ค่าใช้จ่ายสุทธิ",
        color: "#AF7D18",
    },
    grossProfit: {
        label: "กำไรขั้นต้น",
        color: "#425AB0",
    },
} satisfies ChartConfig

export function RoundChart() {
    const totalValue = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.value, 0)
    }, [])

    // คำนวณเปอร์เซ็นต์กำไรต่อยอดขาย
    const netSales =
        chartData.find((item) => item.category === "ยอดขายสุทธิ")?.value || 0
    const grossProfit =
        chartData.find((item) => item.category === "กำไรขั้นต้น")?.value || 0
    const profitMargin = ((grossProfit / netSales) * 100).toFixed(2) // คำนวณเปอร์เซ็นต์กำไร

    return (
        <Card className="flex flex-col row-span-4">
            <CardHeader className="items-center pb-0">
                <CardTitle>ภาพรวม</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="category"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalValue.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-col gap-6 text-base text-pebble">
                {/* แสดงข้อมูลสีและหมวดหมู่ */}
                <div className="flex flex-col gap-3">
                    {chartData.map((item) => (
                        <div
                            key={item.category}
                            className="flex items-center gap-2"
                        >
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: item.fill }}
                            ></div>
                            <span>{item.category}:</span>
                            <span>{item.value} ฿</span>
                        </div>
                    ))}
                </div>
                {/* แสดงกำไรต่อยอดขาย */}
                <div className="flex items-center gap-2 text-night font-medium leading-none">
                    กำไรต่อยอดขาย: {profitMargin}%
                </div>
            </CardFooter>
        </Card>
    )
}
