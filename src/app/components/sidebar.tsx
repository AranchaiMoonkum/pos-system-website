"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

//ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

//icons
import {
    User,
    Plus,
    LaptopMinimal,
    BookMarked,
    CookingPot,
    Utensils,
    LockKeyhole,
    LockKeyholeOpen,
} from "lucide-react"

function Sidebar() {

    const pathname = usePathname()

    const isActive = (href:string) => pathname === href

    return (
        <div className="w-[8rem] border bg-white relative rounded-tr-3xl shadow-lg">
            <div className="sticky top-0 flex flex-col items-center justify-around h-screen m-2">
                {/* //ยังไม่ล็อคอิน */}
                <div className="flex flex-col gap-2">
                    <Link
                        href="/sign-up"
                        className="w-full flex justify-center"
                    >
                        <Button
                            variant="ghost"
                            className={`flex-col py-10 w-full ${
                                isActive("/sign-up")
                                    ? "bg-jade text-white"
                                    : "text-pebble"
                            }`}
                        >
                            <LockKeyhole />
                            <span>Sign up</span>
                        </Button>
                    </Link>
                    <Link
                        href="/sign-in"
                        className="w-full flex justify-center"
                    >
                        <Button
                            variant="ghost"
                            className={`flex-col py-10 w-full ${
                                isActive("/sign-in")
                                    ? "bg-jade text-white"
                                    : "text-pebble"
                            }`}
                        >
                            <LockKeyholeOpen />
                            <span>Log in</span>
                        </Button>
                    </Link>
                </div>

                {/* //ล็อคอินแล้ว */}
                {/* <div className="flex flex-col gap-10 items-center">
                    <Link href="/profile">
                        <Button
                            variant="ghost"
                            className="flex-col py-10 hover:bg-transparent hover:text-night"
                        >
                            <Avatar>
                                <AvatarImage src="Kimono.jpeg" />
                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>
                            <p>POS</p>
                        </Button>
                    </Link>
                    <Link
                        href="/neworder"
                        className="w-full flex justify-center"
                    >
                        <Button
                            variant="ghost"
                            className={`flex-col py-10 w-full ${
                                isActive("/neworder")
                                    ? "bg-jade text-white"
                                    : "text-pebble"
                            }`}
                        >
                            <Plus />
                            <span>ออเดอร์ใหม่</span>
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <Link
                        href="/overview"
                        className="w-full flex justify-center"
                    >
                        <Button
                            variant="ghost"
                            className={`flex-col py-10 w-full ${
                                isActive("/overview")
                                    ? "bg-jade text-white"
                                    : "text-pebble"
                            }`}
                        >
                            <LaptopMinimal />
                            <span>ภาพรวม</span>
                        </Button>
                    </Link>
                    <Link href="/menu" className="w-full flex justify-center">
                        <Button
                            variant="ghost"
                            className={`flex-col py-10 w-full ${
                                isActive("/menu")
                                    ? "bg-jade text-white"
                                    : "text-pebble"
                            }`}
                        >
                            <BookMarked />
                            <span>เมนู</span>
                        </Button>
                    </Link>
                    <Link href="/" className="w-full flex justify-center">
                        <Button
                            variant="ghost"
                            className={`flex-col py-10 w-full ${
                                isActive("/")
                                    ? "bg-jade text-white"
                                    : "text-pebble"
                            }`}
                        >
                            <CookingPot />
                            <span>คลัง</span>
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link
                        href="/profile"
                        className="w-full flex justify-center"
                    >
                        <Button
                            variant="ghost"
                            className={`flex-col py-10 w-full ${
                                isActive("/profile")
                                    ? "bg-jade text-white"
                                    : "text-pebble"
                            }`}
                        >
                            <Utensils />
                            <span>ร้านอาหาร</span>
                        </Button>
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar
