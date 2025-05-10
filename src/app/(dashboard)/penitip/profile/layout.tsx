'use server';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/services/auth/user-services";
import { notFound } from "next/navigation";
import UserContextWrapper from "@/components/user-context-wrapper";
import { IconStarFilled } from "@tabler/icons-react";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();
    if (!user?.data || user.data.role !== "Penitip") notFound();

    return (
        <UserContextWrapper user={user.data}>
            <main className="min-h-screen px-4 pb-16 lg:px-10 lg:py-10 lg:pb-0">
                <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                    <aside className="w-full lg:w-1/4">
                        <Card className="p-6 sticky top-[128px] z-10">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Avatar className="w-20 h-20 border shadow">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={user.data.nama} />
                                    <AvatarFallback>{user.data.nama?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-1 mt-1 text-lg font-semibold">
                                    <span>{user.data.nama}</span>
                                </div>
                                <div className="flex flex-col items-center text-sm text-muted-foreground gap-1">
                                    {/* <div className="flex items-center gap-1">
                                        <IconStarFilled className="w-4 h-4 text-yellow-500" />
                                        <span>Rating:</span>
                                        <span className="font-bold text-primary">{0} / 5.0</span> 
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>Total Produk:</span>
                                        <span className="font-bold text-primary">{user.data.penitip?.total_produk ?? 0}</span>
                                    </div> 
                                    // TODO MASA DEPAN: BIKIN KOMPONEN UNTUK MENAMPILKAN RATING, TOTAL PRODUK
                                    // */}
                                    <div className="flex items-center gap-1">
                                        <IconStarFilled className="w-4 h-4 text-yellow-500 " />
                                        <span>Poin:</span>
                                        <span className="font-bold text-primary">{user.data.penitip?.poin ?? 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>Saldo:</span>
                                        <span className="font-bold text-primary">{user.data.penitip?.saldo ?? 0}</span>
                                    </div>
                                </div>


                            </div>
                            <Separator className="my-4" />
                            {/* Ini aku emg GPT dan pakai a + react biasa, Aku bingung nav next js nya, jd sementara gini dulu */}
                            <nav className="flex flex-col space-y-1">
                                <a href="/penitip/profile" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                    Informasi Umum
                                </a>
                                <a href="/penitip/profile/poin" className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground">
                                    Poin & Reward
                                </a>
                            </nav>
                        </Card>
                    </aside>
                    <section className="w-full lg:w-3/4">
                        <Card className="p-4">{children}</Card>
                    </section>
                </div>
            </main>
        </UserContextWrapper>
    );
}