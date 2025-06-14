"use client"

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import HapusDialog from "@/components/hapus-dialog";
import Link from "next/link";
import { Pembayaran } from "@/services/pembayaran/schema-pembayaran";
import { konfirmasiPembayaran, tolakPembayaran } from "@/services/pembayaran/pembayaran-services";
import BuktiPembayaran from "@/components/pembayaran/bukti-pembayaran";
import TolakPembayaranDialog from "@/components/pembayaran/tolak-pembayaran-dialog";
import TerimaPembayaranDialog from "@/components/pembayaran/terima-pembayaran-dialog";

export const columns: ColumnDef<Pembayaran>[] = [
    {
        id: "bukti_pembayaran",
        accessorKey: "bukti_pembayaran",
        header: "Bukti Pembayaran",
        cell: ({ row }) => {
            return (
                <div className="w-16 h-16 overflow-hidden rounded border relative">
                    <BuktiPembayaran filename={row.getValue("bukti_pembayaran")} style={{ objectFit: "cover" }} />
                </div>
            );
        },
    },
    {
        accessorKey: "id_penjualan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id Penjualan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "tanggal_pembayaran",
        accessorKey: "tanggal_pembayaran",
        header: "Tanggal Pembayaran",
    },
    {
        accessorKey: "metode_pembayaran",
        header: "Metode Pembayaran",
    },
    {
        accessorKey: "status_pembayaran",
        header: "Status Pembayaran",
    },
    {
        accessorKey: "penjualan.total_harga",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total tagihan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorFn: (row) => row.penjualan.total_harga as number,
        cell: ({ row }) => {
            const saldo = row.original.penjualan.total_harga

            return saldo
                ? `Rp${saldo.toLocaleString("id-ID")}`
                : "-";
        }
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
                    <DropdownMenuContent align="end" className="flex flex-col">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        
                        <TerimaPembayaranDialog
                            id={row.original.id_penjualan}
                            onTerima={konfirmasiPembayaran}
                            detail={`#${row.original.id_penjualan}`}
                        />
                        <TolakPembayaranDialog
                            id={row.original.id_penjualan}
                            onTolak={tolakPembayaran}
                            detail={`#${row.original.id_penjualan}`}
                        />

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];