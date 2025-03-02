"use client"

import { createContext, ReactNode, useContext, useState } from "react"

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    description?: string
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (item: CartItem) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: CartItem): void => {
        setCart((prevCart) => {
            // check if an item with the same id already exists
            const existingItemIndex = prevCart.findIndex(
                (cartItem) => cartItem.id === item.id && cartItem.description === item.description
            )

            if (existingItemIndex !== -1) {
                // if it exists, update the quantity (and optionally merge/update other properties)
                const updatedCart = [...prevCart]

                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    quantity:
                        updatedCart[existingItemIndex].quantity + item.quantity,

                    // update the description
                    description:
                        item.description ||
                        updatedCart[existingItemIndex].description,
                }

                return updatedCart
            } else {
                return [...prevCart, item]
            }
        })
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(): CartContextType {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }

    return context
}
