import React from "react"
import Link from "next/link"

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
    return (
        <div className="w-[8rem] border bg-white relative rounded-tr-3xl shadow-lg">
            <div className="sticky top-0 flex flex-col items-center justify-around h-screen m-2">
                {/* //ยังไม่ล็อคอิน */}
                <div className="flex flex-col gap-2">
                    <Button asChild variant="ghost" className="flex-col py-10">
                        <Link href="/sign-up">
                            <LockKeyhole />
                            <span>Sign up</span>
                        </Link>
                    </Button>

                    <Button asChild variant="ghost" className="flex-col py-10">
                        <Link href="/sign-in">
                            <LockKeyholeOpen />
                            <span>Log in</span>
                        </Link>
                    </Button>
                </div>

                {/* //ล็อคอินแล้ว */}
                {/* <div className="flex flex-col gap-10">
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
                    <Button
                        variant="ghost"
                        className="flex-col py-10 text-pebble"
                    >
                        <Plus />
                        <span>ออเดอร์ใหม่</span>
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        variant="ghost"
                        className="flex-col py-10 text-pebble"
                    >
                        <LaptopMinimal />
                        <span>ภาพรวม</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex-col py-10 text-pebble"
                    >
                        <BookMarked />
                        <span>เมนู</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className="flex-col py-10 text-pebble"
                    >
                        <CookingPot />
                        <span>คลัง</span>
                    </Button>
                </div>
                <div>
                    <Button
                        variant="ghost"
                        className="flex-col py-10 text-pebble"
                    >
                        <Utensils />
                        <span>ร้านอาหาร</span>
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar
