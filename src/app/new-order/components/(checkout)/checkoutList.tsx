import React from "react"

//ui
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const CheckoutList = () => {
    return (
        <div className="flex flex-col justify-between h-5/6 text-base">
            <div className="flex flex-col gap-3">
                {/* หัวตาราง */}
                <div className="flex justify-between px-5">
                    <span className="text-pebble">Dine-in</span>
                    <span className="text-red-600 cursor-pointer">
                        Cancel Order
                    </span>
                </div>

                <div>
                    <div className="flex bg-jade text-white py-2 rounded-t-lg">
                        <div className="w-full flex justify-center">Name</div>
                        <div className="w-full flex justify-center">QTY</div>
                        <div className="w-full flex justify-center">Price</div>
                    </div>

                    <ScrollArea className="h-96">
                        <div className="flex p-1">
                            <div className="flex flex-col items-start w-full">
                                <p>ผัดกระเพราหมู</p>
                                <p className="ml-1 text-sm text-pebble">
                                    เผ็ดปานกลาง ไซต์กลาง ไข่ดาว
                                </p>
                            </div>
                            <div className="w-full flex justify-center">
                                <div className="flex items-center justify-center w-full">
                                    <Button variant="none">-</Button>
                                    <span className="mx-2">1</span>
                                    <Button variant="none">+</Button>
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                ฿150
                            </div>
                        </div>
                        
                    </ScrollArea>
                </div>
            </div>

            {/* สรุปยอดรวม */}
            <div className="p-2">
                <hr className="my-2" />
                <div className="flex justify-between">
                    <span>Orders Count</span>
                    <span>3 pieces</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-jade">
                    <span>Total</span>
                    <span>฿20</span>
                </div>
                <Button
                    variant="default"
                    className="w-full rounded-xl py-7 mt-3"
                >
                    Pay ฿20
                </Button>
            </div>
        </div>
    )
}

export default CheckoutList
