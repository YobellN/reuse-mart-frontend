import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getLaporanKomisiProduk } from "@/services/laporan/laporan-services";
import LaporanTahunSelect from "@/components/tahun-select";
import LaporanBulanSelect from "@/components/bulan-select";
import { DownloadKomisiProdukButton } from "@/components/laporan/laporan-komisi-produk";
// import { LaporanKomisiProduk } from "@/components/laporan/laporan-komisi-produk"; // aktifkan jika sudah buat komponen PDF

export default async function Page({
  searchParams,
}: {
  searchParams: { tahun?: string; bulan?: string };
}) {
  const tahun = searchParams.tahun || new Date().getFullYear().toString();
  const bulan = searchParams.bulan || (new Date().getMonth() + 1).toString();
  const data = await getLaporanKomisiProduk({ tahun, bulan });

  return (
    <>
      <SiteHeader title="Laporan Komisi Bulanan Per Produk" />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 md:py-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <LaporanTahunSelect tahun={tahun} />
          <LaporanBulanSelect bulan={bulan} />
        </div>

        <div className="self-start md:self-auto">
          <DownloadKomisiProdukButton data={data} bulan={bulan} tahun={tahun} />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
