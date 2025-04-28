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
import { Pegawai } from "@/services/utils";


export const columns: ColumnDef<Pegawai>[] = [
    {
        accessorKey: "id_pegawai",
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
        cell: ({ row }) => <span>{row.original.user.nama}</span>,
    },
    {
        accessorKey: "nip",
        header: "NIP",
    },
    {
        accessorKey: "tanggal_lahir",
        header: "Tanggal Lahir",
    },
    {
        accessorKey: "jabatan.nama_jabatan",
        header: "Jabatan",
        cell: ({ row }) => {
            const jabatan = row.original.jabatan.nama_jabatan;

            const colorMap: Record<string, string> = {
                Admin: "border-destructive text-destructive",
                Hunter: "border-primary text-primary",
                CS: "border-info text-info",
                Kurir: "border-warning text-warning",
                QC: "border-secondary text-muted-foreground",
            };

            const colorClass = colorMap[jabatan] ?? "border-muted text-muted-foreground";

            return <Badge variant="outline" className={colorClass}>{jabatan}</Badge>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Aksi",
        cell: ({ row }) => {
            const payment = row.original
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