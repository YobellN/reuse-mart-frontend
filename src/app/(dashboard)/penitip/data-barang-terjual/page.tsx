import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getRiwayatPenjualanByPenitip } from "@/services/penitip_penjualan/penitip_penjualan-services";
import { Penitip_penjualan } from "@/services/penitip_penjualan/schema-penitip_penjualan";

export default async function BarangTerjualPage() {
    const data = await getRiwayatPenjualanByPenitip("Selesai");
    

    return (
        <>
            <SiteHeader title="Data Barang Terjual" />
            <DataTable columns={columns} data={data} />
        </>
    );
}
