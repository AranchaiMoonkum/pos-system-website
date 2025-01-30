export const deleteMenu = async (id: string) => {
    const res = await fetch(`/api/menu/${id}`, { method: "DELETE" })

    if (!res.ok) {
        console.error("Failed to delete menu")
    } else {
        console.log("Menu deleted successfully")
        location.reload()
    }

    return res.json()
}
