import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getProdukDonasi } from "@/services/organisasi/organisasi-services";



export default async function Page() {
    const data = await getProdukDonasi();
    return (
      <>
        <SiteHeader title="Daftar Produk Untuk Donasi" />
        <DataTable columns={columns} data={data} />
      </>
    );
}
