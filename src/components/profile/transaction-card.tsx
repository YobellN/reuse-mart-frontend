'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import {
    Truck,
    ShoppingBag,
    AlarmClock,
    CalendarClock,
    Clock3,
    CreditCard,
    FileText,
    Store,
    CheckCircle
} from "lucide-react";
import { Penjualan } from "@/services/penjualan/schema-penjualan";

const kategoriColor: Record<string, string> = {
    "Peralatan Dapur": "bg-orange-100 text-orange-800",
    Elektronik: "bg-blue-100 text-blue-800",
    Pakaian: "bg-green-100 text-green-800",
};
const status = {
    "Menunggu Pembayaran":    "bg-yellow-100 text-yellow-800",
    "Menunggu Konfirmasi":    "bg-blue-100   text-blue-800",
    "Disiapkan":               "bg-indigo-100 text-indigo-800",
    "Dikirim":                "bg-teal-100   text-teal-800",
    "Selesai":                "bg-green-100  text-green-800",
    "Hangus":                 "bg-red-100    text-red-800",
  }

export default function TransaksiCard(trx: Penjualan) {
    
    return (
        <Card className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-0 overflow-hidden">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-secondary px-4 py-3 gap-3 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Badge className="flex items-center text-sm font-semibold bg-white text-muted-foreground px-2 py-1 rounded">
              <FileText className="w-5 h-5 mr-2" />
              Nota: {trx.id_penjualan}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground bg-white px-2 py-1 rounded">
              <CalendarClock className="w-5 h-5 mr-2" />
              {format(new Date(trx.tanggal_penjualan), "dd MMM yyyy", { locale: id })}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <Badge
              className={`flex items-center text-sm font-semibold px-2 py-1 rounded ${
                trx.metode_pengiriman === "Ambil di gudang"
                  ? "bg-muted text-secondary-foreground"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {trx.metode_pengiriman === "Ambil di gudang" ? (
                <Store className="w-5 h-5 mr-2" />
              ) : (
                <Truck className="w-5 h-5 mr-2" />
              )}
              {trx.metode_pengiriman === "Ambil di gudang" ? "Ambil Sendiri" : "Kurir"}
            </Badge>
            <Badge
                className={`
                    flex items-center text-sm font-semibold px-3 py-1 rounded-full
                    ${status[trx.status_penjualan as keyof typeof status] ?? "bg-gray-100 text-gray-600"}
                `}
                >
                <CheckCircle className="w-5 h-5 mr-2" />
                {trx.status_penjualan}
            </Badge>
          </div>
        </CardHeader>
      
        <CardContent className="px-3 sm:px-5 py-4">
          <div className="space-y-4">
            {trx.produk.map((b, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-start gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-full h-48 sm:w-24 sm:h-24 relative rounded-lg overflow-hidden border">
                  <Image
                    src={`http://localhost:8000/storage/foto_produk/${b.foto_produk}`}
                    alt={b.nama_produk}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg line-clamp-2 break-words">
                    {b.nama_produk}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-2 gap-2">
                    <Badge
                      className={`flex items-center text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                        kategoriColor[b.kategori] ?? "bg-gray-200 text-gray-700"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      {b.kategori}
                    </Badge>
                    <div className="flex items-center font-bold text-sm sm:text-base text-primary">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Rp{b.harga.toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      
        <div className="bg-white border-t px-4 py-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
            <div className="flex items-center font-bold text-lg text-primary">
              <CreditCard className="w-6 h-6 mr-2" />
              Total: Rp{trx.total_harga}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {trx.jadwal_pengambilan && (
                <Badge className="flex items-center text-sm px-2 py-1 rounded bg-blue-50 text-blue-800">
                  <Clock3 className="w-5 h-5 mr-2" />
                  {format(new Date(trx.jadwal_pengambilan), "dd MMM yyyy, HH:mm", { locale: id })}
                </Badge>
              )}
              {trx.tenggat_pembayaran && (
                <Badge className="flex items-center text-sm px-2 py-1 rounded bg-red-50 text-red-800">
                  <AlarmClock className="w-5 h-5 mr-2" />
                  {format(new Date(trx.tenggat_pembayaran), "dd MMM yyyy, HH:mm", { locale: id })}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
      
    );
}