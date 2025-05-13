import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getRiwayatDonasi } from "@/services/organisasi/organisasi-services";



export default async function Page() {
    const data = await getRiwayatDonasi();
    return (
        <>
            <SiteHeader title="Riwayat Donasi" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
