import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProdukDonasi } from "@/services/organisasi/organisasi-services";



export default async function Page() {
    const data = await getProdukDonasi();
    return (
        <>
            <SiteHeader title="Data Master Produk Titipan" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
