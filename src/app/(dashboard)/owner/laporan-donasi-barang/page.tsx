import { tahunTerlamaDonasi } from "@/services/donasi/donasi-services";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { SiteHeader } from "@/components/site-header";
export default async function Page() {
  // Ambil tahun terlama dari backend (misal: 2021)
  const tahunTerlama: number = await tahunTerlamaDonasi();

  // Tahun sekarang
  const tahunSekarang = new Date().getFullYear();

  // Generate array tahun dari tahunTerlama sampai tahunSekarang
  const data = [];
  for (let t = tahunTerlama; t <= tahunSekarang; t++) {
    data.push({ tahun: t });
  }

  return (
    <>
      <SiteHeader title="Laporan Donasi Berdasaran Tahun" />
      <DataTable columns={columns} data={data} />
    </>
  );
}
