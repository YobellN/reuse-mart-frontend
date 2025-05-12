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
import {
  ArrowUpDown,
  MoreHorizontal,
  SquarePen,
  Trash2,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pegawai } from "@/services/utils";

import { resetPasswordByAdmin } from "@/services/auth/user-services";
import { toast } from "sonner";
import Link from "next/link";
import HapusDialog from "@/components/hapus-dialog";
import { handleDeletePegawai } from "@/services/pegawai/pegawai-service";

export const columns: ColumnDef<Pegawai>[] = [
  {
    accessorKey: "id_pegawai",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id Pegawai
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "nama",
    accessorKey: "user.nama",
    header: "Nama",
    // cell: ({ row }) => <span>{row.original.user.nama}</span>,
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
        Admin: "border-destructive text-destructive",
        Hunter: "border-primary text-primary",
        CS: "border-info text-info",
        Kurir: "border-warning text-warning",
        QC: "border-secondary text-muted-foreground",
      };

      const colorClass =
        colorMap[jabatan] ?? "border-muted text-muted-foreground";

      return (
        <Badge variant="outline" className={colorClass}>
          {jabatan}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Aksi",
    cell: ({ row }) => {
      const rowData = row.original;
      const pegawai_id = rowData.id_pegawai;
      const handleResetPassword = async () => {
        if (confirm("Apakah Anda yakin ingin mereset password pegawai ini?")) {
          const response = await resetPasswordByAdmin(pegawai_id);

          if (response.message) {
            toast.success(response.message);
          } else {
            toast.error(response.message || "Gagal mereset password");
          }
        }
      };

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
                href={`/admin/pegawai/${rowData.id_pegawai}`}
                className="flex gap-2 items-center"
              >
                <SquarePen /> Edit Data Pegawai
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleResetPassword}>
              <KeyRound /> Reset Password
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <HapusDialog
              id={row.original.id_pegawai}
              onHapus={() => handleDeletePegawai(row.original.id_pegawai)}
              label="Data Pegawai"
              detail={row.original.user.nama}
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