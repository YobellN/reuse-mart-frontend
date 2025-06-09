import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getLaporanStokGudang } from "@/services/laporan/laporan-services";
import { StokGudangItem } from "@/services/laporan/schema-laporan";
import { LaporanStokGudangButton } from "@/components/laporan/laporan-stok-gudang";

export default async function Page() {
  const data: StokGudangItem[] = await getLaporanStokGudang();

  // Format tanggal hari ini ke Bahasa Indonesia
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <SiteHeader title={`Laporan Stok Gudang - ${today}`} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-4 md:py-6">
        <LaporanStokGudangButton trx={data} />
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
