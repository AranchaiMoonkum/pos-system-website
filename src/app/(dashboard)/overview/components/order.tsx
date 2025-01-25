import React from "react"

//ui
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

//icons
import { ReceiptText } from "lucide-react"

export default function order() {
    return (
        <div className="bg-white p-5 rounded-xl">
            <h1 className="text-2xl font-semibold flex justify-center">
                ออเดอร์
            </h1>
            <hr className="my-3" />
            <h2 className="">รายการทั้งหมด 23 รายการ</h2>
            <hr className="my-3" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ออเดอร์</TableHead>
                        <TableHead>จำนวนรายการ</TableHead>
                        <TableHead>รูปแบบการสั่ง</TableHead>
                        <TableHead>ราคา</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium flex gap-2">
                            <ReceiptText />
                            Order #31
                        </TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>ทานที่ร้าน</TableCell>
                        <TableCell>฿150.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium flex gap-2">
                            <ReceiptText />
                            Order #31
                        </TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>ทานที่ร้าน</TableCell>
                        <TableCell>฿150.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
