"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
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

interface Stats {
    netSales: number
    netExpenses: number
    grossProfit: number
}

const chartConfig = {
    value: {
        label: "Value",
    },
    netSales: {
        label: "Net Sales",
        color: "#2F4F4F",
    },
    netExpenses: {
        label: "Net Expenses",
        color: "#AF7D18",
    },
    grossProfit: {
        label: "Gross Profit",
        color: "#425AB0",
    },
} satisfies ChartConfig

interface RoundChartProps {
    stats: Stats
}

export function RoundChart({ stats }: RoundChartProps) {
    // Build chart data dynamically from the passed stats
    const chartData = [
        { category: "Net Sales", value: stats.netSales, fill: chartConfig.netSales.color },
        { category: "Net Expenses", value: stats.netExpenses, fill: chartConfig.netExpenses.color },
        { category: "Gross Profit", value: stats.grossProfit, fill: chartConfig.grossProfit.color },
    ]

    const totalValue = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.value, 0)
    }, [chartData])

    const profitMargin = stats.netSales ? ((stats.grossProfit / stats.netSales) * 100).toFixed(2) : "0.00"

    return (
        <Card className="flex flex-col row-span-4">
            <CardHeader className="items-center pb-0">
                <CardTitle>Overview</CardTitle>
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
                            <span>{item.value.toFixed(2)} ฿</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-night font-medium leading-none">
                    Profit Margin: {profitMargin}%
                </div>
            </CardFooter>
        </Card>
    )
}
