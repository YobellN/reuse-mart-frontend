import { Penjualan } from "@/services/penjualan/schema-penjualan";
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogFooter } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { id } from "date-fns/locale/id";
import { MessageCircle, HelpCircle, X, Gift, CreditCard, Truck, MapPin } from "lucide-react";
import ProductImage from "../product/product-image";
import { Card } from "../ui/card";
import { format } from "date-fns";

export default function TransactionDetail({ trx }: { trx: Penjualan }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-sm text-primary hover:underline">
                    Lihat Detail →
                </Button>
            </DialogTrigger>

            <DialogContent
                className={
                    `w-full max-w-sm sm:max-w-xl
           max-h-[calc(100vh-4rem)] overflow-y-auto
           p-3 sm:p-5
          `
                }
            >
                <DialogHeader className="flex items-center justify-between pb-1">
                    <DialogTitle className="text-lg font-semibold">Detail Transaksi</DialogTitle>
                </DialogHeader>

                <Separator className="my-1" />

                {trx.status_penjualan === "Hangus" && (
                    <Card className="relative bg-red-50 border-red-200 text-red-800 px-3 py-2 mb-3">
                        <Gift className="w-5 h-5 inline mr-2 align-middle" />
                        <span className="font-medium">Transaksi Hangus</span>
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-200 to-transparent rounded-b" />
                    </Card>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                        <p className="text-muted-foreground">No. Pesanan</p>
                        <p className="font-medium">{trx.id_penjualan}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Tanggal</p>
                        <p className="font-medium">
                            {format(new Date(trx.tanggal_penjualan), 'dd MMM yyyy, HH:mm', { locale: id })}
                        </p>
                    </div>
                </div>

                <Separator className="my-1" />

                <h3 className="font-medium mb-1 text-sm">Detail Produk</h3>
                <div className="space-y-2 mb-3">
                    {trx.produk.map((p, idx) => (
                        <Card key={idx} className="relative flex flex-col sm:flex-row items-start gap-2 p-2">
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden">
                                <ProductImage filename={p.foto_produk} style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-sm">{p.nama_produk}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs">
                                    <CreditCard className="w-4 h-4 text-primary" />
                                    <span className="font-medium">
                                        Rp{p.harga.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <Separator className="my-1" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                        <Gift className="w-5 h-5 text-yellow-500" />
                        <span>Poin diperoleh: <strong>{trx.poin_potongan}</strong></span>
                    </div>
                    {trx.poin_potongan > 0 && (
                        <div className="flex items-center gap-1">
                            <Gift className="w-5 h-5 text-green-500" />
                            <span>
                                Poin digunakan: <strong>{trx.poin_potongan}</strong> (Diskon Rp{trx.poin_potongan * 10000})
                            </span>
                        </div>
                    )}
                </div>

                <Separator className="my-1" />

                <h3 className="font-medium mb-1 text-sm">Pengiriman</h3>
                {trx.metode_pengiriman === 'Antar kurir' ? (
                    <Card className="relative p-2 mb-3 text-sm">
                        <div className="flex items-center gap-1 mb-1"><Truck className="w-5 h-5 text-blue-600" /></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Alamat lengkap…</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <CreditCard className="w-4 h-4 text-primary" />
                                <span>Ongkos kirim: Rp{trx.total_ongkir}</span>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-100 to-transparent rounded-b" />
                    </Card>
                ) : (
                    <Card className="relative p-2 mb-3 flex items-center gap-2 text-sm">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <span>
                            Ambil di gudang tanggal <strong>{/* tanggal ambil */}</strong>
                        </span>
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-100 to-transparent rounded-b" />
                    </Card>
                )}

                <Separator className="my-1" />

                <h3 className="font-medium mb-1 text-sm">Rincian Pembayaran</h3>
                <div className="space-y-1 text-sm mb-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Metode Pembayaran</span>
                        <span>{trx.pembayaran?.metode_pembayaran}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>Rp{/* subtotal */}</span>
                    </div>
                    {trx.poin_potongan > 0 && (
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Diskon</span>
                            <span className="text-red-600">- Rp{trx.poin_potongan * 10000}</span>
                        </div>
                    )}
                    {trx.metode_pengiriman === 'Antar kurir' && (
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Ongkos Kirim</span>
                            <span>Rp{trx.total_ongkir}</span>
                        </div>
                    )}
                </div>

                <Separator className="my-1" />

                <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-medium">Total Bayar</span>
                    <span className="text-xl font-bold text-primary">
                        Rp{trx.total_harga}
                    </span>
                </div>
            </DialogContent>

        </Dialog>
    );
}
