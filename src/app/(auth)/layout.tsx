import { getUser, redirectMenu } from "@/services/auth/user-services";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({ children, }: { children: React.ReactNode }) {
    const user = await getUser();
    if (user.data) {
        redirect(await redirectMenu(user.data.role));
    }
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {children}
            </div>
        </div>
    );
}
