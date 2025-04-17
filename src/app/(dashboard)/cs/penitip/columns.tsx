"use client"

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

export type Penitip = {
    id_penitip: string,
    id_user: string,
    nik: string,
    foto_ktp: string,
    saldo: number,
    poin: number,
    user: {
        nama: string;
        email: string;
        no_telp: string;
        fcm_token: string | null;
    };
};

export const columns: ColumnDef<Penitip>[] = [
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
        accessorKey: "foto_ktp",
        header: "Foto KTP",
    },
    {
        accessorKey: "saldo",
        header: "Saldo",
    },
    {
        accessorKey: "poin",
        header: "Poin",
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        //   onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];