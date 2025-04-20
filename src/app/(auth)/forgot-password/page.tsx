import { RequestResetPasswordForm } from "@/components/auth/request-reset-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Password",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RequestResetPasswordForm />
      </div>
    </div>
  );
}
