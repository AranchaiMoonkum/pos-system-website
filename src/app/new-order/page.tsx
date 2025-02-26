import { MenuList } from "@/app/new-order/components/(menu)/MenuList"
import { CheckOut } from "@/app/new-order/components/(checkout)/CheckOut"

const NewOrder = () => {
    return (
        <article className="w-full flex gap-5 mb-5">
            <MenuList />
        
            <CheckOut />
        </article>
    )
}

export default NewOrder