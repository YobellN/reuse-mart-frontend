import { SiteHeader } from "@/components/site-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getAllPenitip } from "@/services/penitip/penitip-services";



export default async function PenitipPage() {
    const data = await getAllPenitip();
    return (
        <>
            <SiteHeader title="Data Master Penitip" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
