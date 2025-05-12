"use client"

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alamat } from "@/services/utils";
import Link from "next/link";

import { toast } from "sonner";
import HapusDialog from "@/components/hapus-dialog";
import { handleAlamatUtamaById, handleDeleteAlamat } from "@/services/alamat/alamat-services";
import UbahDialog from "@/components/ubah-dialog";

export const columns: ColumnDef<Alamat>[] = [
    {
        accessorKey: "id_alamat",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id Alamat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "kabupaten_kota",
        header: "Kabupaten/Kota",
    },
    {
        accessorKey: "kecamatan",
        header: "Kecamatan",
    },
    {
        accessorKey: "kode_pos",
        header: "Kode Pos",
    },
    {
        accessorKey: "detail_alamat",
        header: "Detail Alamat",
    },
    {
        accessorKey: "alamat_utama",
        header: "Alamat Utama",
        cell: ({ row }) => (
            <Badge variant={row.original.alamat_utama ? "default" : "secondary"}>
                {row.original.alamat_utama ? "Ya" : "Tidak"}
            </Badge>
        ),
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
                        <Link href={`/profile/alamat/${row.original.id_alamat}`}>
                            <Button variant="ghost" className="text-warning w-full">Edit Alamat</Button>
                        </Link>
                        <HapusDialog id={row.original.id_alamat} onHapus={() => handleDeleteAlamat(row.original.id_alamat)} label="alamat" detail={row.original.label} />
                        <UbahDialog id={row.original.id_alamat} onUbah={() => handleAlamatUtamaById(row.original.id_alamat)} label="alamat utama" detail={row.original.label} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];