"use server"

export const createMenu = async (formData: FormData) => {
    try {
        const res = await fetch("/api/menu", {
            method: "POST",
            body: formData,
        })

        if (!res.ok) {
            throw new Error("Failed to create menu")
        } else {
            console.log("Menu created successfully")
        }
    } catch (error) {
        console.error("Failed to create menu. " + error)
    }
}
