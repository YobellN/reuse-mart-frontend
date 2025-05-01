'use server';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/services/auth/user-services";
import { notFound } from "next/navigation";
import UserContextWrapper from "@/components/user-context-wrapper";

import SidebarNavProfile from "@/components/profile/side-nav-profile";
import { MobileProfileNav } from "@/components/profile/side-nav-profile";
import { IconStarFilled } from "@tabler/icons-react";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();
    if (!user?.data || user.data.role !== "Pembeli") notFound();

    return (
        <UserContextWrapper user={user.data}>
            <main className="min-h-screen px-4 pb-16 lg:px-10 lg:py-10 lg:pb-0">
                <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                    <aside className="hidden lg:block w-full lg:w-1/4">
                        <Card className="p-6 sticky top-[128px] z-10">
                            <div className="flex flex-col items-center text-center gap-2">
                                <Avatar className="w-20 h-20 border shadow">
                                    <AvatarImage src="/placeholder-avatar.jpg" alt={user.data.nama} />
                                    <AvatarFallback>{user.data.nama?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-1 mt-1 text-lg font-semibold ">
                                    <span>{user.data.nama}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-1">
                                    <IconStarFilled className="w-4 h-4 text-yellow-500 " />
                                    <span>Poin Loyalitas:</span>
                                    <span className="font-bold text-primary">{user.data.pembeli?.poin ?? 0}</span>
                                </div>
                            </div>
                            <Separator/>
                            <SidebarNavProfile />
                        </Card>
                    </aside>
                    <section className="w-full lg:w-3/4">
                        <Card className="p-4">{children}</Card>
                    </section>
                </div>
            </main>
            <MobileProfileNav />
        </UserContextWrapper>
    );
}
