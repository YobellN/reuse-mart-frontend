import axiosInstance from "@/services/axios-instance"
import { SiteHeader } from "@/components/site-header";
import { columns, Penitip } from "./columns";
import { DataTable } from "./data-table";


async function getData(): Promise<Penitip[]> {
    const res = await axiosInstance.get('/penitip');

    if (!res.data) {
        throw new Error('Failed to fetch penitip');
    }

    const penitip: Penitip[] = res.data.data;
    return [
        ...penitip
    ]
}

export default async function PenitipPage() {
    const data = await getData()

    return (
        <>
            <SiteHeader title="Data Master Penitip" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
