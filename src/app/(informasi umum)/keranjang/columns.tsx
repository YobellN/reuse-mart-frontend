"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import HapusDialog from "@/components/hapus-dialog";
import { deleteKeranjang } from "@/services/detail_keranjang/detail_keranjang-services";
import { DetailKeranjang } from "@/services/detail_keranjang/schema-detail_keranjang";

export const columns: ColumnDef<DetailKeranjang>[] = [
    {
        accessorKey: "id_produk",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id Produk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "produk.nama_produk",
        header: "Nama Produk",
    },
    {
        accessorKey: "produk.harga_produk",
        header: "Harga produk",
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Aksi",
        cell: ({ row }) => (
            <HapusDialog id={row.original.id_produk} onHapus={() => deleteKeranjang(row.original.id_produk)} label="produk" detail={row.original.produk.nama_produk} />
        ),
    },
];