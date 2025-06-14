import { DataTable } from "./data-table"
import { SiteHeader } from "@/components/site-header";
import { columns } from "./columns";
import api from "@/services/api";
import { DetailKeranjang } from "@/services/detail_keranjang/schema-detail_keranjang";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { RadioKeranjangGroupForm } from "@/components/keranjang/form-keranjang";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


async function getData(): Promise<DetailKeranjang[]> {
    const res = await api.get('/detail-keranjang');

    if (!res.data) {
        throw new Error('Failed to fetch DetailKeranjang');
    }

    const DetailKeranjang: DetailKeranjang[] = res.data.data;
    return [
        ...DetailKeranjang
    ]
}

export default async function DetailKeranjangPage() {
    const data = await getData()

    return (
        <div className="min-h-[calc(100vh-18rem)] bg-muted/50">
            <div className="container py-8">
                <h2 className="text-3xl font-bold mb-8">Keranjang Belanja</h2>
                {!data || data.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <div className="flex flex-col items-center justify-center gap-4">
                            <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                            <h3 className="text-xl font-semibold">Keranjang Kosong</h3>
                            <p className="text-muted-foreground text-center">
                                Belum ada barang di keranjang Anda.
                                <br />
                                Yuk mulai belanja!
                            </p>
                            <Button asChild>
                                <Link href="/home">
                                    Kembali ke Home
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
                        {/* Cart Items Section */}
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Daftar Produk</h3>
                                <DataTable columns={columns} data={data} />
                            </div>
                        </div>

                        {/* Checkout Form Section */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm">
                                <RadioKeranjangGroupForm />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
