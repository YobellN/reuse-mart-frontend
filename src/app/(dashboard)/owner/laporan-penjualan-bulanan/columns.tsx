"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { LaporanPenjualanKotor } from "@/services/laporan/schema-laporan";

export const columns: ColumnDef<LaporanPenjualanKotor>[] = [
  {
    accessorKey: "bulan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bulan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "jumlah_barang_terjual",
    header: "Jumlah Barang Terjual",
    cell: ({ row }) => {
      return `${row.original.jumlah_barang_terjual} `;
    },
  },
  {
    accessorKey: "jumlah_penjualan_kotor",
    header: "Jumlah Penjualan Kotor",
    cell: ({ row }) => {
      const value = parseFloat(row.original.jumlah_penjualan_kotor);
      return `Rp${value.toLocaleString("id-ID")}`;
    },
  },
];
