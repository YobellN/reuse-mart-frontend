"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { Pembayaran } from "@/services/pembayaran/schema-pembayaran";
import BuktiPembayaran from "@/components/pembayaran/bukti-pembayaran";

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
];