"use client"
import React, { useState } from "react"

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

export default function Addmenu() {
    const [menuImage, setMenuImage] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setMenuImage(imageUrl)
        }
    }

    return (
        <div className="w-full">
            <div className="bg-white p-5 rounded-xl">
                <h1 className="text-2xl font-semibold flex justify-center">
                    เพิ่มเมนู
                </h1>
                <hr className="my-3" />
                {/* <Form> */}
                <form className="flex h-5/6 gap-5">
                    <Avatar className="rounded-md w-[30rem] h-[30rem] relative group">
                        <Input
                            type="file"
                            accept="image/*"
                            className="absolute top-0 left-0 w-full cursor-pointer z-10 h-full opacity-0"
                            onChange={handleImageChange}
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
                            <div className="flex gap-3 items-center ">
                                <Label>ชื่ออาหาร :</Label>
                                <Input name="name" />
                            </div>
                            <div className="flex gap-3 items-center">
                                <Label>หมวดหมู่ :</Label>
                                <Select>
                                    <SelectTrigger>
                                        <span>เลือกหมวดหมู่</span>
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
                                <Label>ต้นทุน :</Label>
                                <Input name="cost" />
                            </div>
                            <div className="flex gap-3 items-center">
                                <Label>ราคาขาย :</Label>
                                <Input name="price" />
                            </div>
                        </div>
                        <Button
                            variant="default"
                            type="submit"
                            className="py-8 text-xl"
                        >
                            เพิ่มเมนู
                        </Button>
                    </div>
                </form>
                {/* </Form> */}
            </div>
        </div>
    )
}
