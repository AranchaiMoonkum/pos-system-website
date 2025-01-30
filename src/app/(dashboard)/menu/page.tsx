import MenuTable from "@/app/(dashboard)/menu/_components/MenuTable"

const MenuPage = () => {
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h1 className="text-2xl font-semibold flex justify-center">Menu</h1>
            <hr className="my-3" />

            <MenuTable />
        </div>
    )
}

export default MenuPage
