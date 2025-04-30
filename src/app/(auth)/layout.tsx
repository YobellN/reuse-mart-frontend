import AlertBox from "@/components/alert-box";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUser } from "@/services/auth/user-services";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";


type A = {
    children: React.ReactNode;
};

export default async function AuthLayout({ children, }: { children: React.ReactNode }) {

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {children}
            </div>
        </div>
    );
}
