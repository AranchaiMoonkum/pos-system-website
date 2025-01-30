"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { deleteMenu } from "@/app/(dashboard)/menu/_actions/menu"

export const DeteleDropdownItem = ({ id }: { id: string }) => {
    return (
        <DropdownMenuItem className="cursor-pointer" onClick={() => deleteMenu(id)}>
            <p className="text-red-700">Delete</p>
        </DropdownMenuItem>
    )
}
