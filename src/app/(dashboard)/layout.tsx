import AlertBox from "@/components/alert-box";
import { AppSidebar } from "@/components/app-sidebar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser, User } from "@/services/auth/get-user";
import { AlertCircle } from "lucide-react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
    title: "Dashboard",
};

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const token = (await cookies()).get("token")?.value || "";
    if (!token) {
        return (
            <div className="p-4 md:p-10 flex justify-center min-h-svh">
                <div className="w-full max-w-md">
                    <AlertBox variant="destructive" title="Error 401" description="Sesi anda telah habis, silahkan login kembali" />
                </div>
            </div>
        );
    } else {
        const user = await getUser();
        return (
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar user={user} variant="inset" />
                <SidebarInset>
                    <div className="p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        );
    }
}
