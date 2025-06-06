"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { BarangHangus } from "@/services/laporan/schema-laporan";

export const columns: ColumnDef<BarangHangus>[] = [
  {
    accessorKey: "id_produk",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kode Produk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nama_produk",
    header: "Nama Produk",
  },
  {
    accessorKey: "id_penitip",
    header: "ID Penitip",
  },
  {
    accessorKey: "nama_penitip",
    header: "Penitip",
  },
  {
    accessorKey: "tanggal_penitipan",
    header: "Tanggal Masuk",
  },
  {
    accessorKey: "tenggat_penitipan",
    header: "Tenggat Akhir",
  },
  {
    accessorKey: "tenggat_pengambilan",
    header: "Batas Ambil",
  },
];