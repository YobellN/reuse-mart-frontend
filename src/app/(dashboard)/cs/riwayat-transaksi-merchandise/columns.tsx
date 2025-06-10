"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/product/product-image";
// import Link from "next/link";
import { TransaksiMerchandise } from "@/services/transaksi_merchandise/schema-transaksi-merchandise";

export const columns: ColumnDef<TransaksiMerchandise>[] = [
  {
    id: "foto_merchandise",
    accessorFn: (row) => row.merchandise?.foto_merchandise || "-",
    header: "Foto Merch",
    cell: ({ row }) => {
      const value = row.getValue("foto_merchandise");
      return (
        <div className="w-16 h-16 overflow-hidden rounded border relative">
          <ProductImage
            filename={value as string}
            style={{ objectFit: "cover" }}
          />
        </div>
      );
    },
  },
  {
    id: "id_transaksi_merchandise",
    accessorKey: "id_transaksi_merchandise",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID Transaksi
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "id_pembeli",
    accessorKey: "id_pembeli",
    header: "ID Pembeli",
  },
  {
    id: "nama_pembeli",
    accessorFn: (row) => row.pembeli?.user?.nama || "-",
    header: "Nama Pembeli",
  },
  {
    id: "nama_merchandise",
    accessorFn: (row) => row.merchandise?.nama_merchandise || "-",
    header: "Merchandise",
  },
  {
    id: "tanggal_transaksi",
    accessorKey: "tanggal_transaksi",
    header: "Tanggal Transaksi",
    cell: ({ row }) => {
      const raw = row.getValue("tanggal_transaksi") as string;
      const parsed = new Date(raw.replace(" ", "T"));
      return format(parsed, "dd MMM yyyy HH:mm", { locale: id });
    },
  },

  {
    id: "tanggal_pengambilan",
    accessorKey: "tanggal_pengambilan",
    header: "Tanggal Pengambilan",
    cell: ({ row }) => {
      const value = row.getValue("tanggal_pengambilan") as string;
      const parsed = new Date(value?.replace(" ", "T"));
      return value ? (
        format(parsed, "dd MMM yyyy HH:mm", { locale: id })
      ) : (
        <Badge variant="secondary">Belum diambil</Badge>
      );
    },
  },
  {
    id: "status_transaksi",
    accessorKey: "status_transaksi",
    header: "Status Transaksi",
    cell: ({ row }) => {
      const value = row.getValue("status_transaksi") as string;
      switch (value) {
        case "Selesai":
          return <Badge variant="success">{value}</Badge>;

        case "Diproses":
          return <Badge variant="warning">{value}</Badge>;
      }
    },
  },

  // {
  //     id: "actions",
  //     enableHiding: false,
  //     header: "Aksi",
  //     cell: ({ row }) => {
  //         return (
  //             <Link href={`/cs/produk/diskusi/${row.original.id_produk}`}>
  //                 <Button variant="secondary" size="sm" className="text-primary">
  //                     Lihat Diskusi
  //                 </Button>
  //             </Link>
  //         )
  //     },
  // }
];
