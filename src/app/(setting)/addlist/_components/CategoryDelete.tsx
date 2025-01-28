"use client"

// action
import { deleteCategory } from "@/app/(setting)/addlist/_actions/category"

// ui
import { Button } from "@/components/ui/button"

// icons
import { Trash } from "lucide-react"

const CategoryDelete = ({ id }: { id: string }) => {
    return (
        <Button onClick={() => deleteCategory(id)}>
            <Trash />
        </Button>
    )
}

export default CategoryDelete
