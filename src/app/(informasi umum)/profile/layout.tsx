'use server'
import HomeNavbar from "@/components/home/home-navbar-with-search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/services/auth/user-services";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LogOut, MapPin, UserCog, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Edit Profil", href: "/profile/edit", icon: <UserCog className="mr-2 h-4 w-4" /> },
    { label: "Alamat Pengiriman", href: "/profile/alamat", icon: <MapPin className="mr-2 h-4 w-4" /> },
    { label: "Riwayat Transaksi", href: "/profile/transaksi", icon: <Clock className="mr-2 h-4 w-4" /> },
    { label: "Poin & Reward", href: "/profile/reward", icon: <Star className="mr-2 h-4 w-4" /> },
];

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    if (!user?.data || user.data.role !== "Pembeli") {
        notFound();
    }

    const userData = user.data;

    return (
        <>
            <HomeNavbar user={user} />
            <main className="bg-muted min-h-screen p-4 md:p-10">
                <div className="container mx-auto flex flex-col md:flex-row gap-6">
                    <aside className="w-full md:w-1/4">
                        <Card className="p-6 sticky top-20">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={userData.nama} />
                                    <AvatarFallback>{userData.nama?.[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-lg">{userData.nama}</p>
                                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <nav className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link key={item.href} href={item.href}>
                                        <Button variant="ghost" className={cn("w-full justify-start")}>
                                            {item.icon}{item.label}
                                        </Button>
                                    </Link>
                                ))}
                            </nav>
                            <Separator className="my-4" />
                            <Button variant="destructive" className="w-full justify-start">
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </Card>
                    </aside>
                    <section className="w-full md:w-3/4">
                        <Card className="p-6">{children}</Card>
                    </section>
                </div>
            </main>
        </>
    );
}
