import React from "react"
import MenuList from "./components/(section)/menulist"
import CheckoutType from "./components/(checkout)/checkoutType"
import CheckoutList from "./components/(checkout)/checkoutList"

export default function NewOrder() {
    return (
        <div className="w-full flex gap-5">
            <div className="w-8/12 bg-white p-5 rounded-xl">
                <MenuList />
            </div>
        <div className="w-4/12 bg-white rounded-xl h-5/6">
          <div className="p-5">
            <h1 className="text-4xl text-jade">Checkout</h1>
          <span>Order #31</span>
          </div>
          
          <CheckoutType />
          {/* <CheckoutList/> */}
        </div>
        </div>
    )
}
