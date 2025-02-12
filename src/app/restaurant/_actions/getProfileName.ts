"use server"

import authOptions from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function GetProfileName() {
    // get session from the server
    const session = await getServerSession(authOptions)

    if (!session) return null

    // get user name from the database filtered by id from session
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true },
    })

    // check if user exists
    if (!user) { return "Profile" }

    return user.name
}
