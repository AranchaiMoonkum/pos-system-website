"use client"
import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sandwich } from "lucide-react"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { useForm } from "react-hook-form"

interface MenuItem {
    id: string
    name: string
    price: number
    image?: string
    category: string
}

interface FormData {
    notes: string
}

interface MenuDialogProps {
    item: MenuItem
}

const MenuDialogForm: React.FC<MenuDialogProps> = ({ item }) => {
    const form = useForm<FormData>({
        defaultValues: { notes: "" },
    })

    function onSubmit(data: FormData) {
        console.log("Added Item:", { ...item, ...data })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer h-64 rounded-xl shadow-md flex flex-col items-start">
                    <Avatar className="rounded-xl w-full h-36">
                        {item.image ? (
                            <AvatarImage
                                src={item.image}
                                alt={`Image of ${item.name}`}
                                className="rounded-md object-cover"
                            />
                        ) : (
                            <AvatarFallback className="rounded-xl flex items-center justify-center">
                                <Sandwich className="w-10 h-10 text-pebble" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="h-full flex flex-col justify-between p-2">
                        <p className="font-medium">{item.name}</p>

                        <p className="text-jade font-semibold">
                            {item.price} ฿
                        </p>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="p-5">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-center">
                        {item.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex justify-between items-center gap-4">
                    <div className="w-full flex flex-col items-center">
                        <div className="w-48 h-48 border rounded-lg overflow-hidden">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <Sandwich className="w-16 h-16 text-gray-500" />
                                </div>
                            )}
                        </div>

                        <p className="text-pebble">{item.category}</p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex flex-col h-full justify-between"
                        >
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="รายละเอียดเพิ่มเติม เช่น ระดับความเผ็ด ความหวาน ปริมาณ..."
                                                className="h-40"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                variant="default"
                                className="w-full"
                            >
                                ADD +
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MenuDialogForm
