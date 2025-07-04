import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getPembayaranPending } from "@/services/pembayaran/pembayaran-services";

export default async function Page() {
    const data = await getPembayaranPending();
    return (
        <>
            <DataTable columns={columns} data={data} />
        </>
    )
}
