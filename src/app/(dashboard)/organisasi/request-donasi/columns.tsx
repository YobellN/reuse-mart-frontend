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
import { handleDeletePenitip } from "@/services/penitip/penitip-services";
import { RequestDonasi } from "@/services/organisasi/schema-organisasi";
import { Badge } from "@/components/ui/badge";
import { handleDeleteRequestDonasi } from "@/services/organisasi/organisasi-services";

export const columns: ColumnDef<RequestDonasi>[] = [
    {
        accessorKey: "id_request_donasi",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id Request Donasi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "tanggal_request",
        accessorKey: "tanggal_request",
        header: "Tanggal Request",
    },
    {
        accessorKey: "deskripsi_request",
        header: "Deskripsi Request",
    },
    {
        accessorKey: "status_request",
        header: "Status Request",
        cell: ({ row }) => {
            return (
                row.getValue("status_request") == 1 ? <Badge variant="outline" className="border-primary text-primary">Diterima</Badge> : <Badge variant="warning" >Pending</Badge>
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
                        <Link href={`/organisasi/request-donasi/${row.original.id_request_donasi}`} className="hover:bg-accent hover:text-accent-foreground">
                            <Button variant={"ghost"} className="text-warning">Edit request</Button>
                        </Link>
                        <HapusDialog id={row.original.id_request_donasi} onHapus={() => handleDeleteRequestDonasi(row.original.id_request_donasi)} label="request" />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];