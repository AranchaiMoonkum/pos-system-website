export async function deleteCategory(id: string) {
    const res = await fetch(`/api/category/${id}`, { method: "DELETE" })

    if (!res.ok) {
        console.error("Failed to delete category")
    } else {
        console.log("Category deleted successfully")
    }

    return res.json()
}
