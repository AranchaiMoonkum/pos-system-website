"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

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

const signInSchema = z.object({
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string()
})

type SignInFormValues = z.infer<typeof signInSchema>

const SignInForm = () => {
    const [error, setError] = useState<string | null>(null)

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: SignInFormValues) => {
        let redirectPath: string | null = null

        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if (res?.error) {
                setError(res.error)
            } else {
                redirectPath = "/overview"
            }
        } catch (error) {
            setError("An error occurred")
            redirectPath = "/sign-in"
        } finally {
            if (redirectPath) { redirect(redirectPath) }
        }
    }

    return (
        <div className="flex flex-col w-[30rem] justify-center">
            <div className="bg-white shadow-lg p-7 rounded-xl">
                <h1 className="font-semibold text-4xl text-jade mb-5">
                    Sign In
                </h1>

                {/* Display error message */}
                {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
                        {error}
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
                        <div className="flex flex-col gap-6 py-5">
                            <Button
                                type="submit"
                                className="w-full bg-jade py-5"
                            >
                                Sign In
                            </Button>
                            <Link
                                href="/sign-up"
                                className="text-pebble flex gap-2 text-sm self-end cursor-pointer hover:text-night"
                            >
                                <p>Do not have account?</p>
                                <CircleChevronRight />
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SignInForm
