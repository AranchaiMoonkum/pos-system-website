"use client"

import React, { useEffect, useState } from "react"

// ui
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// icons
import { Sandwich, SquarePen } from "lucide-react"

type Category = {
    id: string
    name: string
}

export const AddMenuForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [menuImage, setMenuImage] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/category")
                const data = await res.json()

                setCategories(data)
            } catch (error) {
                console.error("Failed to fetch categories. " + error)
            }
        }

        fetchCategories()
    }, [])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setMenuImage(imageUrl)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const formData = new FormData(e.currentTarget)

            const res = await fetch("/api/menu", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                setError("Failed to create menu")
            } else {
                setSuccess("Menu created successfully")

                setTimeout(() => {
                    location.reload()
                }, 1000)
            }
        } catch (error) {
            setError("Error submitting form: " + error)
        }
    }

    return (
        <div>
            {/* Display error message */}
            {error && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
                    {error}
                </div>
            )}

            {/* Display success message */}
            {success && (
                <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded-md">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex h-5/6 gap-5">
                <input type="hidden" name="categoryId" value={selectedCategory || ""} />

                <Avatar className="rounded-md w-[30rem] h-[30rem] relative group">
                    <Input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="absolute top-0 left-0 w-full cursor-pointer z-10 h-full opacity-0"
                        onChange={handleImageChange}
                        required
                    />

                    {menuImage ? (
                        <AvatarImage
                            src={menuImage}
                            alt="Menu Image"
                            className="rounded-md object-cover"
                        />
                    ) : (
                        <AvatarFallback className="rounded-md">
                            <Sandwich />
                        </AvatarFallback>
                    )}

                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        <SquarePen />
                    </div>
                </Avatar>

                <div className="flex flex-col gap-4 w-full justify-between">
                    <div className="flex flex-col gap-4">

                        <div className="flex gap-3 items-center">
                            <Label htmlFor="name">Product Name :</Label>
                            <Input type="text" name="name" id="name" required />
                        </div>

                        <div className="flex gap-3 items-center">
                            <Label>Category :</Label>
                            <Select name="categoryId" onValueChange={(value) => setSelectedCategory(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-3 items-center">
                            <Label htmlFor="cost">Cost :</Label>
                            <Input type="text" name="cost" id="cost" required />
                        </div>

                        <div className="flex gap-3 items-center">
                            <Label htmlFor="price">Price :</Label>
                            <Input type="text" name="price" id="price" required />
                        </div>
                    </div>
                    <Button
                        variant="default"
                        type="submit"
                        className="py-8 text-xl"
                    >
                        Add Menu
                    </Button>
                </div>
            </form>
        </div>
    )
}
