"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  MoreHorizontal,
  SquarePen,
  FileText,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Penitipan } from "@/services/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import Link from "next/link";
import HapusDialog from "@/components/hapus-dialog";
import UbahDialog from "@/components/ubah-dialog";

export const columns: ColumnDef<Penitipan>[] = [
  {
    accessorKey: "id_penitipan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID Penitipan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "nama_penitip",
    header: "Nama Penitip",
  },
  {
    accessorKey: "nama_qc",
    header: "Nama QC",
  },
  {
    accessorKey: "tanggal_penitipan",
    header: "Tanggal Penitipan",
    accessorFn: (row) =>
      row.tanggal_penitipan
        ? format(new Date(row.tanggal_penitipan), "dd MMMM yyyy", {
            locale: id,
          })
        : "",
    cell: ({ row }) => {
      return row.getValue("tanggal_penitipan");
    },
  },
  {
    accessorKey: "tenggat_penitipan",
    header: "Tenggat Penitipan",
    cell: ({ row }) => {
      const tanggal = new Date(row.original.tenggat_penitipan);
      const formatted = tanggal.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return <span>{formatted}</span>;
    },
  },
  // {
  //   accessorKey: "tenggat_pengambilan",
  //   header: "Batas Pengambilan",
  //   cell: ({ row }) => {
  //     const tanggal = new Date(row.original.tenggat_pengambilan);
  //     const formatted = tanggal.toLocaleDateString("id-ID", {
  //       day: "2-digit",
  //       month: "long",
  //       year: "numeric",
  //     });
  //     return <span>{formatted}</span>;
  //   },
  // },
  {
    accessorKey: "id_hunter",
    header: "Status Hunting",
    cell: ({ row }) => {
      const status = row.original.id_hunter;
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Hunting" : "Non Hunting"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status_perpanjangan",
    header: "Status Perpanjangan",
    cell: ({ row }) => {
      const status = row.original.status_perpanjangan;
      return (
        <Badge variant={status === 1 ? "blue" : "secondary"}>
          {status === 1 ? "Diperpanjang" : "Tidak Diperpanjang"}
        </Badge>
      );
    },
  },
  //   {
  //     accessorKey: "nama_qc",
  //     header: "Nama QC",
  //     cell: ({ row }) => <span>{row.original.nama_qc}</span>,

  //   const colorMap: Record<string, string> = {
  //     Admin: "border-destructive text-destructive",
  //     Hunter: "border-primary text-primary",
  //     CS: "border-info text-info",
  //     Kurir: "border-warning text-warning",
  //     QC: "border-secondary text-muted-foreground",
  //   };

  //   const colorClass =
  //     colorMap[jabatan] ?? "border-muted text-muted-foreground";

  //   return (
  //     <Badge variant="outline" className={colorClass}>
  //       {jabatan}
  //     </Badge>
  //   );
  //   },
  {
    id: "actions",
    enableHiding: false,
    header: "Aksi",
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi:</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/gudang/transaksi-penitipan/${rowData.id_penitipan}`}
                className="flex gap-2 items-center"
              >
                <FileText /> Detail Penitipan
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Link
                href={`/admin/pegawai/${rowData.id_penitipan}`}
                className="flex gap-2 items-center"
              >
                <SquarePen /> Edit Data Pegawai
              </Link>
            </DropdownMenuItem> */}
            {/* <UbahDialog
              id={row.original.id_penitipan}
              onUbah={() => {}}
              label=" Password Pegawai"
              detail={row.original.nama_penitip}
            /> */}
            <DropdownMenuSeparator />

            {/* <HapusDialog
              id={row.original.id_pegawai}
              onHapus={() => handleDeletePegawai(row.original.id_pegawai)}
              label="Data Pegawai"
              detail={row.original.user.nama}
              triggerButton={
                <Button className="text-red-600 focus:text-red-600 bg-transparent hover:bg-red-200">
                  <Trash2 className="text-red-600" /> Hapus Data Pegawai
                </Button>
              }
            /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
