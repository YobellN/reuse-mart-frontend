import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProduk } from "@/services/produk/produk-services";

export default async function Page() {
    const paginatedData = await getProduk();
    const data = paginatedData.data;
    return (
        <>
            <SiteHeader title="Data Master Produk" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
