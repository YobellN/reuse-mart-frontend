import { SiteHeader } from "@/components/site-header";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getPembayaranPending } from "@/services/pembayaran/pembayaran-services";

export default async function Page() {
    const data = await getPembayaranPending();
    console.log("ini data", data);
    return (
        <>
            <DataTable columns={columns} data={data} />
        </>
    )
}
