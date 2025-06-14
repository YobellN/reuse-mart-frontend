import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getLaporanPenjualanKotorBulanan } from "@/services/laporan/laporan-services";
import LaporanTahunSelect from "@/components/tahun-select";
import { LaporanPenjualanKotor } from "@/services/laporan/schema-laporan";
import { LaporanPenjualanBulananDownloadButton } from "@/components/laporan/laporan-penjualan-bulanan";
import { ChartPenjualan } from "@/components/chart-penjualan/chart-penjualan";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tahun?: string }>;
}) {
  const tahun = (await searchParams).tahun || new Date().getFullYear().toString();
  const data: LaporanPenjualanKotor[] = await getLaporanPenjualanKotorBulanan({
    tahun,
  });
  console.log(data);

  return (
    <>
      <SiteHeader title="Laporan Penjualan Bulanan" />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 md:py-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <LaporanTahunSelect tahun={tahun} />
        </div>
        <LaporanPenjualanBulananDownloadButton trx={data} tahun={tahun} />
      </div>
      <DataTable columns={columns} data={data} />
      <br />
      <div className=" mt-24 flex justify-center w-full">
        <div className="w-full">
          <ChartPenjualan data={data} tahun={tahun} />
        </div>
      </div>
    </>
  );
}
