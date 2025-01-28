// ui
import CategoryForm from "@/app/(setting)/addlist/_components/CategoryForm"
import AddCategoryTable from "@/app/(setting)/addlist/_components/CategoryTable"


export default function AddCategoryPage() {
    return (
        <div className="bg-white p-5 rounded-xl w-full">
            <h1 className="text-2xl font-semibold flex justify-center">
                Add Category
            </h1>
            <hr className="my-3" />

            <AddCategoryTable />

            <CategoryForm />
        </div>
    )
}

export default addlist