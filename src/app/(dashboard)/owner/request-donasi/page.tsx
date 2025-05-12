import { SiteHeader } from "@/components/site-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {  getAllRequestDonasiOrganisasi } from "@/services/organisasi/organisasi-services";

export default async function PenitipPage() {
    const data = await getAllRequestDonasiOrganisasi();
    return (
        <>
            <SiteHeader title="Data Master Request Donasi" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
