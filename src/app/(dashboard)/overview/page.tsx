import React from "react"
import MonthPicker from "@/app/components/monthPicker"

//ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

//components
import Overall from "./components/overall"
import Order from "./components/order"
import BSM from "./components/bsm"


//icons
import { LaptopMinimal } from "lucide-react"

export default function Overview() {
    return (
        <div className="w-full">
            <Tabs defaultValue="overview">
                <div className="flex gap-5 justify-between">
                    <TabsList>
                        <TabsTrigger value="overview" className="gap-5 px-10">
                            <LaptopMinimal />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="order" className="gap-5 px-10">
                            <LaptopMinimal />
                            Orders
                        </TabsTrigger>
                        <TabsTrigger value="bsm" className="gap-5 px-10">
                            <LaptopMinimal />
                            Best-Selling Menu
                        </TabsTrigger>
                    </TabsList>
                    <MonthPicker />
                </div>
                <div>
                    <TabsContent value="overview">
                        <Overall />
                    </TabsContent>
                    <TabsContent value="order">
                        <Order />
                    </TabsContent>
                    <TabsContent value="bsm">
                        <BSM />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}
