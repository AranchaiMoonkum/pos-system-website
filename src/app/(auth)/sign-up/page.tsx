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

const signUpSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter your username",
    }),
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
            message: "Please enter a valid phone number",
        }),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

const SignUp = () => {
    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            phone: "",
        },
    })

    const onSubmit = async (data: SignUpFormValues) => {
        console.log("Sign-up Data:", data)
    }

    return (
        <div className="flex flex-col w-[30rem] justify-center">
            <div className="bg-white shadow-lg p-7 rounded-xl">
                <h1 className="font-semibold text-4xl text-jade mb-5">
                    Sign Up
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 w-full"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username :</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                <p>Already have account?</p>
                                <CircleChevronRight />
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default SignUp
