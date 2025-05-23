import { DataTable } from "./data-table"
import { SiteHeader } from "@/components/site-header";
import { columns } from "./columns";
import api from "@/services/api";
import { DetailKeranjang } from "@/services/detail_keranjang/schema-detail_keranjang";


async function getData(): Promise<DetailKeranjang[]> {
    const res = await api.get('/detail-keranjang');

    if (!res.data) {
        throw new Error('Failed to fetch DetailKeranjang');
    }

    const DetailKeranjang: DetailKeranjang[] = res.data.data;
    return [
        ...DetailKeranjang
    ]
}

export default async function DetailKeranjangPage() {
    const data = await getData()

    return (
        <div className="min-h-[calc(100vh-18rem)]">
            <div className="container bg-white py-10 px-4 mt-10">
                <h3 className="text-2xl font-bold text-center mb-4">Keranjang</h3>
                <DataTable columns={columns} data={data} />
            </div>
        </div>

    )
}
