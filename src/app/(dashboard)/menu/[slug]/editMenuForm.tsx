"use client"

import { useParams } from "next/navigation"
import { useState } from "react"

//ui
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"

//icons
import { Sandwich, SquarePen } from "lucide-react"

const menuItems = [
    {
        id: 1,
        name: "ผัดกระเพราหมูสับ",
        category: "อาหารจานหลัก",
        cost: "฿45.00",
        price: "฿55.00",

        image: "/padkrapow.jpg",
    },
    {
        id: 2,
        name: "ต้มยำกุ้ง",
        category: "ซุป",
        cost: "฿60.00",
        price: "฿80.00",

        image: "/omelet.jpeg",
    },
    {
        id: 3,
        name: "Tom Ka Kai",
        category: "ซุป",
        cost: "฿60.00",
        price: "฿80.00",

        image: "/tomyum.jpg",
    },
]

const EditMenuForm = () => {
    const params = useParams()
    const slug = Array.isArray(params?.slug)
        ? decodeURIComponent(params.slug[0])
        : decodeURIComponent(params?.slug || "")

    const menuItem = menuItems.find((item) => item.name === slug)

    if (!menuItem) {
        return <div>ไม่พบเมนูนี้</div>
    }

    const [formData, setFormData] = useState({
        name: menuItem.name,
        category: menuItem.category,
        cost: menuItem.cost,
        price: menuItem.price,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleCategoryChange = (value: string) => {
        setFormData({
            ...formData,
            category: value,
        })
    }

    return (
        <div className="w-full">
            <div className="bg-white p-5 rounded-xl">
                <h1 className="text-2xl font-semibold flex justify-center">
                    Edit Product
                </h1>
                <hr className="my-3" />
                {/* <Form> */}
                <form className="flex h-5/6 gap-5">
                    <Avatar className="rounded-md w-[30rem] h-[30rem] relative group">
                        <Input
                            type="file"
                            className="absolute top-0 left-0 w-full cursor-pointer z-10 h-full opacity-0"
                        />

                        <AvatarImage
                            src={menuItem.image}
                            alt="Menu Image"
                            className="rounded-md"
                        />

                        <AvatarFallback className="rounded-md">
                            <Sandwich />
                        </AvatarFallback>

                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            <SquarePen />
                        </div>
                    </Avatar>

                    <div className="flex flex-col gap-4 w-full justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 items-center ">
                                <Label>Product name :</Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                />
                            </div>
                            <div className="flex gap-3 items-center">
                                <Label>Category :</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={handleCategoryChange}
                                >
                                    <SelectTrigger>
                                        <span>{formData.category}</span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="อาหารจานหลัก">
                                            อาหารจานหลัก
                                        </SelectItem>
                                        <SelectItem value="ซุป">ซุป</SelectItem>
                                        <SelectItem value="ของหวาน">
                                            ของหวาน
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Label>Cost :</Label>
                                <Input
                                    name="cost"
                                    value={formData.cost}
                                    onChange={handleChange}
                                    placeholder="Cost"
                                />
                            </div>
                            <div className="flex gap-3 items-center">
                                <Label>Price :</Label>
                                <Input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Price"
                                />
                            </div>
                        </div>
                        <Button
                            variant="default"
                            type="submit"
                            className="py-8 text-xl"
                        >
                            Update
                        </Button>
                    </div>
                </form>
                {/* </Form> */}
            </div>
        </div>
    )
}

export default EditMenuForm
