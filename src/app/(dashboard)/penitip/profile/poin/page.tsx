"use client";

import { useUser } from "@/hooks/user-context";
import { Gift, Star } from "lucide-react";

export default function Page() {
    const user = useUser();
    return (
        <div className="p-6 space-y-6">
            <h2 className="text-xl font-bold">Poin & Reward</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
                <div className="p-6 bg-white rounded-lg border shadow-sm">
                    <div className="flex items-center gap-2">
                        <Gift className="w-8 h-8 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Total Poin</p>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-6 bg-white rounded-lg border shadow-sm">
                    <div className="flex items-center gap-2">
                        <Star className="w-8 h-8 text-yellow-500" fill="currentColor" />
                        <div>
                            <p className="text-sm text-muted-foreground">Rating</p>
                            <p className="text-2xl font-bold">0 / 5.0</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Informasi Poin</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Dapatkan poin untuk setiap produk yang berhasil terjual</li>
                    <li>Rating tinggi akan meningkatkan visibilitas produk Anda</li>
                    <li>Pertahankan rating tertinggi setiap bulan untuk menjadi "Top Seller"</li>
                </ul>
            </div>
        </div>
    );
}