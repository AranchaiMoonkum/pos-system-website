import React from "react"
import MenuDialogForm from "./menulistDialogForm"

interface MenuItem {
    id: string
    name: string
    price: number
    image: string
    category: string
}

interface MenulistDialogProps {
    item: MenuItem
}

const MenulistDialog: React.FC<MenulistDialogProps> = ({ item }) => {
    return <MenuDialogForm item={item} />
}

export default MenulistDialog
