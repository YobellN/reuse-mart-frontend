'use client';
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, UserCog, Clock, Star, LogOut } from "lucide-react";
import logout from "@/services/auth/user-services";
import { Separator } from "../ui/separator";
import { AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle } from "../ui/alert-dialog";
import { toast } from "sonner";
import React from "react";

export const navItems = [
    { label: "Edit Profil", href: "/profile", icon: <UserCog className="h-4 w-4" /> },
    { label: "Alamat Pengiriman", href: "/profile/alamat", icon: <MapPin className="h-4 w-4" /> },
    { label: "Riwayat Transaksi", href: "/profile/transaksi", icon: <Clock className="h-4 w-4" /> },
];

export default function SidebarNavProfile() {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <nav className="flex flex-col gap-2">
                {navItems.map(item => {
                    const isActive =
                        pathname === item.href ||
                        (pathname.startsWith(item.href + "/") && item.href !== "/profile");
                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={isActive ? "default" : "ghost"}
                                className="w-full justify-start flex items-center gap-2 "
                            >
                                {item.icon}
                                <span className="lg:text-sm text-xs">{item.label}</span>
                            </Button>
                        </Link>
                    );
                })}
            </nav>
            <Separator  />
            <AlertDialog open={open} onOpenChange={setOpen}>
                    <Button variant="destructive" className="w-full justify-start flex items-center gap-2" onClick={() => setOpen(true)}>
                        <LogOut className="h-4 w-4" /> Logout
                    </Button>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin keluar dari akun?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                logout().then(() => {
                                    toast.success("Berhasil logout");
                                    router.push("/login");
                                    setOpen(false);
                                });
                            }}
                        >
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export function MobileProfileNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    return (
        <nav className="fixed bottom-0 inset-x-0 bg-white shadow-inner flex justify-around p-2 items-center lg:hidden">
            {navItems.map(item => {
                const isActive = pathname === item.href;
                return (
                    <div key={item.href} className="flex-1 text-center">
                        <Link href={item.href}>
                            <Button variant={isActive ? "default" : "ghost"} className="p-2">
                                {item.icon}
                            </Button>
                        </Link>
                        <p className="text-xs">{item.label}</p>
                    </div>
                );
            })}
            <div className="flex-1 text-center">
                <AlertDialog open={open} onOpenChange={setOpen}>
                        <Button variant="destructive" onClick={() => setOpen(true)}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah Anda yakin ingin keluar dari akun?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    logout().then(() => {
                                        toast.success("Berhasil logout");
                                        router.push("/login");
                                        setOpen(false);
                                    });
                                }}
                            >
                                Logout
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <p className="text-xs">Logout</p>
            </div>
        </nav>
    );
}
