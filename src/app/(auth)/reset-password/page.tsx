'use client'

import { NewPasswordForm } from "@/components/auth/new-password-form"
import { useState } from "react"
import SearchBar from "./search-bar"

export default function ResetPasswordPage() {
  const [validEmail, setValidEmail] = useState<string | null>(null)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SearchBar onValidation={setValidEmail} />
        {validEmail ? (
          <NewPasswordForm email={validEmail} />
        ) : (
          <p>Memverifikasi token...</p>
        )}
      </div>
    </div>
  )
}