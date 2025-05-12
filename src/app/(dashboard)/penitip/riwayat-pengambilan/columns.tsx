"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { ProdukTitipan } from "@/services/penitipan/schema-penitipan";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/product/product-image";


export const columns: ColumnDef<ProdukTitipan>[] = [
    {
        id: "foto_produk",
        accessorKey: "foto_produk",
        header: "Foto Produk",
        cell: ({ row }) => {
            return (
                <div className="w-16 h-16 overflow-hidden rounded border relative">
                    <ProductImage filename={row.getValue("foto_produk")} style={{ objectFit: "cover" }} />
                </div>
            );
        },
    },
    {
        id: "id_penitipan",
        accessorKey: "id_penitipan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nomor Nota
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "tanggal_penitipan",
        accessorKey: "tanggal_penitipan",
        header: "Tanggal Penitipan",
        accessorFn: (row) =>
            row.tanggal_penitipan
                ? format(new Date(row.tanggal_penitipan), "dd MMMM yyyy", { locale: id })
                : "",
        cell: ({ row }) => {
            return row.getValue("tanggal_penitipan");
        },
    },
    {
        id: "tenggat_pengambilan",
        accessorKey: "tenggat_pengambilan",
        header: "Tenggat Pengambilan",
        accessorFn: (row) =>
            row.tenggat_pengambilan
                ? format(new Date(row.tenggat_pengambilan), "dd MMMM yyyy", { locale: id })
                : "",
        cell: ({ row }) => {
            return row.getValue("tenggat_pengambilan");
        },
    },
    {
        id: "tanggal_pengambilan",
        accessorKey: "tanggal_pengambilan",
        header: "Tanggal Pengambilan",
        accessorFn: (row) =>
            row.tanggal_pengambilan
                ? format(new Date(row.tanggal_pengambilan), "dd MMMM yyyy", { locale: id })
                : "Belum diambil",
        cell: ({ row }) => {
            const value = row.getValue("tanggal_pengambilan");

            if (value === "Belum diambil") {
                return <span className="text-muted-foreground italic">Belum diambil</span>;
            }

            return value;
        },
    },
    {
        id: "nama_produk",
        accessorKey: "nama_produk",
        header: "Nama Produk",
    },
    {
        id: "kategori_produk",
        accessorKey: "kategori",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Kategori Produk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "harga_produk",
        accessorKey: "harga_produk",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Harga Produk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorFn: (row) => row.harga_produk as number,
        cell: ({ row }) => {
            const harga = row.getValue("harga_produk");
            return (
                `Rp${(harga as number).toLocaleString("id-ID")}`
            )
        }

    },
    {
        id: "waktu_garansi",
        accessorKey: "waktu_garansi",
        header: "Garansi",
        accessorFn: (row) =>
            row.waktu_garansi
                ? format(new Date(row.waktu_garansi), "dd MMMM yyyy", { locale: id })
                : "Tidak ada",
        cell: ({ row }) => {
            const value = row.getValue("waktu_garansi");

            if (value === "Tidak ada") {
                return <span className="text-muted-foreground italic">Tidak ada</span>;
            }

            return value;
        },
    },
    {
        id: "status_akhir_produk",
        accessorKey: "status_akhir_produk",
        accessorFn: (row) => row.status_akhir_produk,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("status_akhir_produk");
            switch (value) {
                case "Terjual":
                    return <Badge variant="success">{value}</Badge>;
                case "Diambil":
                    return <Badge variant="outline">{value}</Badge>;
                case "Produk untuk donasi":
                    return <Badge variant="warning">{value}</Badge>;
                case "Didonasikan":
                    return <Badge variant="secondary">{value}</Badge>;
                case "Tidak Laku":
                    return <Badge variant="destructive">{value}</Badge>;
                case "Akan Diambil":
                    return <Badge variant="outline" className="text-purple-500 dark:text-purple-400 border-purple-500 dark:border-purple-400">{value}</Badge>;
                default:
                    return <Badge variant="processing">Sedang dijual</Badge>;
            }
        },
    },
];