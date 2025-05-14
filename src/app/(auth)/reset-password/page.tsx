'use client'

import { Suspense, useState } from "react"
import { NewPasswordForm } from "@/components/auth/new-password-form"
import SearchBar from "./search-bar"

export default function ResetPasswordPage() {
  const [validEmail, setValidEmail] = useState<string | null>(null)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
\        <Suspense fallback={<p>Memverifikasi token...</p>}>
          <SearchBar onValidation={setValidEmail} />
        </Suspense>

        {validEmail && <NewPasswordForm email={validEmail} />}
      </div>
    </div>
  )
}
