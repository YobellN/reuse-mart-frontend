import { SiteHeader } from "@/components/site-header"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { getLaporanPenjualanPerKategori } from "@/services/laporan/laporan-services"
import LaporanTahunSelect from "@/components/tahun-select"
import { LaporanPenjualanPerKategori } from "@/components/laporan/laporan-penjualan-per-kategori"

export default async function Page({ searchParams }: { searchParams: { tahun?: string } }) {
    const tahun = searchParams.tahun || new Date().getFullYear().toString()
    const data = await getLaporanPenjualanPerKategori({ tahun: tahun })

    return (
        <>
            <SiteHeader title="Laporan Penjualan Per Kategori" />
            <div className="flex items-center py-4 md:py-6 justify-between">
                <LaporanTahunSelect tahun={tahun} />
                <div>
                    <LaporanPenjualanPerKategori trx={data} tahun={tahun} />
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </>
    )
}
