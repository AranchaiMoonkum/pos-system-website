"use client"

import { useEffect, useState } from "react"

// ui
import { Table, TableHeader, TableHead, TableBody, TableCell, TableRow } from "@/components/ui/table"
import CategoryDelete from "@/app/(setting)/addlist/_components/CategoryDelete"


interface Category {
    id: string
    name: string
    createdBy?: { email: string } | null
    createdAt: string
}

const CategoryTable = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/category")
                const data = await res.json()
                setCategories(data)
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch categories. " + error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    if (loading) {
        return <p className="py-4">Loading categories...</p>
    }

    if (categories.length === 0) {
        return <p className="py-4">No categories found</p>
    }

    return (
        <section className="py-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.createdBy?.email || "N/A"}</TableCell>
                            <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <CategoryDelete id={category.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody >
            </Table >
        </section>
    )
}

export default CategoryTable
