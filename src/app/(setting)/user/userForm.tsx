"use client"
import React, { useState } from "react"

// ui
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"

// icons
import { Sandwich, SquarePen } from "lucide-react"

const UserForm = () => {
    const [userImage, setUserImage] = useState<string | null>(null)
    const [posName, setPosName] = useState<string>("")
    const [tel, setTel] = useState<string>("")

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setUserImage(imageUrl)
        }
    }

    return (
        <div className="w-full">
            <div className="bg-white p-5 rounded-xl">
                <h1 className="text-2xl font-semibold flex justify-center">
                    Profile
                </h1>
                <hr className="my-3" />
                <form className="flex h-5/6 gap-5">
                    <Avatar className="rounded-md w-[30rem] h-[30rem] relative group">
                        <Input
                            type="file"
                            accept="image/*"
                            className="absolute top-0 left-0 w-full cursor-pointer z-10 h-full opacity-0"
                            onChange={handleUserChange}
                        />

                        {userImage ? (
                            <AvatarImage
                                src={userImage}
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
                                <Label>Store Name :</Label>
                                <Input
                                    name="posname"
                                    value={posName}
                                    onChange={(e) => setPosName(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-3 items-center">
                                <Label>Tel Number :</Label>
                                <Input
                                    name="tel"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    placeholder=""
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
            </div>
        </div>
    )
}
export default UserForm
