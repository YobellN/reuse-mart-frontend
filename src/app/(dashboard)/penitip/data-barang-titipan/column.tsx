"use client"

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { ProdukTitipan } from "@/services/penitipan/schema-penitipan";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";

export const columns: ColumnDef<ProdukTitipan>[] = [
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
        cell: ({ row }) => {
            return (
                format(new Date(row.getValue("tanggal_penitipan")), "dd-MMMM-yyyy", { locale: id })
            )
        }
    },
    {
        id: "nama_produk",
        accessorKey: "nama_produk",
        header: "Nama Produk",
    },
    {
        id: "harga_produk",
        accessorKey: "harga_produk",
        header: "Harga Produk",
        cell: ({ row }) => {
            return (
                `Rp. ${(row.getValue("harga_produk") as number).toLocaleString("id-ID")}`
            )
        }

    },
    {
        id: "status_garansi",
        accessorKey: "status_garansi",
        header: "Status Garansi",
        cell: ({ row }) => {
            switch (row.getValue("status_garansi")) {
                case true:
                    return <span className="text-green-500 font-semibold">Ada</span>
                case false:
                    return <span className="text-red-500 font-semibold">Tidak ada</span>
                default:
                    return <span className="text-gray-500 font-semibold">Tidak ada</span>
            }
        }

    },
    {
        id: "status_akhir_produk",
        accessorKey: "status_akhir_produk",
        header: "Status Produk",
        cell: ({ row }) => {
            switch (row.getValue("status_akhir_produk")) {
                case "Terjual":
                    return <span className="text-green-500 font-semibold">{row.getValue("status_akhir_produk")}</span>
                case "Diambil":
                    return <span className="text-red-500 font-semibold">{row.getValue("status_akhir_produk")}</span>
                case null:
                    return <span className="text-gray-500 font-semibold">Sedang dititipkan</span>
                default:
                    return <span className="text-blue-500 font-semibold">{row.getValue("status_akhir_produk")}</span>
            }
        }
    },
    {
        id: "s",
        header: "Aksi",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Lihat Detail
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="flex flex-col">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];