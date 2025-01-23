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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

//icons
import { Sandwich } from "lucide-react"

export default function bsm() {
  return (
      <div className="bg-white p-5 rounded-xl">
          <h1 className="text-2xl font-semibold flex justify-center">
              เมนูขายดี
          </h1>
          <hr className="my-3" />
          <h2 className="">รายการทั้งหมด 23 รายการ</h2>
          <hr className="my-3" />
          <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead>เมนู</TableHead>
                      <TableHead>หมวดหมู่</TableHead>
                      <TableHead>จำนวนรายการ</TableHead>
                      <TableHead>ต้นทุน</TableHead>
                      <TableHead>ราคา</TableHead>
                      <TableHead>กำไร</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                      <TableCell className="font-medium flex gap-2 items-center">
                          <Avatar className="rounded-md">
                              <AvatarImage
                                  className="rounded-md"
                                  src="padkrapow.jpg"
                              />
                              <AvatarFallback className="rounded-md">
                                  <Sandwich />
                              </AvatarFallback>
                          </Avatar>
                          ผักกระเพราหมูสับ
                      </TableCell>
                      <TableCell>อาหารจานหลัก</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>฿45.00</TableCell>
                      <TableCell>฿10.00</TableCell>
                      <TableCell>20%</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </div>
  )
}
