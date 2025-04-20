"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { handleLogin } from "@/services/auth/handle-login"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import redirectMenu from "@/services/auth/redirect-menu"

const loginScheme = z.object({
  email: z.string().trim().nonempty({ message: "Email tidak boleh kosong" }).email({ message: "Format email tidak valid" }),
  password: z.string().trim().nonempty({ message: "Password tidak boleh kosong" }),
});

type FormScheme = z.infer<typeof loginScheme>;
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const loginForm = useForm<FormScheme>({
    resolver: zodResolver(loginScheme),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: FormScheme) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await handleLogin(formData);

    if (result.message === "Berhasil login") {
      const menu = await redirectMenu();
      if (menu === "error") {
        toast.error("Terjadi kesalahan, silahkan coba lagi");
        return;
      } else {
        toast.success("Berhasil login");
        router.replace(menu);
      }
    }

    if (result.message === "Terjadi kesalahan") {
      redirect("/login");
    }

    if (result.errors) {
      Object.entries(result.errors).forEach(([field, message]) => {
        if (message) {
          loginForm.setError(field as keyof FormScheme, {
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
          <Form {...loginForm}>
            <form
              className="p-6 md:p-8"
              onSubmit={loginForm.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Selamat datang</h1>
                  <p className="text-muted-foreground text-balance">
                    Masuk ke akun Anda
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="cth@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="*******"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <EyeOffIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <div className="flex items-center">
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-2 hover:underline text-primary"
                    >
                      Lupa Password
                    </Link>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  variant={"default"}
                  disabled={
                    loginForm.formState.isSubmitting ||
                    loginForm.formState.isSubmitSuccessful
                  }
                >
                  {loginForm.formState.isSubmitting ||
                  loginForm.formState.isSubmitSuccessful
                    ? "Memproses.."
                    : "Masuk"}
                </Button>
                <div className="text-center text-sm">
                  Belum memiliki akun?{" "}
                  <Link href="/register">
                    <span className="underline underline-offset-4 text-primary">
                      Daftar
                    </span>
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
  );
}

