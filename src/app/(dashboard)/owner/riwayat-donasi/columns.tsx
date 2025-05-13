"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/product/product-image";
import { Donasi } from "@/services/organisasi/schema-organisasi";

export const columns: ColumnDef<Donasi>[] = [
    {
        id: "foto_produk",
        header: "Foto Produk",
        accessorFn: (row) =>
            row.produk?.foto_produk?.[0]?.path_foto ?? null,
        cell: ({ row }) => {
            const filename = row.getValue("foto_produk");

            if (!filename) {
                return <span className="italic text-muted-foreground">Tidak ada foto</span>;
            }

            return (
                <div className="w-16 h-16 overflow-hidden rounded border relative">
                    <ProductImage
                        filename={filename as string}
                        style={{ objectFit: "cover" }}
                    />
                </div>
            );
        },
    },
    {
        id: "id_donasi",
        accessorKey: "id_donasi",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID Donasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "deskripsi_request",
        accessorKey: "request_donasi.deskripsi_request",
        header: "Deskripsi Request",
    },
    {
        id: "produk",
        accessorKey: "produk.nama_produk",
        header: "Nama Produk",
    },
    {
        id: "tanggal_donasi",
        accessorKey: "tanggal_donasi",
        header: "Tanggal Donasi",
        accessorFn: (row) =>
            row.tanggal_donasi
                ? format(new Date(row.tanggal_donasi), "dd MMMM yyyy", { locale: id })
                : "Tidak ada",
        cell: ({ row }) => {
            const value = row.getValue("tanggal_donasi");

            if (value === "Tidak ada") {
                return <span className="text-muted-foreground italic">Tidak ada</span>;
            }

            return value;
        },
        sortingFn: "datetime"
    },
    {
        id: "organisasi",
        accessorKey: "request_donasi.organisasi.user.nama",
        header: "Organisasi",
    },
    {
        id: "nama_penerima",
        accessorKey: "nama_penerima",
        header: "Nama Penerima",
    },
];