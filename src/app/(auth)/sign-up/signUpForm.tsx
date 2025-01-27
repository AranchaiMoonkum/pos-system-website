"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Link from "next/link"

//components
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

//icons
import { CircleChevronRight } from "lucide-react"

const signUpSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters",
    }),
    phone: z
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
})

type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUpForm = () => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            phone: "",
            password: "",
        },
    })

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            setError(null)
            setSuccess(null)

            const res = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const responseData = await res.json()

            if (!res.ok) {
                setError(responseData.message)
                return
            }

            setSuccess("User created successfully")
            form.reset()
        } catch (error: any) {
            console.log("Client error:", error)
            setError("Failed to connect to the server. Please try again." + error)
        }
    }

    return (
        <div className="flex flex-col w-[30rem] justify-center">
            <div className="bg-white shadow-lg p-7 rounded-xl">
                <h1 className="font-semibold text-4xl text-jade mb-5">
                    Sign Up
                </h1>

                {/* Display error message */}
                {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
                        {error}
                    </div>
                )}

                {/* Display success message */}
                {success && (
                    <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded-md">
                        {success}
                    </div>
                )}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 w-full"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email :</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password :</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number :</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your phone number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-5 py-5">
                            <Button
                                type="submit"
                                className="w-full bg-jade py-5"
                            >
                                Sign Up
                            </Button>
                            <Link
                                href="/sign-in"
                                className="text-pebble flex gap-2 text-sm self-end cursor-pointer hover:text-night"
                            >
                                <p>Already have an account?</p>
                                <CircleChevronRight />
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SignUpForm
