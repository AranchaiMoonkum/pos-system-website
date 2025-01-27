"use client"

import React, { useState } from "react"
import Link from "next/link"

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
import { Sandwich, Search, SquarePen } from "lucide-react"

export default function Menu() {
    const [searchTerm, setSearchTerm] = useState("")

    const menuItems = [
        {
            id: 1,
            name: "ผัดกระเพราหมูสับ",
            category: "อาหารจานหลัก",
            cost: "฿45.00",
            price: "฿55.00",
            profit: "20%",
            image: "padkrapow.jpg",
        },
        {
            id: 2,
            name: "ต้มยำกุ้ง",
            category: "ซุป",
            cost: "฿60.00",
            price: "฿80.00",
            profit: "25%",
            image: "omelet.jpeg",
        },
        {
            id: 3,
            name: "Tom Ka Kai",
            category: "ซุป",
            cost: "฿60.00",
            price: "฿80.00",
            profit: "25%",
            image: "tomyum.jpg",
        },
    ]

    const filteredMenu = menuItems.filter((item) =>
        item.name
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(searchTerm.replace(/\s+/g, "").toLowerCase())
    )

    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h1 className="text-2xl font-semibold flex justify-center">เมนู</h1>
            <hr className="my-3" />
            <div className="flex justify-between items-center mb-4">
                <h2 className="">รายการทั้งหมด {filteredMenu.length} รายการ</h2>

                <div className="flex items-center gap-4 border p-1 rounded-lg bg-fog text-base">
                    <Search className="text-pebble" />
                    <input
                        type="text"
                        placeholder="ค้นหาเมนู"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="outline-none bg-transparent placeholder:text-pebble"
                    />
                </div>
            </div>
            <hr className="my-3" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>เมนู</TableHead>
                        <TableHead>หมวดหมู่</TableHead>
                        <TableHead>ต้นทุน</TableHead>
                        <TableHead>ราคา</TableHead>
                        <TableHead>กำไร</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMenu.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium flex gap-2 items-center">
                                <Avatar className="rounded-md">
                                    <AvatarImage
                                        className="rounded-md"
                                        src={item.image}
                                    />
                                    <AvatarFallback className="rounded-md">
                                        <Sandwich />
                                    </AvatarFallback>
                                </Avatar>

                                {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.cost}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.profit}</TableCell>
                            <TableCell>
                                <Link
                                    href={`/menu/${encodeURIComponent(
                                        item.name
                                    )}`}
                                >
                                    <SquarePen className="text-amber"/>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
