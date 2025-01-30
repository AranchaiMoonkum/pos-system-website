"use server"

import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import fs from "fs/promises"
import { redirect } from "next/navigation"
import authOptions from "@/lib/auth"

const fileSchema = z.instanceof(File, { message: "You must provide a file" })
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const updateProfileSchema = z.object({
    name: z.string().min(1, "You must provide a store name"),
    tel: z
        .string()
        .regex(/^\d+$/, {
            message: "Please enter a valid phone number",
        })
        .min(10, {
            message: "Phone number must be 10 digits",
        })
        .max(10, {
            message: "Phone number must be 10 digits",
        }),
    image: imageSchema.refine(file => file.size > 0, "You must provide an image"),
})

export const updateProfile = async (formData: FormData) => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) { throw new Error("Session not found") }

    const userId = session.user.id

    const result = updateProfileSchema.safeParse(Object.fromEntries(formData.entries()))

    if (result.success === false) {
        throw new Error(result.error.errors[0].message)
    }

    const data = result.data

    await fs.mkdir("public/user-profiles", { recursive: true })
    const imagePath = `/user-profiles/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    await prisma.user.update({
        where: { id: userId },
        data: {
            name: data.name,
            phone: data.tel,
            image: imagePath
        }
    })

    redirect("/user")
}
