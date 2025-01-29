import React from "react"
import Searchbar from "./searchbar"
import MenulistDialog from "./menulistDialog"

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Icons
import { Sandwich } from "lucide-react"

interface MenuItem {
    id: string
    name: string
    price: number
    image: string
    category: string
}

const menuItems: MenuItem[] = [
    {
        id: "1",
        name: "ผัดกระเพราหมู",
        price: 45,
        image: "/padkrapow.jpg",
        category: "อาหารจานหลัก",
    },
    {
        id: "2",
        name: "ข้าวไข่เจียว",
        price: 35,
        image: "/omelet.jpeg",
        category: "อาหารจานหลัก",
    },
]

const MenuList = () => {
    return (
        <div>
            <Searchbar />
            <div className="flex gap-5 border-b">
                <button className="pb-2 border-b-2 border-jade font-semibold text-jade">
                    อาหารจานหลัก
                </button>
                <button className="pb-2 text-pebble">เครื่องดื่ม</button>
            </div>

            <ScrollArea className="h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mt-5 md:grid-cols-3">
                    {menuItems.map((item) => (
                        <MenulistDialog key={item.id} item={item}>
                            <div className="cursor-pointer h-64 rounded-xl shadow-md flex flex-col items-start">
                                <Avatar className="rounded-xl w-full h-36">
                                    {item.image ? (
                                        <AvatarImage
                                            src={item.image}
                                            alt="Menu Image"
                                            className="rounded-md object-cover"
                                        />
                                    ) : (
                                        <AvatarFallback className="rounded-xl">
                                            <Sandwich />
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="h-full flex-col flex justify-between p-2">
                                    {item.name}
                                    <p className="text-jade">{item.price} ฿</p>
                                </div>
                            </div>
                        </MenulistDialog>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default MenuList
