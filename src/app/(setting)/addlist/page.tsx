"use client"

import React, { useState } from "react"

//ui
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

//icons
import { Trash } from "lucide-react"

export default function AddList() {
    const [categories, setCategories] = useState<string[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const handleAddCategory = () => {
        if (inputValue.trim() !== "") {
            setCategories([...categories, inputValue])
            setInputValue("")
        }
    }

    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h1 className="text-2xl font-semibold flex justify-center">
                เพิ่มหมวดหมู่
            </h1>
            <hr className="my-3" />

            <Table>
                <TableBody>
                    {categories.map((category, index) => (
                        <TableRow key={index} className="flex justify-between">
                            <TableCell>{category}</TableCell>
                            <TableCell className="cursor-pointer"><Trash className="text-red-600"/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex gap-3 mt-4">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="ชื่อ..."
                />

                {/* Add button */}
                <Button
                    onClick={handleAddCategory}
                    variant="amber"
                    className="px-6"
                >
                    เพิ่มหมวดหมู่
                </Button>
            </div>
            <Button variant="default" className="w-full mt-10 py-8 text-2xl">
                บันทึก
            </Button>
        </div>
    )
}
