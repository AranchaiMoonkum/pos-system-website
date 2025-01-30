import React from "react"

import { prisma } from "@/lib/prisma"
import EditMenuForm from "@/app/(dashboard)/menu/[id]/edit/_components/EditMenuForm"

interface PageProps {
    params: Promise<{ id: string }>
}

const EditMenuPage = async ({ params }: PageProps) => {
    const { id } = await params

    const menu = await prisma.menu.findUnique({
        where: { id }
    })
    return (
        <div className="w-full">
            <div className="bg-white= p-5 rounded-xl">
                <h1 className="text-2xl font-semibold flex justify-center">
                    Edit menu
                </h1>
                <hr className="my-3" />

                <EditMenuForm menu={menu} id={id} />
            </div>
        </div>
    )
}

export default EditMenuPage
