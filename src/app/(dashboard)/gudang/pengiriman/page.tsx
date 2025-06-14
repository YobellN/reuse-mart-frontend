import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getRiwayatPenjualan } from "@/services/penjualan/penjualan-services";

export default async function Page() {
    const data = await getRiwayatPenjualan({
        status: "Disiapkan",
        metode_pengiriman: "Antar Kurir",
    });
    return (
        <>
            <SiteHeader title="Pengiriman Transaksi" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
