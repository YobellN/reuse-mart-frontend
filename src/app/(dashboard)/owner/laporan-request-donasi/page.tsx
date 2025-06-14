import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getRekapRequest } from "@/services/donasi/donasi-services";

export default async function Page() {
    const data = await getRekapRequest();
    return (
        <>
            <SiteHeader title="Laporan Request Donasi" />
            <DataTable columns={columns} data={data} />
        </>
    );
}


