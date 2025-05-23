"use client";

import { Penitipan } from "@/services/penitipan/schema-penitipan";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function ShowDetailPenitipan({
  penitipan,
}: {
  penitipan: Penitipan;
}) {
  return (
    <Card className="w-full  mx-auto mt-10 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Detail Penitipan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-12">
          <CardTitle className="pb-3 mb-6 text-xl text-start border-b-2 border-stone-500">
            Informasi Penitipan
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">ID Penitipan</p>
            <p className="text-md text-start md:col-span-5">
              : {penitipan.id_penitipan}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">Nama Penitip</p>
            <p className="text-md text-start md:col-span-5">
              : {penitipan.nama_penitip}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">ID Penitip</p>
            <p className="text-md text-start md:col-span-5">
              : {penitipan.id_penitip}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">
              Tanggal Penitipan
            </p>
            <p className="text-md text-start md:col-span-5">
              :{" "}
              {new Date(penitipan.tanggal_penitipan).toLocaleDateString(
                "id-ID",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">Status Hunting</p>
            <p className="text-md text-start md:col-span-5">
              :{" "}
              {penitipan.id_hunter ? "Produk Hunting" : "Bukan Produk Hunting"}
            </p>
          </div>
        </div>
        <div className="mb-12">
          <CardTitle className="pb-3 mb-6 text-xl text-start border-b-2 border-stone-500">
            Masa Penitipan
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">
              Tenggat Penitipan
            </p>
            <p className="text-md text-start md:col-span-5">
              :{" "}
              {new Date(penitipan.tenggat_penitipan).toLocaleDateString(
                "id-ID",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">
              Tenggat Pengambilan
            </p>
            <p className="text-md text-start md:col-span-5">
              :{" "}
              {new Date(penitipan.tenggat_pengambilan).toLocaleDateString(
                "id-ID",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">
              Status Perpanjangan
            </p>
            <p className="text-md text-start md:col-span-5">
              :{" "}
              {penitipan.status_perpanjangan === 0
                ? "Tidak Diperpanjang"
                : "Diperpanjang"}
            </p>
          </div>
        </div>
        <div className="mb-12">
          <CardTitle className="pb-3 mb-6 text-xl text-start border-b-2 border-stone-500">
            Informasi Pegawai Gudang
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">
              Quality Control Oleh
            </p>
            <p className="text-md text-start md:col-span-5">
              : {penitipan.nama_qc}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
            <p className="text-md text-start font-semibold">ID QC</p>
            <p className="text-md text-start md:col-span-5">
              : {penitipan.id_qc}
            </p>
          </div>

          {penitipan.id_hunter && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
                <p className="text-md text-start font-semibold">Nama Hunter</p>
                <p className="text-md text-start md:col-span-5">
                  : {penitipan.nama_hunter}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b-1 border-stone-300 pb-2 mb-2">
                <p className="text-md text-start font-semibold">ID Hunter</p>
                <p className="text-md text-start md:col-span-5">
                  : {penitipan.id_hunter}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
