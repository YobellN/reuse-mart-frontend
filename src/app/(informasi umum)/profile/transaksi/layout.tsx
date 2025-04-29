"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        { label: "Semua", href: "/profile/transaksi" },
        { label: "Menunggu Pembayaran", href: "/profile/transaksi/menunggu-pembayaran" },
        { label: "Menunggu Konfirmasi", href: "/profile/transaksi/menunggu-konfirmasi" },
        { label: "Diproses", href: "/profile/transaksi/disiapkan" },
        { label: "Dikirim", href: "/profile/transaksi/dikirim" },
        { label: "Selesai", href: "/profile/transaksi/selesai" },
        { label: "Hangus", href: "/profile/transaksi/hangus" },
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h1>
                <p className="text-sm text-muted-foreground">
                    Lihat semua transaksi yang telah Anda lakukan
                </p>
            </div>
            <nav className="relative">
                <ul className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x px-1 py-2 md:justify-start">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <li
                                key={tab.href}
                                className="snap-start shrink-0"
                            >
                                <Button
                                    variant={isActive ? "default" : "ghost"}
                                    size="sm"
                                    className={cn(
                                        "whitespace-nowrap text-sm",
                                    )}
                                    onClick={() => router.push(tab.href)}
                                >
                                    {tab.label}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="mt-6">{children}</div>
        </div>
    );
}
