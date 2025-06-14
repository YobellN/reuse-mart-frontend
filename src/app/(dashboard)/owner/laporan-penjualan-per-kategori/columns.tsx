"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { PenjualanPerKategori } from "@/services/laporan/schema-laporan";

export const columns: ColumnDef<PenjualanPerKategori>[] = [
  {
    accessorKey: "nama_kategori",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "jumlah_item_terjual",
    header: "Jumlah Item Terjual",
    cell: ({ row }) => {
      return `${row.original.jumlah_item_terjual} Produk`;
    }
  },
  {
    accessorKey: "jumlah_item_gagal_terjual",
    header: "Jumlah Item Gagal Terjual",
    cell: ({ row }) => {
      return `${row.original.jumlah_item_gagal_terjual} Produk`;
    }
  },
];