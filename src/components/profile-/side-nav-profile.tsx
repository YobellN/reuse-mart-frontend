'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MapPin, UserCog, Clock, Star } from "lucide-react";

const navItems = [
    { label: "Edit Profil", href: "/profile", icon: <UserCog className="mr-2 h-4 w-4" /> },
    { label: "Alamat Pengiriman", href: "/profile/alamat", icon: <MapPin className="mr-2 h-4 w-4" /> },
    { label: "Riwayat Transaksi", href: "/profile/transaksi", icon: <Clock className="mr-2 h-4 w-4" /> },
    { label: "Poin & Reward", href: "/profile/poin", icon: <Star className="mr-2 h-4 w-4" /> },
];

export default function SidebarNavProfile() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
                const isActive =
                pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/profile");              
                return (
                    <Link key={item.href} href={item.href}>
                        <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
                            {item.icon}
                            {item.label}
                        </Button>
                    </Link>
                );
            })}
        </nav>
    );
}
