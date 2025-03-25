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
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Pegawai = {
    id_pegawai: string,
    nip: string,
    tanggal_lahir: string
    user: {
        nama: string;
        email: string;
        no_telp: string;
        fcm_token: string | null;
    };
    jabatan: {
        id_jabatan: number;
        nama_jabatan: string;
    };
};

export const columns: ColumnDef<Pegawai>[] = [
    {
        accessorKey: "id_pegawai",
        header: "ID Pegawai",
    },
    {
        accessorKey: "user.nama",
        header: "Nama Pegawai",
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
                Admin: "bg-red-500 text-white",
                Hunter: "bg-green-500 text-white",
                CS: "bg-blue-500 text-white",
                Kurir: "bg-yellow-500 text-black",
                QC: "bg-pink-500 text-white",
            }

            const colorClass = colorMap[jabatan] ?? "bg-gray-200 text-black";

            return <Badge className={colorClass}>{jabatan}</Badge>;
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