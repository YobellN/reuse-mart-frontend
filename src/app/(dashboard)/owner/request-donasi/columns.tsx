"use client"

import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import HapusDialog from "@/components/hapus-dialog";
import Link from "next/link";
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
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "id_organisasi",
    header: "ID Organisasi",
  },
  {
    accessorKey: "organisasi.user.nama",
    header: "Nama Organisasi",
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
      return row.getValue("status_request") == 1 ? (
        <Badge variant="outline" className="border-primary text-primary">
          Diterima
        </Badge>
      ) : (
        <Badge variant="warning">Pending</Badge>
      );
    },
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
            <Link
              href={`/owner/request-donasi/${row.original.id_request_donasi}`}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              <Button variant={"ghost"} className="text-primary">
                <Plus className=" h-4 w-4" />
                Donasikan barang
              </Button>
            </Link>

            <HapusDialog
              id={row.original.id_request_donasi}
              onHapus={() =>
                handleDeleteRequestDonasi(row.original.id_request_donasi)
              }
              label="request"
              triggerButton={
                <Button className="text-red-600 focus:text-red-600 bg-transparent hover:bg-red-200">
                  <Trash2 className="text-red-600" /> Hapus Data Pegawai
                </Button>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];