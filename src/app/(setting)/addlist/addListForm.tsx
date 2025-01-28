"use client"

import React, { useState } from "react"

//ui
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

//icons
import { Trash } from "lucide-react"

const AddListForm = () => {
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
                Add Category
            </h1>
            <hr className="my-3" />

            <Table>
                <TableBody>
                    {categories.map((category, index) => (
                        <TableRow key={index} className="flex justify-between">
                            <TableCell>{category}</TableCell>
                            <TableCell className="cursor-pointer">
                                <Trash className="text-red-600" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex gap-3 mt-4">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Name..."
                />

                {/* Add button */}
                <Button
                    onClick={handleAddCategory}
                    variant="amber"
                    className="px-6"
                >
                    Add
                </Button>
            </div>
            <Button variant="default" className="w-full mt-10 py-8 text-2xl">
                Submit
            </Button>
        </div>
    )
}
export default AddListForm
