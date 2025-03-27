import { AppSidebar } from "@/components/app-sidebar"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getUser } from "@/services/auth/get-user"
import { AlertCircle } from "lucide-react"
import { Metadata } from "next"
import { cookies } from "next/headers"
import React from "react"


export const metadata: Metadata = {
    title: "Dashboard"
}

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default async function DashboardLayout({ children, }: DashboardLayoutProps) {
    const token = (await cookies()).get("token")?.value || "";
    if (!token) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Your session has expired. Please log in again.
                </AlertDescription>
            </Alert>
        )
    } else {
        const user = await getUser(token);
        console.log(user);
        return (
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar user={user}  variant="inset" />
                <SidebarInset>
                    <div className="p-4">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

}