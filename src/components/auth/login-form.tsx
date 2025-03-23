"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import AxiosInstance from "@/lib/axios-instance"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await AxiosInstance.post('/login', {
        email,
        password
      });
      console.log(response.data);
    } catch (err: any) {
      if (err.response?.status === 422 || err.response?.status === 401) {
        const errors = err.response.data.errors;
        console.log('Validation error:', errors);
      } else {
        console.error('Unexpected error:', err);
      }
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Selamat datang</h1>
                <p className="text-muted-foreground text-balance">
                  Masuk ke akun Anda
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@gmail.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline text-primary"
                  >
                    Lupa Password
                  </a>
                </div>
                <Input id="password" type="password" required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full" variant={"default"}>
                Masuk
              </Button>
              <div className="text-center text-sm">
                Belum memiliki akun?{" "}
                <Link href="/register">
                  <span className="text-primary underline-offset-2 hover:underline">
                    Daftar
                  </span>
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
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
