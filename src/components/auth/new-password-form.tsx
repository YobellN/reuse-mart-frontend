"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPassword } from "@/services/auth/user-services"
import { useRouter } from "next/router"

const formSchema = z.object({
    password: z.string().trim().nonempty({ message: "Password tidak boleh kosong" }).min(8, { message: "Password minimal 8 karakter" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message:
          "Password harus mengandung huruf besar, kecil, dan karakter khusus",
      }),
    confirm_password: z.string().trim().nonempty({ message: "Konfirmasi password tidak boleh kosong" })
}).refine((values) => {
    return values.password === values.confirm_password
  }, {
    message: "Password harus sesuai",
    path: ["confirm_password"]
  });
type FormScheme = z.infer<typeof formSchema>;

export function NewPasswordForm(email: any) {

    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: FormScheme) {
        try {
            const response = await resetPassword(
                email,
                values.password,
                values.confirm_password
            )

            if (response.errors) {
                // Handle validation errors
                Object.keys(response.errors).forEach((key) => {
                    form.setError(key as any, {
                        message: response.errors![key]
                    })
                })
            } else {
                alert(response.message)
                router.push("/auth/login")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password Baru Anda" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Masukkan password baru
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-3">
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Konfirmasi Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan password sekali lagi" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Masukkan password sekali lagi
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
