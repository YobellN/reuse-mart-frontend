import { SiteHeader } from "@/components/site-header"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { getLaporanBarangHangus } from "@/services/laporan/laporan-services"
import LaporanTahunSelect from "@/components/tahun-select"
import LaporanBulanSelect from "@/components/bulan-select"
import { LaporanBarangHangus } from "@/components/laporan/laporan-barang-hangus"

export default async function Page({ searchParams }: { searchParams: { tahun?: string, bulan?: string } }) {
    const tahun = searchParams.tahun || new Date().getFullYear().toString()
    const bulan = searchParams.bulan || (new Date().getMonth() + 1).toString()
    const data = await getLaporanBarangHangus({ tahun: tahun, bulan: bulan });
    
    return (
        <>
            <SiteHeader title="Laporan Penjualan Per Kategori" />
            <div className="flex items-center py-4 md:py-6 justify-between">
                <div className="flex items-center gap-2">
                    <LaporanTahunSelect tahun={tahun} />
                    <LaporanBulanSelect bulan={bulan} />
                </div>
                <LaporanBarangHangus trx={data} tahun={tahun} bulan={bulan} />
            </div>
            <DataTable columns={columns} data={data} />
        </>
    )
}
