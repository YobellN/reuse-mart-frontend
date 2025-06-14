import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import ProductCarousel from "./product-carousel";
import { DetailProdukTitipan } from "@/services/penitipan/schema-penitipan";
import {
  Tag,
  Info,
  FileText,
  CreditCard,
  CheckCircle,
  XCircle,
  Calendar,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  RefreshCw,
  Gift,
  Users,
  User,
  ShieldCheck,
} from "lucide-react";

export default function DetailProdukTitipanModal({
  detail,
}: {
  detail: DetailProdukTitipan;
}) {
  const {
    nama_produk,
    kategori,
    deskripsi_produk,
    harga_produk,
    status_ketersediaan,
    waktu_garansi,
    rating,
    foto_produk,
    detail_penitipan,
  } = detail;

  const penitipan = detail_penitipan?.penitipan;
  const tanggal_pengambilan = detail_penitipan?.tanggal_pengambilan;
  const konfirmasi_donasi = detail_penitipan?.konfirmasi_donasi;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm text-primary hover:underline">
          Lihat Detail Produk
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`
          w-full max-w-[90vw] sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
          max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden
          px-4 py-5 sm:px-6 sm:py-6
          bg-gradient-to-b from-green-50 to-green-100
        `}
      >
        {/* Header */}
        <DialogHeader className="flex items-center justify-between pb-1">
          <DialogTitle className="text-lg font-bold">Detail Produk</DialogTitle>
        </DialogHeader>

        <Separator className="my-2" />

        {/* Carousel & Kategori */}
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-64 sm:h-72 md:h-80 overflow-hidden rounded-lg">
            <ProductCarousel images={foto_produk.map((f) => f.path_foto)} />
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mb-4">
          <Tag className="inline w-4 h-4 mr-1 text-blue-500" />
          <span className="font-medium">{kategori.nama_kategori}</span>
        </p>

        <Separator className="my-2" />

        {/* Informasi Produk */}
        <h3 className="flex items-center font-bold text-lg mb-2">
          <Info className="w-4 h-4 mr-1 text-indigo-500" />
          Informasi Produk
        </h3>
        <Card className="p-3 mb-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div className="flex items-center min-w-0">
              <FileText className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="ml-2 truncate">Nama</span>
              <span className="ml-auto font-medium truncate">{nama_produk}</span>
            </div>
            <div className="flex items-start min-w-0">
              <FileText className="w-4 h-4 flex-shrink-0 text-gray-500" />
              <span className="ml-2">Deskripsi</span>
              <span className="ml-auto text-right truncate">{deskripsi_produk}</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 flex-shrink-0 text-green-500" />
              <span className="ml-2">Harga</span>
              <span className="ml-auto font-medium">
                Rp{harga_produk.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="flex items-center">
              {status_ketersediaan ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" />
              ) : (
                <XCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              )}
              <span className="ml-2">Ketersediaan</span>
              <span className="ml-auto">
                {status_ketersediaan ? "Tersedia" : "Kosong"}
              </span>
            </div>
            {waktu_garansi && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 flex-shrink-0 text-purple-500" />
                <span className="ml-2">Garansi s/d</span>
                <span className="ml-auto">
                  {format(new Date(waktu_garansi), "dd MMM yyyy", { locale: id })}
                </span>
              </div>
            )}
            {rating !== null && (
              <div className="flex items-center">
                <Gift className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                <span className="ml-2">Rating</span>
                <span className="ml-auto">{rating} ★</span>
              </div>
            )}
          </div>
        </Card>

        <Separator/>

        {/* Detail Penitipan */}
        <h3 className="flex items-center font-bold text-lg mb-2">
          <CalendarCheck className="w-4 h-4 mr-1 text-blue-500" />
          Detail Penitipan
        </h3>
        <Card className="p-3 mb-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div className="flex items-center min-w-0">
              <Users className="w-4 h-4 flex-shrink-0 text-teal-500" />
              <span className="ml-2 truncate">No. Penitipan</span>
              <span className="ml-auto font-medium truncate">{penitipan?.id_penitipan}</span>
            </div>
            {penitipan && (
              <>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 flex-shrink-0 text-purple-500" />
                  <span className="ml-2">Tgl. Titip</span>
                  <span className="ml-auto">
                    {format(new Date(penitipan.tanggal_penitipan), "dd MMM yyyy", { locale: id })}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarCheck className="w-4 h-4 flex-shrink-0 text-green-500" />
                  <span className="ml-2">Tenggat Titip</span>
                  <span className="ml-auto">
                    {format(new Date(penitipan.tenggat_penitipan), "dd MMM yyyy", { locale: id })}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarX className="w-4 h-4 flex-shrink-0 text-orange-500" />
                  <span className="ml-2">Tenggat Ambil</span>
                  <span className="ml-auto">
                    {format(new Date(penitipan.tenggat_pengambilan), "dd MMM yyyy", { locale: id })}
                  </span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                  <span className="ml-2">Perpanjangan</span>
                  <span className="ml-auto">
                    {penitipan.status_perpanjangan > 0
                      ? `${penitipan.status_perpanjangan}× (30 hari)`
                      : "Belum"}
                  </span>
                </div>
              </>
            )}
            {tanggal_pengambilan && (
              <div className="flex items-center">
                <CalendarPlus className="w-4 h-4 flex-shrink-0 text-blue-300" />
                <span className="ml-2">Tgl. Ambil Kembali</span>
                <span className="ml-auto">
                  {format(new Date(tanggal_pengambilan), "dd MMM yyyy", { locale: id })}
                </span>
              </div>
            )}
            {konfirmasi_donasi !== null && (
              <div className="flex items-center">
                <Gift className="w-4 h-4 flex-shrink-0 text-pink-500" />
                <span className="ml-2">Konfirmasi Donasi</span>
                <span className="ml-auto">{konfirmasi_donasi ? "Ya" : "Tidak"}</span>
              </div>
            )}
          </div>
        </Card>

        <Separator className="my-2" />

        {/* Pihak Terkait */}
        <h3 className="flex items-center font-bold text-lg mb-2">
          <ShieldCheck className="w-4 h-4 mr-1 text-indigo-600" />
          Pihak Terkait
        </h3>
        <Card className="p-3 text-sm">
          <div className="space-y-3">
            {detail.detail_penitipan?.penitipan.hunter && (
              <div className="flex items-center min-w-0">
                <User className="w-4 h-4 flex-shrink-0 text-indigo-500" />
                <span className="ml-2 truncate">Hunter</span>
                <span className="ml-auto font-medium truncate">
                  {detail.detail_penitipan.penitipan.hunter.user.nama}
                </span>
              </div>
            )}
            <div className="flex items-center min-w-0">
              <Users className="w-4 h-4 flex-shrink-0 text-teal-500" />
              <span className="ml-2 truncate">Penitip</span>
              <span className="ml-auto font-medium truncate">
                {detail.detail_penitipan?.penitipan.penitip.user.nama}
              </span>
            </div>
            <div className="flex items-center min-w-0">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-indigo-600" />
              <span className="ml-2 truncate">QC</span>
              <span className="ml-auto font-medium truncate">
                {detail.detail_penitipan?.penitipan.qc.user.nama}
              </span>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
