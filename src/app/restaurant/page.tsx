import React from "react"
import Link from "next/link"

//ui
import { Button } from "@/components/ui/button"

//icons
import { BookPlus, Grid2X2Plus, UserRoundPen } from "lucide-react"

export default function Profile() {
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h1 className="text-2xl font-semibold flex justify-center">
                ร้านอาหารของคุณ
            </h1>
            <hr className="my-3" />
            <div className="flex text-pebble">
                <Link href="/user" className="flex justify-center">
                    <Button variant="ghost" className="flex-col py-10 w-full">
                        <UserRoundPen />
                        <span>แก้ไขโปรไฟล์</span>
                    </Button>
                </Link>
                <Link href="/addlist" className="flex justify-center">
                    <Button variant="ghost" className="flex-col py-10 w-full">
                        <Grid2X2Plus />
                        <span>เพิ่มหมวดหมู่</span>
                    </Button>
                </Link>
                <Link href="/addmenu" className="flex justify-center">
                    <Button variant="ghost" className="flex-col py-10 w-full">
                        <BookPlus />
                        <span>เพิ่มเมนู</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
