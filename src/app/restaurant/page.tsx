import React from "react"
import Link from "next/link"

//ui
import { Button } from "@/components/ui/button"

//icons
import { BookPlus, Grid2X2Plus, LogOut } from "lucide-react"

export default function Profile() {
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h1 className="text-2xl font-semibold flex justify-center">
                Yourname
            </h1>
            <hr className="my-3" />
            <div className="flex text-pebble gap-5">
                <Link href="/addlist" className="flex justify-center">
                    <Button variant="ghost" className="flex-col py-10 w-full">
                        <Grid2X2Plus />
                        <span>Add category</span>
                    </Button>
                </Link>
                <Link href="/addmenu" className="flex justify-center">
                    <Button variant="ghost" className="flex-col py-10 w-full">
                        <BookPlus />
                        <span>Add Menu</span>
                    </Button>
                </Link>
                <Link href="/" className="flex justify-center">
                    <Button
                        variant="destructive"
                        className="flex-col py-10 w-full"
                    >
                        <LogOut />
                        <span>Log Out</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
