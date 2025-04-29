"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button";

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

      <nav>
        <ul className="flex flex-wrap gap-4">
          {tabs.map((tab) => (
            <li key={tab.href}>
              <Button
                variant={pathname === tab.href ? "default" : "ghost"}
                className={cn(
                  "text-sm",
                  pathname === tab.href
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "text-gray-500 hover:text-green-700"
                )}
                onClick={() => router.push(tab.href)}
              >
                {tab.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}
