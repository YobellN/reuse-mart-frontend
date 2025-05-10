import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProdukTitipan } from "@/services/penitipan/penitipan-services";



export default async function PenitipPage() {
    const data = await getProdukTitipan();
    return (
        <>
            <SiteHeader title="Data Master Penitipan" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
