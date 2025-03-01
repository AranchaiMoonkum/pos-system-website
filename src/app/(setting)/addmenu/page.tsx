import React from "react"

// ui
import { AddMenuForm } from "@/app/(setting)/addmenu/_components/AddMenuForm"

const AddMenuPage = () => {
    return (
        <div className="w-full">
            <div className="bg-white p-5 rounded-xl">
                <h1 className="text-2xl font-semibold flex justify-center">
                    Add Menu
                </h1>
                <hr className="my-3" />

                {/* Add Menu Form */}
                <AddMenuForm />
            </div>
        </div>
    )
}

export default AddMenuPage
