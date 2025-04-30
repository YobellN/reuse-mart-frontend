"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const requestScheme = z.object({
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email tidak boleh kosong" })
    .email({ message: "Format email tidak valid" }),
});

export function submitEmailRequest(data: FormData) {
  const email = data.get("email");
  console.log(email);
}

type FormScheme = z.infer<typeof requestScheme>;

export function RequestResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const requestForm = useForm<FormScheme>({
    resolver: zodResolver(requestScheme),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormScheme) {
    console.log(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <Link
          href={"/login"}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-md ">
            <Image
              src={"/ReuseMart_logo_only.png"}
              alt="Reuse Mart Logo"
              width={250}
              height={250}
            ></Image>
          </div>
        </Link>
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-semibold">
            Lupa Password
          </CardTitle>
          <CardDescription>
            Masukkan email terdaftar Anda untuk mendapatkan link reset password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...requestForm}>
            <form
              onSubmit={requestForm.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={requestForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Kirim Permintaan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
