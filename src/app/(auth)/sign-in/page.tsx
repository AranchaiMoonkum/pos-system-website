"use client"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
        message: "Invalid email address",
    }),
    password: z.string(),
})

type SignInFormValues = z.infer<typeof signInSchema>

const SignIn = () => {
    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: SignInFormValues) => {
        console.log("Sign-in Data:", data)
    }

    return (
        <div className="flex flex-col w-[30rem] justify-center">
            <div className="bg-white shadow-lg p-7 rounded-xl">
                <h1 className="font-semibold text-4xl text-jade mb-5">
                    Sign In
                </h1>
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

export default SignIn
