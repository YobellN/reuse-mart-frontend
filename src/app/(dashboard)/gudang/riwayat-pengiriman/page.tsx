import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getRiwayatPenjualan } from "@/services/penjualan/penjualan-services";



export default async function Page() {
    const data = await getRiwayatPenjualan({
        status: "Selesai",
        metode_pengiriman: "Antar Kurir",
    });
    return (
        <>
            <SiteHeader title="Riwayat Pengiriman Transaksi" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
