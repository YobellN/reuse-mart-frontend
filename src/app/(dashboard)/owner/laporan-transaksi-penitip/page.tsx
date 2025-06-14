import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SiteHeader } from "@/components/site-header";
import LaporanTahunSelect from "@/components/tahun-select";
import LaporanBulanSelect from "@/components/bulan-select";
import PenitipSelect from "@/components/penitip-select";
import { LaporanTransaksiPenitipDownloadButton } from "@/components/laporan/laporan-transaksi-penitip";
import { getIdPenitipTerakhir, getLaporanPenitip } from "@/services/penitip_penjualan/penitip_penjualan-services";
import { LaporanTransaksiPenitipPreviewButton } from "@/components/laporan/laporan-transaksi-penitip-preview";

export default async function Page({ searchParams }: { searchParams: { tahun?: string, bulan?: string, id_penitip?: string } }) {
  const tahun = searchParams.tahun || new Date().getFullYear().toString()
  const bulan = searchParams.bulan || (new Date().getMonth() + 1).toString()
  const id_penitip = searchParams.id_penitip || "T0001"
  const data = await getLaporanPenitip({ tahun: tahun, bulan: bulan, id_penitip: id_penitip });
  const idTerakhir = await getIdPenitipTerakhir();
  return (
    <>
      <SiteHeader title="Laporan Transaksi Penitip" />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 md:py-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <LaporanTahunSelect tahun={tahun} />
          <LaporanBulanSelect bulan={bulan} />
          <PenitipSelect endId={idTerakhir} />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <LaporanTransaksiPenitipPreviewButton data={data.data} />
          <LaporanTransaksiPenitipDownloadButton data={data.data} />
        </div>
      </div>
      <DataTable columns={columns} data={data.data.data} />
    </>
  );
}
// ini ada peringatan, biarin aja, aku gk paham jg kenapa malah data3, harusnya cuma data.data aja. tp data.data.data yg bisa akses datanya
