"use client"

import { useCart } from "@/context/CartContext"
import { useSession } from "next-auth/react"
import Swal from "sweetalert2"

//icons
import { Trash } from "lucide-react"

//ui
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableFooter,
} from "@/components/ui/table"

export default function CheckOut() {
    const { data: session, status } = useSession()
    const { cart, clearCart, clearCartItem } = useCart()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <p>You need to be signed in to view your cart</p>
    }

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const handleCheckout = async () => {
        const userId = session.user.id

        console.log({ userId, cart })

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, cart }),
            })

            const data = await res.json()

            console.log("Order created successfully", data)

            Swal.fire({
                title: "Order created successfully",
                text: "Order has been placed successfully.",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
            })

            clearCart()
        } catch (error) {
            console.error(error)

            Swal.fire({
                title: "Cannot placed order!",
                text: "Something went wrong. Please try again",
                icon: "error",
                confirmButtonText: "OK",
            })
        }
    }

    return (
        <section className="w-4/12 relative">
            <div className="relative h-full">
                <div className="bg-white h-[650px] rounded-xl sticky top-0">
                    <h2 className="text-2xl font-bold p-4">Checkout</h2>
                    <ScrollArea className="max-h-[400px] overflow-y-auto z-10">
                        <Table>
                            <TableHeader className="bg-jade text-white ">
                                <TableRow className="hover:bg-jade">
                                    <TableHead className="flex text-white">
                                        Name
                                    </TableHead>
                                    <TableHead className="text-white">
                                        QTY
                                    </TableHead>
                                    <TableHead className="text-white">
                                        Total price
                                    </TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.length === 0 ? (
                                    <TableRow>
                                        <TableCell>
                                            Your cart is empty.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cart.map((item) => (
                                        <TableRow
                                            key={`${item.id}-${item.description}`}
                                            className="border-b py-2"
                                        >
                                            <TableCell className="flex">
                                                <div className="flex flex-col">
                                                    <p>{item.name}</p>
                                                    {item.description && (
                                                        <p className="text-pebble">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {item.quantity}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex justify-center">
                                                    <p>
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toFixed(2)}{" "}
                                                        ฿
                                                    </p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() =>
                                                        clearCartItem(
                                                            item.id,
                                                            item.description
                                                        )
                                                    }
                                                    variant="destructive"
                                                >
                                                    <Trash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                    {cart.length > 0 && (
                        <div className="p-2 absolute h-full w-full flex flex-col justify-between left-0 top-0">
                            <Button
                                onClick={clearCart}
                                className="w-10 self-end "
                                variant="destructive"
                            >
                                <Trash />
                            </Button>
                            <div>
                                <div className="my-4 py-2 border-y flex justify-between font-medium">
                                    <p>Total Price :</p>{" "}
                                    <p>{totalPrice.toFixed(2)} ฿</p>
                                </div>
                                <Button
                                    onClick={handleCheckout}
                                    className="h-16 w-full"
                                >
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
