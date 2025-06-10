"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { StokGudangItem } from "@/services/laporan/schema-laporan";

export const columns: ColumnDef<StokGudangItem>[] = [
  {
    accessorKey: "kodeProduk",
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
    accessorKey: "namaProduk",
    header: "Nama Produk",
  },
  {
    accessorKey: "idPenitip",
    header: "ID Penitip",
  },
  {
    accessorKey: "namaPenitip",
    header: "Nama Penitip",
  },
  {
    accessorKey: "tanggalMasuk",
    header: "Tanggal Masuk",
    cell: ({ row }) => (
      <span>
        {new Date(row.original.tanggalMasuk).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "perpanjangan",
    header: "Perpanjangan",
  },
  {
    accessorKey: "idHunter",
    header: "ID Hunter",
    cell: ({ row }) => {
      const idHunter = row.original.idHunter;
      return idHunter === "Tidak ada hunter" ? "" : idHunter;
    },
  },
  {
    accessorKey: "namaHunter",
    header: "Nama Hunter",
    cell: ({ row }) => {
      const namaHunter = row.original.namaHunter;
      return namaHunter === "Tidak ada hunter" ? "" : namaHunter;
    },
  },

  {
    accessorKey: "hargaProduk",
    header: "Harga Produk",
    cell: ({ row }) => {
      return `Rp${row.original.hargaProduk.toLocaleString("id-ID")}`;
    },
  },
];
