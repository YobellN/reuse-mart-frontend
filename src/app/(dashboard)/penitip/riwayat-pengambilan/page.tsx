import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProdukTitipanPenitip } from "@/services/penitipan/penitipan-services";



export default async function Page() {
    const data = await getProdukTitipanPenitip("Akan Diambil");
    return (
        <>
            <SiteHeader title="Data Master Produk Titipan" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
