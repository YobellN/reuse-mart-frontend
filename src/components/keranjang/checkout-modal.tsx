"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { KeranjangResponse } from "@/services/detail_keranjang/schema-detail_keranjang";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Alamat } from "@/services/alamat/schema-alamat";
import { createPenjualan } from "@/services/penjualan/penjualan-services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: {
        response: KeranjangResponse;
        metode_pengiriman: string;
        alamat?: Alamat;
    };
}

export function CheckoutModal({ open, onOpenChange, data }: CheckoutModalProps) {
    const router = useRouter();
    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    async function handleCheckout() {
        try {
            const response = await createPenjualan({
                metode_pengiriman: data.metode_pengiriman as "Ambil di gudang" | "Antar Kurir",
                poin_potongan: data.response.poin_dipakai,
                id_alamat: data.metode_pengiriman === "Antar Kurir" ? data.alamat?.id_alamat: undefined,
            });

            if (response.data) {
                toast.success("Pesanan berhasil dibuat!");
                onOpenChange(false);
                router.push(`/keranjang/pembayaran/${response.data.id_penjualan}`); // id penjualan
            } else {
                toast.error(response.message || "Gagal membuat pesanan");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat membuat pesanan");
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogTitle>Detail Checkout</DialogTitle>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Harga</span>
                            <span>{formatter.format(data.response.total_harga)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Poin Digunakan</span>
                            <span>{data.response.poin_dipakai} poin</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Potongan</span>
                            <span className="text-green-600">-{formatter.format(data.response.diskon)}</span>
                        </div>
                        {data.metode_pengiriman === "Antar Kurir" && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Ongkos Kirim</span>
                                <span>{formatter.format(data.response.ongkir)}</span>
                            </div>
                        )}
                        <Separator />
                        <div className="flex justify-between font-bold">
                            <span>Total Akhir</span>
                            <span>{formatter.format(data.response.total_akhir)}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Metode Pengambilan</h3>
                        <p>{data.metode_pengiriman}</p>

                        {data.metode_pengiriman === "Antar Kurir" && data.alamat && (
                            <>
                                <h3 className="font-semibold">Alamat Pengiriman</h3>
                                <p className="text-sm">{data.alamat.label}</p>
                                <p className="text-sm text-muted-foreground">
                                    {data.alamat.detail_alamat}, {data.alamat.kecamatan}, {data.alamat.kabupaten_kota} {data.alamat.kode_pos}
                                </p>
                            </>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleCheckout}>
                            Konfirmasi Pesanan
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
