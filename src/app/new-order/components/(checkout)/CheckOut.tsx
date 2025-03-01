"use client"

import { useCart } from "@/context/CartContext"
import { useSession } from "next-auth/react"

export default function CheckOut() {
    const { data: session, status } = useSession()
    const { cart, clearCart } = useCart()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (!session) {
        return <p>You need to be signed in to view your cart</p>
    }

    const handleCheckout = async () => {
        const userId = session.user.id

        console.log({ userId, cart })

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, cart })
            })

            const data = await res.json()

            console.log("Order created successfully", data)
            clearCart()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="w-4/12 bg-white rounded-xl h-5/6">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="border-b py-2">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            {item.description && <p>Description: {item.description}</p>}
                            <p>Unit Price: ${item.price.toFixed(2)}</p>
                            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))
                )}
                {cart.length > 0 && (
                    <button
                        onClick={handleCheckout}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Checkout
                    </button>
                )}
            </div>
        </section>
    )
}
