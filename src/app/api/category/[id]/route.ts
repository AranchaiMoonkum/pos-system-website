import { prisma } from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const category = await prisma.category.delete({ where: { id } });
        return Response.json(category, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
