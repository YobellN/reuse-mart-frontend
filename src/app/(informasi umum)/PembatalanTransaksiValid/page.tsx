import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getPenjualanDisiapkan } from "@/services/pembayaran/pembayaran-services";

export default async function Page() {
    const data = await getPenjualanDisiapkan();
    return (
        <>
            <DataTable columns={columns} data={data} />
        </>
    )
}
