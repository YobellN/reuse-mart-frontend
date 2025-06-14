import { SiteHeader } from "@/components/site-header"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { getLaporanPenjualanPerKategori } from "@/services/laporan/laporan-services"
import LaporanTahunSelect from "@/components/tahun-select"
import { LaporanPenjualanPerKategori } from "@/components/laporan/laporan-penjualan-per-kategori"

export default async function Page({ searchParams }: { searchParams: Promise<{ tahun?: string }> }) {
    const tahun = (await searchParams).tahun || new Date().getFullYear().toString()
    const data = await getLaporanPenjualanPerKategori({ tahun: tahun })

    return (
        <>
            <SiteHeader title="Laporan Penjualan Per Kategori" />
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 md:py-6">
                <div className="flex flex-col sm:flex-row gap-2">
                    <LaporanTahunSelect tahun={tahun} />
                </div>
                <div className="self-start md:self-auto">
                    <LaporanPenjualanPerKategori trx={data} tahun={tahun} />
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </>
    )
}
