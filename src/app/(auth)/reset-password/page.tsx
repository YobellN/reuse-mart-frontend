'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewPasswordForm } from "@/components/auth/new-password-form"
import SearchBar from "./search-bar"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ResetPasswordPage() {
  const [validEmail, setValidEmail] = useState<string | null>(null)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SearchBar onValidation={setValidEmail} />
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
              />
            </div>
          </Link>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">Reset Password</CardTitle>
            <CardDescription>
              {validEmail ? 
                "Masukkan password baru Anda" : 
                "Memverifikasi token..."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {validEmail && <NewPasswordForm email={validEmail} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
