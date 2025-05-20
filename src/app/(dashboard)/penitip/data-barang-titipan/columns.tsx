"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { DetailProdukTitipan } from "@/services/penitipan/schema-penitipan";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/product/product-image";
import DetailProdukTitipanModal from "@/components/product/product-detail-modal";

export const columns: ColumnDef<DetailProdukTitipan>[] = [
    {
        id: "foto_produk",
        header: "Foto Produk",
        accessorFn: row => row.foto_produk[0]?.path_foto ?? "",
        cell: info => {
            const filename = info.getValue<string>();
            return (
                <div className="w-16 h-16 overflow-hidden rounded border relative">
                    <ProductImage filename={filename || ""} style={{ objectFit: "cover" }} />
                </div>
            );
        },
    },
    {
        id: "id_penitipan",
        accessorKey: "detail_penitipan.penitipan.id_penitipan",
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
        accessorKey: "detail_penitipan.penitipan.tanggal_penitipan",
        header: "Tanggal Penitipan",
        accessorFn: (row) =>
            row.detail_penitipan.penitipan.tanggal_penitipan
                ? format(new Date(row.detail_penitipan.penitipan.tanggal_penitipan), "dd MMMM yyyy", { locale: id })
                : "",
        cell: ({ row }) => {
            return row.getValue("tanggal_penitipan");
        },
    },
    {
        id: "nama_produk",
        accessorKey: "nama_produk",
        header: "Nama Produk",
    },
    {
        id: "kategori_produk",
        accessorKey: "kategori.nama_kategori",
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
        accessorFn: (row) => row.status_akhir_produk ?? "Sedang dijual",
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
    {
        id: "rating",
        accessorKey: "rating",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rating
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorFn: (row) => row.rating,
        cell: ({ row }) => {
            const value = row.getValue("rating");

            if (!value) return <span className="text-muted-foreground italic">Tidak ada</span>;

            return (
                <div className="flex items-center gap-1 text-yellow-500 font-medium">
                    <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                    <span>{row.getValue("rating")} / 5</span>
                </div>
            );
        }
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            return (
                <DetailProdukTitipanModal detail={row.original}/>
            );
        },
    },
];