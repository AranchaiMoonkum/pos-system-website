"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

// ui
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// import cart context hook
import { useCart } from "@/context/CartContext"

const dialogSchema = z.object({
    quantity: z.number().min(1, "At least 1 item is required"),
    description: z.string().optional(),
})

export type DialogFormValues = z.infer<typeof dialogSchema>;

interface MenuItem {
    id: string
    name: string
    price: number
}

interface Props {
    menu: MenuItem
}

export default function MenuListDialogForm({ menu }: Props) {
    const form = useForm<DialogFormValues>({
        resolver: zodResolver(dialogSchema),
        defaultValues: {
            quantity: 1,
            description: ""
        },
    })

    const { addToCart } = useCart()

    const onSubmit: SubmitHandler<DialogFormValues> = (values) => {
        addToCart({
            id: menu.id,
            name: menu.name,
            price: menu.price,
            quantity: values.quantity,
            description: values.description || "",
        })

        console.log("Item added to cart:", values)
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{menu.name}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* quantity */}
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* special instructions */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="E.g., No seeds in dragon fruit" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Add to cart</Button>
                </form>
            </Form>
        </DialogContent>
    )
}