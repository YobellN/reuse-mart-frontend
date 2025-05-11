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
import { Organisasi } from "@/services/utils";
import Link from "next/link";

import { toast } from "sonner";
import HapusDialog from "@/components/hapus-dialog";
import { handleDeleteOrganisasi } from "@/services/organisasi/organisasi-services";

export const columns: ColumnDef<Organisasi>[] = [
    {
        accessorKey: "id_organisasi",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id Organisasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "nama",
        accessorKey: "user.nama",
        header: "Nama",
        cell: ({ row }) => <span>{row.original.user.nama}</span>,
    },
    {
        accessorKey: "no_sk",
        header: "Nomor SK",
    },
    {
        accessorKey: "jenis_organisasi",
        header: "Jenis Organisasi",
    },
    {
        accessorKey: "alamat_organisasi",
        header: "Alamat Organisasi",
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
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/organisasi/${row.original.id_organisasi}`}>
                                <Button variant="ghost" className="text-warning w-full">Edit Organisasi</Button>
                            </Link>
                        </DropdownMenuItem>
                        <HapusDialog id={row.original.id_organisasi} onHapus={() => handleDeleteOrganisasi(row.original.id_organisasi)} label="organisasi" detail={row.original.user.nama} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];