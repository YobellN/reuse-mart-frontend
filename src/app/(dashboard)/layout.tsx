import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Metadata } from "next"


export const metadata: Metadata = {
    title: "Dashboard"
}

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children, }: DashboardLayoutProps) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>                
                <div className="p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}