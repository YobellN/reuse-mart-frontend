import axiosInstance from "@/services/api"
import { DataTable } from "./data-table"
import { SiteHeader } from "@/components/site-header";
import { Alamat } from "@/services/utils";
import { columns } from "./columns";


async function getData(): Promise<Alamat[]> {
    const res = await axiosInstance.get('/alamat');

    if (!res.data) {
        throw new Error('Failed to fetch Alamat');
    }

    const Alamat: Alamat[] = res.data.data;
    return [
        ...Alamat
    ]
}

export default async function AlamatPage() {
    const data = await getData()

    return (
        <div>
            {/* <SiteHeader title="Data Master Alamat" /> */}
            <DataTable columns={columns} data={data} />
        </div>
    )
}
