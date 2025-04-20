import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import Form from "next/form";

const RequestScheme = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
});

export function submitEmailRequest(data: FormData) {
  const email = data.get("email");
  console.log(email);
}

export function RequestResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
          <Form action={submitEmailRequest}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
