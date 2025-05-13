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
import { Penitip } from "@/services/penitip/schema-penitip";
import { handleDeletePenitip } from "@/services/penitip/penitip-services";
import FotoKTP from "@/components/penitip/foto-ktp";

export const columns: ColumnDef<Penitip>[] = [
    {
        id: "foto_ktp",
        accessorKey: "foto_ktp",
        header: "Foto KTP",
        cell: ({ row }) => {
            return (
                <div className="w-16 h-16 overflow-hidden rounded border relative">
                    <FotoKTP filename={row.getValue("foto_ktp")} style={{ objectFit: "cover" }} />
                </div>
            );
        },
    },
    {
        accessorKey: "id_penitip",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id Pegawai
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "nama",
        accessorKey: "user.nama",
        header: "Nama",
    },
    {
        accessorKey: "user.email",
        header: "Email",
    },
    {
        accessorKey: "user.no_telp",
        header: "No Telp",
    },
    {
        accessorKey: "nik",
        header: "NIK",
    },
    {
        accessorKey: "poin",
        header: "Poin",
    },
    {
        accessorKey: "saldo",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Saldo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        accessorFn: (row) => row.saldo as number,
        cell: ({ row }) => {
            const saldo = row.getValue("saldo");
            return (
                `Rp${(saldo as number).toLocaleString("id-ID")}`
            )
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
                        <Link href={`/cs/penitip/${row.original.id_penitip}`} className="hover:bg-accent hover:text-accent-foreground">
                            <Button variant={"ghost"} className="text-warning"><Edit className=" h-4 w-4" />Edit penitip</Button>
                        </Link>
                        <HapusDialog id={row.original.id_penitip} onHapus={() => handleDeletePenitip(row.original.id_penitip)} label="penitip" detail={row.original.user.nama} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];