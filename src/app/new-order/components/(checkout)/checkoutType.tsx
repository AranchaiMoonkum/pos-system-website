import React from "react"
import { Button } from "@/components/ui/button"

//icons
import { Utensils, ShoppingBag } from "lucide-react"

const CheckoutType = () => {
    return (
        <div className="h-full flex flex-col justify-center gap-5">
            <Button variant="default" className="flex-col py-10 w-full">
                <Utensils />
                <span>Dine-in</span>
            </Button>
            <Button variant="amber" className="flex-col py-10 w-full">
                <ShoppingBag />
                <span>Take-away</span>
            </Button>
        </div>
    )
}

export default CheckoutType
