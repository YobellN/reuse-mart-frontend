import { SiteHeader } from "@/components/site-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllRequestDonasi } from "@/services/organisasi/organisasi-services";

export default async function PenitipPage() {
    const data = await getAllRequestDonasi();
    return (
        <>
            <SiteHeader title="Data Master Request Donasi" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
