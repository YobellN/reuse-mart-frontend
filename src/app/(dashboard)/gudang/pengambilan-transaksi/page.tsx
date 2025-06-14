import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getRiwayatPenjualan } from "@/services/penjualan/penjualan-services";



export default async function Page() {
    const data = await getRiwayatPenjualan({
        status: "Menunggu Pengambilan",
        metode_pengiriman: "Ambil di gudang",
    });
    return (
        <>
            <SiteHeader title="Konfirmasi Pengambilan Transaksi" />
            <DataTable columns={columns} data={data} />
        </>
    )
}
