"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import React from "react";
import { LaporanDonasiDownloadButton } from "@/components/laporan/laporan-donasi";
import { LaporanDonasiPreview } from "@/components/laporan/laporan-donasi-preview";

// Asumsikan tipe data baris hanya punya field tahun
export type LaporanDonasiTahun = {
    tahun: number;
};

export const columns: ColumnDef<LaporanDonasiTahun>[] = [
    {
        id: "tahun",
        accessorKey: "tahun",
        header: "Tahun",
        cell: ({ row }) => row.getValue("tahun"),
    },
    {
        id: "preview",
        header: "Preview",
        cell: ({ row }) => {
            const tahun = row.original.tahun;
            return (
                <LaporanDonasiPreview tahun={tahun} />
            );
        },
    },
    {
        id: "download",
        header: "Download",
        cell: ({ row }) => {
            const tahun = row.original.tahun;
            return (
                <LaporanDonasiDownloadButton tahun={tahun} />
            );
        },
    },
];