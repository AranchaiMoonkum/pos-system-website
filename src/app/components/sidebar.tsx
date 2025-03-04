"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

// ui
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// icons
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

type UserProfile = {
    name: string
    image: string
}

function Sidebar() {
    const pathname = usePathname()
    const isActive = (href: string) => pathname === href
    const { data: session } = useSession()

    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user")
                const data = await res.json()
                setUser(data)
            } catch (error) {
                console.error("Failed to fetch user. " + error)
            }
        }

        fetchUser()
    }, [])

    return (
        <div className="w-[8rem] border bg-white relative rounded-tr-3xl shadow-lg">
            <div className="sticky top-0 flex flex-col items-center justify-around h-screen m-2">
                {session ? (
                    // Logged-in view
                    <>
                        <div className="flex flex-col gap-10 items-center">
                            <Link href="/user">
                                <Button
                                    variant="none"
                                    className="flex-col py-10 text-pebble"
                                >
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.image}
                                        />
                                        <AvatarFallback>
                                            <User />
                                        </AvatarFallback>
                                    </Avatar>
                                    <p>{user?.name || "Profile"}</p>
                                </Button>
                            </Link>
                            <Link
                                href="/new-order"
                                className="w-full flex justify-center"
                            >
                                <Button
                                    variant="ghost"
                                    className={`flex-col py-10 w-full ${
                                        isActive("/new-order")
                                            ? "bg-jade text-white"
                                            : "text-pebble"
                                    }`}
                                >
                                    <Plus />
                                    <span>New Order</span>
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
                                    <span>Overview</span>
                                </Button>
                            </Link>
                            <Link
                                href="/menu"
                                className="w-full flex justify-center"
                            >
                                <Button
                                    variant="ghost"
                                    className={`flex-col py-10 w-full ${
                                        isActive("/menu")
                                            ? "bg-jade text-white"
                                            : "text-pebble"
                                    }`}
                                >
                                    <BookMarked />
                                    <span>Menu</span>
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/restaurant"
                                className="w-full flex justify-center"
                            >
                                <Button
                                    variant="ghost"
                                    className={`flex-col py-10 w-full ${
                                        isActive("/restaurant")
                                            ? "bg-jade text-white"
                                            : "text-pebble"
                                    }`}
                                >
                                    <Utensils />
                                    <span>Restaurant</span>
                                </Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    // Not logged-in view
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
                )}
            </div>
        </div>
    )
}

export default Sidebar