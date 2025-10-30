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
import HapusDialog from "@/components/hapus-dialog";
import Link from "next/link";
import { getPenjualanDisiapkan } from "@/services/pembayaran/schema-pembayaran";
import { batalkanPenjualan, konfirmasiPembayaran, tolakPembayaran } from "@/services/pembayaran/pembayaran-services";
import BuktiPembayaran from "@/components/pembayaran/bukti-pembayaran";
import TolakPembayaranDialog from "@/components/pembayaran/tolak-pembayaran-dialog";
import TerimaPembayaranDialog from "@/components/pembayaran/terima-pembayaran-dialog";
import BatalTransaksiDialog from "@/components/pembayaran/batal-transaksi-dialog";

export const columns: ColumnDef<getPenjualanDisiapkan>[] = [
    {
        accessorKey: "id_penjualan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID Penjualan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "tanggal_penjualan",
        header: "Tanggal Penjualan",
        cell: ({ row }) => {
            const date = new Date(row.getValue("tanggal_penjualan"));
            return date.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
        }
    },
    {
        accessorKey: "total_harga",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Harga
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total_harga"));
            return `Rp${amount.toLocaleString("id-ID")}`;
        },
    },
    {
        accessorKey: "status_penjualan",
        header: "Status Penjualan"
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Aksi",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <BatalTransaksiDialog
                            id={row.original.id_penjualan}
                            onTolak={batalkanPenjualan}
                            detail={`#${row.original.id_penjualan}`}
                            totalTransaksi={row.original.total_harga}
                            jumlahPoin={Math.floor(row.original.total_harga / 10000)}
                            totalPoinSetelah={228}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];