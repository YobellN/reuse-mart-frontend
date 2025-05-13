"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Image from "next/image"
import { handleRegister } from "@/services/auth/user-services"

const registerScheme = z.object({
  nama: z.string().trim().nonempty({ message: "Nama tidak boleh kosong" }).min(4, { message: "nama minimal 3 karakter" }),
  email: z.string().trim().nonempty({ message: "Email tidak boleh kosong" }).email({ message: "Format email tidak valid" }),
  no_telp: z.string().trim().nonempty({ message: "Nomor telepon tidak boleh kosong" }).min(10, { message: "Nomor telepon tidak valid" }).max(14, { message: "Nomor telepon tidak valid" }).startsWith("0", { message: "Format Nomor telepon tidak valid" }),
  password: z.string().trim().nonempty({ message: "Password tidak boleh kosong" }).min(8, { message: "Password minimal 8 karakter" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      "Password harus mengandung huruf besar, kecil, dan karakter khusus",
  }),
  konfirmasiPassword: z.string().trim().nonempty({ message: "Konfirmasi password tidak boleh kosong" })
}).refine((values) => {
  return values.password === values.konfirmasiPassword
}, {
  message: "Password harus sesuai",
  path: ["konfirmasiPassword"]
});

type FormScheme = z.infer<typeof registerScheme>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const registerForm = useForm<FormScheme>({
    resolver: zodResolver(registerScheme),
    defaultValues: {
      nama: "",
      email: "",
      no_telp: "",
      password: "",
      konfirmasiPassword: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const onSubmit = async (data: FormScheme) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("nama", data.nama);
    formData.append("password", data.password);
    formData.append("no_telp", data.no_telp);

    const result = await handleRegister(formData);

    if (result.message === "Berhasil daftar") {
      router.replace('/login');
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (message) {
          registerForm.setError(field as keyof FormScheme, {
            type: "server",
            message: message as string
          });
        }
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...registerForm}>
            <form className="p-6 md:p-8" onSubmit={registerForm.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Selamat datang</h1>
                  <p className="text-muted-foreground text-balance">
                    Silahkan daftar akun baru
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={registerForm.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukan nama lengkap Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukan email Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={registerForm.control}
                    name="no_telp"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan nomor telepon Anda" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input placeholder="*******" type={showPassword ? "text" : "password"} {...field}></Input>
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}>
                            {showPassword ? (
                              <EyeIcon className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  >
                  </FormField>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={registerForm.control}
                    name="konfirmasiPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input placeholder="*******" type={showConfirmPassword ? "text" : "password"} {...field}></Input>
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}>
                            {showConfirmPassword ? (
                              <EyeIcon className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  >
                  </FormField>
                </div>
                <Button type="submit" className="w-full" variant={"default"} disabled={registerForm.formState.isSubmitting || registerForm.formState.isSubmitSuccessful}>
                  {registerForm.formState.isSubmitting || registerForm.formState.isSubmitSuccessful ? "Memproses..." : "Daftar"}
                </Button>
                <div className="text-center text-sm">
                  Sudah memiliki akun?{" "}
                  <Link href="/login" className="underline underline-offset-4 text-primary">
                    Masuk
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <Image
              fill
              src="/reuse-mart.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
