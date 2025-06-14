import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getPembayaranBukanPending } from "@/services/pembayaran/pembayaran-services";

export default async function Page() {
    const data = await getPembayaranBukanPending();
    return (
        <>
            <DataTable columns={columns} data={data} />
        </>
    )
}
