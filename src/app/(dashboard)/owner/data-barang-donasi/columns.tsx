"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/product/product-image";
import { Produk } from "@/services/produk/schema-produk";

export const columns: ColumnDef<Produk>[] = [
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
        id: "id_produk",
        accessorKey: "id_produk",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID Produk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "nama_produk",
        accessorKey: "nama_produk",
        header: "Nama Produk",
    },
    {
        id: "kategori_produk",
        accessorKey: "nama_kategori",
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