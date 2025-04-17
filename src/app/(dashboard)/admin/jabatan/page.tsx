import { cookies } from "next/headers"
import { Jabatan, columns } from "./columns"
import { DataTable } from "./data-table"
import axiosInstance from "@/services/axios-instance";
import { SiteHeader } from "@/components/site-header";

async function getData(): Promise<Jabatan[]> {
    const res = await axiosInstance("/jabatan");

    if (!res.data) {
        throw new Error('Failed to fetch jabatan');
    }

    const jabatan: Jabatan[] = res.data.data;

    return [
        ...jabatan
    ]
}

export default async function DemoPage() {
    const data = await getData()

    return (
        <>
            <SiteHeader title="Data Master Jabatan" />
            <DataTable columns={columns} data={data} />
        </>

    )
}