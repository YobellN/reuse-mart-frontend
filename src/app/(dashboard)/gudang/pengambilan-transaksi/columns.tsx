"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Penjualan } from "@/services/penjualan/schema-penjualan";
import ConfirmDialog from "@/components/confirm-dialog";
import { handleKonfirmasiPengambilanTransaksi, tambahPoinSaldo } from "@/services/pengiriman/pengiriman-service";
import { downloadNotaTransaksi } from "@/components/transaksi/nota-transaksi-kurir";
import TransactionDetail from "@/components/profile/transaction-detail";


export const columns: ColumnDef<Penjualan>[] = [
    {
        id: "id_penjualan",
        accessorKey: "id_penjualan",
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
        id: "tanggal_penjualan",
        accessorKey: "tanggal_penjualan",
        header: "Tanggal Penjualan",
        accessorFn: (row) =>
            row.tanggal_penjualan
                ? format(new Date(row.tanggal_penjualan), "dd MMMM yyyy", { locale: id })
                : "",
        cell: ({ row }) => {
            return row.getValue("tanggal_penjualan");
        },
    },
    {
        id: "tanggal_pembayaran",
        accessorKey: "pembayaran.tanggal_pembayaran",
        header: "Tanggal Pembayaran",
        accessorFn: (row) =>
            row.pembayaran?.tanggal_pembayaran
                ? format(new Date(row.pembayaran?.tanggal_pembayaran), "dd MMMM yyyy", { locale: id })
                : "",
        cell: ({ row }) => {
            return row.getValue("tanggal_pembayaran");
        },
    },
    {
        id: "jadwal_pengambilan",
        accessorKey: "jadwal_pengambilan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Jadwal Pengambilan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorFn: (row) =>
            row.jadwal_pengambilan
                ? format(new Date(row.jadwal_pengambilan), "dd MMMM yyyy", { locale: id })
                : "",
        cell: ({ row }) => {
            return row.getValue("jadwal_pengambilan");
        },
    },
    {
        id: "nama_pembeli",
        accessorKey: "pembeli.user.nama",
        header: "Pembeli",
    },
    {
        id: "metode_pengiriman",
        accessorKey: "metode_pengiriman",
        accessorFn: (row) => row.metode_pengiriman,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Metode Pengiriman
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("metode_pengiriman");
            switch (value) {
                case "Antar Kurir":
                    return <Badge variant="warning">Antar Kurir</Badge>;
                default:
                    return <Badge variant="processing">Ambil di gudang</Badge>;
            }
        },
    },
    {
        id: "status_penjualan",
        accessorKey: "status_penjualan",
        accessorFn: (row) => row.status_penjualan,
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
            const value = row.getValue("status_penjualan");
            switch (value) {
                case "Disiapkan":
                    return <Badge variant="outline" className="text-purple-500 dark:text-purple-400 border-purple-500 dark:border-purple-400">{value}</Badge>;
                case "Selesai":
                    return <Badge variant="success">{value}</Badge>;
                case "Hangus":
                    return <Badge variant="destructive">{value}</Badge>;
                case "Menunggu Pengambilan":
                    return <Badge variant="processing">{value}</Badge>;
                default:
                    return <Badge variant="processing">Diproses</Badge>;
            }
        },
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            const id_penjualan = row.original.id_penjualan;
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
                        <ConfirmDialog
                            description="Apakah anda yakin ingin melakukan konfirmasi pengambilan?"
                            onConfirm={async () => {
                                const res = await handleKonfirmasiPengambilanTransaksi(id_penjualan);
                                if (res.message.includes("berhasil") && res.data) {
                                    downloadNotaTransaksi({ trx: res.data });
                                    tambahPoinSaldo(id_penjualan);
                                }
                                return res;
                            }}
                            label="Konfirmasi Pengambilan"
                            message="Konfirmasi pengambilan berhasil dilakukan"
                        />
                        <TransactionDetail trx={row.original} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];