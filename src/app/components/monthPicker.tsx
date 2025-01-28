import React from 'react'

//ui
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"

const monthPicker = () => {
  return (
      <div className="bg-white ">
          <Select>
              <SelectTrigger>
                  <span>เอาเดือนปัจจุบันไม่ได้มปร</span>
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="December 2024">December 2024</SelectItem>
                  <SelectItem value="January 2025">January 2025</SelectItem>
                  
              </SelectContent>
          </Select>
      </div>
  )
}
export default monthPicker
