"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { id } from "date-fns/locale/id"
import { Badge } from "@/components/ui/badge"
import ProductImage from "@/components/product/product-image"
import { Produk } from "@/services/produk/schema-produk"
import Link from "next/link"

export const columns: ColumnDef<Produk>[] = [
    {
        id: "foto_produk",
        accessorKey: "foto_produk",
        header: "Foto Produk",
        cell: ({ row }) => {
            const fotoArr = row.original.foto_produk as { path_foto: string }[] | undefined;
            const foto = fotoArr && fotoArr.length > 0 ? fotoArr[0].path_foto : undefined;
            return (
                <div className="w-16 h-16 overflow-hidden rounded border relative">
                    <ProductImage filename={foto} style={{ objectFit: "cover" }} />
                </div>
            );
        },
    },
    {
        id: "id_produk",
        accessorKey: "id_produk",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID Produk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "nama_produk",
        accessorKey: "nama_produk", 
        header: "Nama Produk"
    },
    {
        id: "nama_kategori",
        accessorKey: "nama_kategori",
        header: "Kategori"
    },
    {
        id: "harga_produk",
        accessorKey: "harga_produk",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Harga
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return `Rp${row.getValue<number>("harga_produk").toLocaleString("id-ID")}`
        }
    },
    {
        id: "status_akhir_produk",
        accessorKey: "status_akhir_produk",
        header: "Status",
        cell: ({ row }) => {
            const value = row.getValue("status_akhir_produk") as string;
            switch (value) {
                case "Terjual":
                    return <Badge variant="success">{value}</Badge>;
                case "Diambil":
                    return <Badge variant="outline">{value}</Badge>;
                case "Produk untuk donasi":
                    return <Badge variant="warning">{value}</Badge>;
                case "Didonasikan":
                    return <Badge variant="secondary">{value}</Badge>;
                case "Tidak Laku":
                    return <Badge variant="destructive">{value}</Badge>;
                case "Akan Diambil":
                    return <Badge className="text-orange-400 border-orange-400">{value}</Badge>;
                default:
                    return <Badge variant="processing">Sedang dijual</Badge>;
            }
        }
    },
    {
        id: "nama_penitip",
        accessorKey: "nama_penitip",
        header: "Penitip"
    },
    {
        id: "tanggal_penitipan",
        accessorKey: "tanggal_penitipan",
        header: "Tanggal Penitipan",
        cell: ({ row }) => {
            return format(new Date(row.getValue("tanggal_penitipan")), "dd MMM yyyy", { locale: id });
        }
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Aksi",
        cell: ({ row }) => {
            return (
                <Link href={`/cs/produk/diskusi/${row.original.id_produk}`}>
                    <Button variant="secondary" size="sm" className="text-primary">
                        Lihat Diskusi
                    </Button>
                </Link>
            )
        },
    }
]