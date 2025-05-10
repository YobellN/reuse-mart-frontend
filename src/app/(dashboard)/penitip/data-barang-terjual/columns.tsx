"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Penitip_penjualan } from "@/services/penitip_penjualan/schema-penitip_penjualan"

export const columns: ColumnDef<Penitip_penjualan>[] = [
    {
        id: "id_penjualan",
        accessorKey: "id_penjualan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nomor Nota
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "tanggal_penjualan", 
        accessorKey: "tanggal_penjualan",
        header: "Tanggal Penjualan",
        cell: ({ row }) => {
            return format(new Date(row.getValue("tanggal_penjualan")), "dd MMMM yyyy", { locale: id })
        }
    },
    {
        id: "id_pembeli",
        accessorKey: "id_pembeli",
        header: "ID Pembeli"
    },
    {
        id: "komisi_penitip",
        accessorKey: "komisi_penitip",
        header: "Komisi",
        cell: ({ row }) => {
            return `Rp ${row.getValue<number>("komisi_penitip").toLocaleString("id-ID")}`
        }
    },
    {
        id: "bonus_penitip",
        accessorKey: "bonus_penitip",
        header: "Bonus", 
        cell: ({ row }) => {
            return `Rp ${row.getValue<number>("bonus_penitip").toLocaleString("id-ID")}`
        }
    },
    {
        id: "id_produk",
        accessorKey: "id_produk",
        header: "ID Produk"
    },
    {
        id: "nama_produk",
        accessorKey: "nama_produk",
        header: "Nama Produk"
    }
]