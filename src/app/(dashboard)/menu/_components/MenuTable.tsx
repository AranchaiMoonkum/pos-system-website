import authOptions from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import Link from "next/link"

import { DeteleDropdownItem } from "./MenuAction"

// ui
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// icons
import { EllipsisVertical } from "lucide-react"
import { Sandwich } from "lucide-react"

const getMenus = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) { throw new Error("Session not found") }

    const userId = session.user.id

    return prisma.menu.findMany({
        where: { createdBy: { id: userId } },
        include: { category: true }
    })
}

const MenuTable = async () => {
    const menus = await getMenus()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Menu Image</TableHead>
                    <TableHead>Menu Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {menus.map((menu) => (
                    <TableRow key={menu.id}>
                        <TableCell className="flex justify-center">
                            <Avatar className="rounded-md">
                                <AvatarImage className="rounded-md" src={menu.image} />
                                <AvatarFallback className="rounded-md">
                                    <Sandwich />
                                </AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{menu.name}</TableCell>
                        <TableCell>{menu.category.name}</TableCell>
                        <TableCell>{menu.cost}</TableCell>
                        <TableCell>{menu.price}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button>
                                        <span className="sr-only">Open actions</span>
                                        <EllipsisVertical />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link href={`/menu/${menu.id}/edit`}>
                                            Edit this menu
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DeteleDropdownItem id={menu.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default MenuTable
