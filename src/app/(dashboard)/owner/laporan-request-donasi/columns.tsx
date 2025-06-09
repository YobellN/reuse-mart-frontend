"use client"

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DonasiRequestLaporanSchema } from "@/services/donasi/schema-donasi";

export const columns: ColumnDef<DonasiRequestLaporanSchema>[] = [
    {
        id: "id_organisasi",
        accessorKey: "id_organisasi",
        header: "ID Organisasi",
        cell: ({ row }) => row.getValue("id_organisasi"),
    },
    {
        id: "nama_organisasi",
        accessorKey: "nama_organisasi",
        header: "Nama",
        cell: ({ row }) => row.getValue("nama_organisasi"),
    },
    {
        id: "alamat_organisasi",
        accessorKey: "alamat_organisasi",
        header: "Alamat",
        cell: ({ row }) => row.getValue("alamat_organisasi"),
    },
    {
        id: "request",
        accessorKey: "request",
        header: "Request",
        cell: ({ row }) => row.getValue("request"),
    },
];