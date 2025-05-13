import { RequestResetPasswordForm } from "@/components/auth/request-reset-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lupa Password",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <RequestResetPasswordForm />
        <Link href="/login">
          <button className="mt-4 w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">
            Kembali ke Login
          </button>
        </Link>
      </div>
    </div>
  );
}
