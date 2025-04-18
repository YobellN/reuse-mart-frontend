"use client"

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import handleDeletePenitip from "@/services/penitip/handle-delete-penitip";
import { AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import React from "react";

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

async function hapusPenitip(id_penitip: string) {
    try {
        const res = await handleDeletePenitip(id_penitip);
        if (res.message === "Penitip berhasil dihapus") {
            window.location.reload();
            toast.success(res.message);
        } else {
            toast.error(res.message || "Gagal menghapus penitip");
        }
    } catch (error) {
        toast.error("Terjadi kesalahan saat menghapus");
    }
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
            const [disabled, setDisabled] = React.useState(false);
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
                        <DropdownMenuItem>
                            Edit penitip
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Hapus penitip</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah anda yakin ingin menghapus penitip ini ({row.original.user.nama})?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <Button
                                            disabled={disabled}
                                            variant="destructive"
                                            onClick={async () => { setDisabled(true); await hapusPenitip(row.original.id_penitip).catch(() => setDisabled(false)) }}>
                                            Hapus
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
];