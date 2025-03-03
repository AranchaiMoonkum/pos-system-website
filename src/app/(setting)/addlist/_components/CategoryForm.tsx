"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Swal from "sweetalert2"

// ui
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const CategoryFormSchema = z.object({
    name: z.string().min(1, { message: "Please name the category" }),
})

const CategoryForm = () => {
    const [error, setError] = useState<string | null>(null)

    const form = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: { name: "" }
    })

    const onSubmit = async (value: z.infer<typeof CategoryFormSchema>) => {
        try {
            setError(null)

            const res = await fetch("/api/category", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value)
            })

            const resData = await res.json()

            if (!res.ok) {
                setError(resData.message || "Failed to create category")
                return
            } Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Category placed successfully",
                showConfirmButton: false,
                timer: 1000, // 1 second
                timerProgressBar: true,
            })

            form.reset()

            setTimeout(() => {
                location.reload()
            }, 1000)
            
        } catch (error) {
            console.log("Failed to create category. " + error)
            setError("Failed to create category. " + error)
        }
    }

    return (
        <div>
            {/* Display error message */}
            {error && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
                    {error}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category name :</FormLabel>
                                <FormControl>
                                    <Input placeholder="Add your category name here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col">
                        <Button type="submit" variant="default">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CategoryForm
