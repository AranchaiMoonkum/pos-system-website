"use client"

import React, { useState } from "react"
import { updateProfile } from "@/app/(setting)/user/_actions/profile"

// ui
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"

// icons
import { Sandwich, SquarePen } from "lucide-react"

const UserForm = () => {
    const [userImage, setUserImage] = useState<string | null>(null)

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setUserImage(imageUrl)
        }
    }

    return (
        <div>
            <form action={updateProfile} className="flex flex-col gap-5">
                {/* Store name */}
                <div className="space-y-2">
                    <Label htmlFor="name">Store Name :</Label>
                    <Input type="text" id="name" name="name" placeholder="Insert your store name here" required />
                </div>

                {/* Telephone number */}
                <div className="space-y-2">
                    <Label htmlFor="tel">Telephone Number :</Label>
                    <Input type="tel" id="tel" name="tel" placeholder="Insert your telephone name here" required />
                </div>

                {/* Upload image */}
                <div className="flex justify-center">
                    <Avatar className="rounded-md w-[30rem] h-[30rem] relative group">
                        <Input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="absolute top-0 left-0 w-full cursor-pointer z-10 h-full opacity-0"
                            onChange={handleUserChange}
                            required
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
                </div>
            
                {/* Update button */}
                <Button variant="default" type="submit" className="py-6 text-xl">Update</Button>
            </form>
        </div>
    )
}
export default UserForm
