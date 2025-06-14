"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import React from "react";
import { LaporanDonasiDownloadButton } from "@/components/laporan/laporan-donasi";
import { LaporanDonasiPreview } from "@/components/laporan/laporan-donasi-preview";
import { PenitipTransaksiLaporanSchema, PenitipTransaksiLaporanTableSchema } from "@/services/penitip_penjualan/schema-penitip_penjualan";

export type ProdukLaporan = {
    kode_produk: string;
    nama_produk: string;
    tanggal_masuk: string;
    tanggal_laku: string;
    harga_jual_bersih: number;
    bonus_terjual_cepat: number;
    pendapatan: number;
};

export const columns: ColumnDef<ProdukLaporan>[] = [
    {
        id: "kode_produk",
        accessorKey: "kode_produk",
        header: "Kode Produk",
        cell: ({ row }) => row.getValue("kode_produk"),
    },
    {
        id: "nama_produk",
        accessorKey: "nama_produk",
        header: "Nama Produk",
        cell: ({ row }) => row.getValue("nama_produk"),
    },
    {
        id: "tanggal_masuk",
        accessorKey: "tanggal_masuk",
        header: "Tanggal Masuk",
        cell: ({ row }) => row.getValue("tanggal_masuk"),
    },
    {
        id: "tanggal_laku",
        accessorKey: "tanggal_laku",
        header: "Tanggal Laku",
        cell: ({ row }) => row.getValue("tanggal_laku"),
    },
    {
        id: "harga_jual_bersih",
        accessorKey: "harga_jual_bersih",
        header: "Harga Jual Bersih",
        cell: ({ row }) => row.getValue("harga_jual_bersih"),
    },
    {
        id: "bonus_terjual_cepat",
        accessorKey: "bonus_terjual_cepat",
        header: "Bonus Terjual Cepat",
        cell: ({ row }) => row.getValue("bonus_terjual_cepat"),
    },
    {
        id: "pendapatan",
        accessorKey: "pendapatan",
        header: "Pendapatan",
        cell: ({ row }) => row.getValue("pendapatan"),
    },
];