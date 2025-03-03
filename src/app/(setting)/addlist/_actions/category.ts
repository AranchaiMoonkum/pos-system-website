import Swal from "sweetalert2"

export async function deleteCategory(id: string) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
    })
    

    if (result.isConfirmed) {
        try {
            const res = await fetch(`/api/category/${id}`, { method: "DELETE" })

            if (!res.ok) {
                console.error("Failed to delete category")
            }

            await Swal.fire(
                "Deleted!",
                "Your category has been deleted.",
                "success",
            )

            location.reload()
        } catch (error) {
            console.error(error)
            Swal.fire("Error!", "Failed to delete category.", "error")
        }
    }
}