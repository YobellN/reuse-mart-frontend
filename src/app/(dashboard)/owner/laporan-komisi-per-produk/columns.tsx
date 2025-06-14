"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { KomisiProduk } from "@/services/laporan/schema-laporan";

export const columns: ColumnDef<KomisiProduk>[] = [
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
    accessorKey: "hargaJual",
    header: "Harga Jual",
    cell: ({ row }) => {
      return `Rp${row.original.hargaJual.toLocaleString("id-ID")}`;
    },
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
    accessorKey: "tanggalLaku",
    header: "Tanggal Laku",
    cell: ({ row }) => (
      <span>
        {new Date(row.original.tanggalLaku).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    accessorKey: "komisiHunter",
    header: "Komisi Hunter",
    cell: ({ row }) => {
      return `Rp${row.original.komisiHunter.toLocaleString("id-ID")}`;
    },
  },
  {
    accessorKey: "komisiReuseMart",
    header: "Komisi Reuse Mart",
    cell: ({ row }) => {
      return `Rp${row.original.komisiReuseMart.toLocaleString("id-ID")}`;
    },
  },
  {
    accessorKey: "bonusPenitip",
    header: "Bonus Penitip",
    cell: ({ row }) => {
      return `Rp${row.original.bonusPenitip.toLocaleString("id-ID")}`;
    },
  },
];
