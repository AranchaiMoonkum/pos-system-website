import authOptions from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sandwich } from "lucide-react"
import MenuListDialogForm from "./MenuListDialogForm"

const getMenus = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) { throw new Error("Session not found") }

    const userId = session.user.id

    return prisma.category.findMany({
        where: { createdBy: { id: userId } },
        include: { menus: true }
    })
}

export async function MenuListCategory() {
    const categories = await getMenus()

    return (
        <article className="px-5 py-3">
            {categories.map(category => (
                <section key={category.id} className="mb-5">
                    {/* category name */}
                    <h2 className="text-lg font-bold border-b pb-2">{category.name}</h2>

                    {/* horizontal scroll menu list */}
                    <ScrollArea className="w-full overflow-x-auto pb-4">
                        <div className="flex gap-4 my-3 py-2 whitespace-nowrap">
                            {category.menus.map(menu => (
                                <Dialog key={menu.id}>
                                    <DialogTrigger asChild>
                                        <Card className="shadow-md rounded-xl transition-shadow cursor-pointer min-w-[200px]">
                                            {/* square menu image */}
                                            <CardContent className="p-0">
                                                <div className="w-full h-40 overflow-hidden rounded-t-xl flex items-center justify-center bg-gray-100">
                                                    {menu.image ? (
                                                        <img
                                                            src={menu.image}
                                                            alt={menu.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <AvatarFallback className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-200">
                                                            <Sandwich size={40} />
                                                        </AvatarFallback>
                                                    )}
                                                </div>
                                            </CardContent>

                                            {/* menu details */}
                                            <CardHeader className="p-3">
                                                <CardTitle className="text-lg text-left">{menu.name}</CardTitle>
                                                <p className="text-jade text-right">{menu.price.toFixed(2)} ฿</p>
                                            </CardHeader>
                                        </Card>
                                    </DialogTrigger>

                                    {/* dialog popup */}
                                    <MenuListDialogForm menu={menu} />
                                </Dialog>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </section>
            ))}
        </article>
    )
}
