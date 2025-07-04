'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import {
  ShoppingBag,
  AlarmClock,
  CalendarClock,
  Clock3,
  CreditCard,
  FileText,
  CheckCircle,
  Star,
} from "lucide-react";
import { Penjualan } from "@/services/penjualan/schema-penjualan";
import React from "react";
import ProductImage from "../product/product-image";
import { Button } from "../ui/button";
import TransactionDetail from "./transaction-detail";
import ModalRatingProduk from "./modal-rating-produk";

const status = {
  "Menunggu Pembayaran": "bg-yellow-100 text-yellow-800",
  "Menunggu Konfirmasi": "bg-blue-100   text-blue-800",
  Disiapkan: "bg-indigo-100 text-indigo-800",
  Dikirim: "bg-teal-100   text-teal-800",
  Selesai: "bg-green-100  text-green-800",
  Hangus: "bg-red-100    text-red-800",
};

export default function TransaksiCard(trx: Penjualan) {
  return (
    <Card className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-0 overflow-hidden max-w-full mx-auto">
      <CardHeader className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-secondary px-4 py-2 gap-3 border-b">
        <div className="flex flex-col lg:flex-row gap-2">
          <Badge className="flex items-center text-xs font-semibold text-secondary-foreground bg-white  px-2 py-1 rounded">
            <CalendarClock className="w-4 h-4 mr-1" />
            {format(new Date(trx.tanggal_penjualan), "dd MMM yyyy", {
              locale: id,
            })}
          </Badge>
          <Badge className="flex items-center text-xs font-normal bg-secondary text-muted-foreground px-2 py-1 rounded">
            <FileText className="w-5 h-5" />
            {trx.id_penjualan}
          </Badge>
        </div>

        <div className="flex flex-row lg:items-center gap-2 w-auto">
          <Badge
            className={`flex items-center text-sm font-semibold px-3 py-1 rounded-full ${
              status[trx.status_penjualan as keyof typeof status] ??
              "bg-gray-100 text-gray-600"
            }`}
          >
            <CheckCircle className="w-5 h-5 mr-1" />
            {trx.status_penjualan}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="px-3 lg:px-5">
        <div className="space-y-4">
          {trx.detail.map((b, i) => (
            <Card
              key={i}
              className="relative flex flex-col lg:flex-row items-start lg:items-center gap-4 p-4 bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="w-full h-48 lg:w-24 lg:h-24 relative rounded-lg overflow-hidden border">
                <ProductImage
                  filename={b.produk.foto_produk[0].path_foto}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <h3 className="font-semibold text-base lg:text-lg line-clamp-2">
                  {b.produk.nama_produk}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <Badge className="flex items-center text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      {b.produk.kategori.nama_kategori}
                    </Badge>
                    <div className="flex items-center gap-1 mt-2 ml-2 text-xs">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        Rp{b.produk.harga_produk.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {trx.status_penjualan === "Selesai" &&
                (b.produk?.rating === null ? (
                  <ModalRatingProduk penjualan={trx} trx={b.produk} />
                ) : (
                  <div className="text-yellow-500 flex font-semibold">
                    <Star fill="currentColor" className="me-2" />
                    {b.produk.rating} / 5
                  </div>
                ))}
            </Card>
          ))}
        </div>
      </CardContent>

      <div className="bg-white border-t px-4 py-2 space-y-2 pb-4">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-2">
          <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto">
            {trx.tenggat_pembayaran &&
              trx.status_penjualan === "Menunggu Pembayaran" && (
                <div className="flex items-center text-sm font-semibold bg-red-50 text-red-800 px-2 py-1 rounded">
                  <p>Tenggat Pembayaran</p>
                  <Badge className="flex items-center text-sm px-2 py-1 rounded bg-red-50 text-red-800">
                    <AlarmClock className="w-5 h-5 mr-2" />
                    {format(
                      new Date(trx.tenggat_pembayaran),
                      "dd MMM yyyy, HH:mm",
                      { locale: id }
                    )}
                  </Badge>
                </div>
              )}
            {trx.jadwal_pengambilan && (
              <div className="flex items-center text-sm font-semibold bg-blue-50 text-blue-800 px-2 py-1 rounded">
                <p>Jadwal Pengambilan</p>
                <Badge className="flex items-center text-sm px-2 py-1 rounded bg-blue-50 text-blue-800">
                  <Clock3 className="w-5 h-5 mr-2" />
                  {format(
                    new Date(trx.jadwal_pengambilan),
                    "dd MMM yyyy, HH:mm",
                    { locale: id }
                  )}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-1">
            <CreditCard className="w-4 h-4" />
            <span className="font-semibold text-sm">Total: </span>
            <span className="text-base font-bold">
              Rp{trx.total_harga.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        <div
          className={`flex flex-col lg:flex-row ${
            trx.status_penjualan !== "Selesai" &&
            trx.status_penjualan !== "Menunggu Pembayaran"
              ? "lg:justify-end"
              : "lg:justify-between"
          } items-start lg:items-center gap-2 mt-2`}
        >
          {trx.status_penjualan === "Menunggu Pembayaran" && (
            <Button
              variant="outline"
              className="w-full lg:w-auto border-primary bg-white text-primary border"
              size="sm"
            >
              Unggah Bukti Pembayaran
            </Button>
          )}
          <TransactionDetail trx={trx} />
        </div>
      </div>
    </Card>
  );
}

