import { SiteHeader } from "@/components/site-header";
import { getTransaksiMerchandise } from "@/services/transaksi_merchandise/transaksi-merchandise-service";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Page() {
  const riwayatTransaksiMerch = await getTransaksiMerchandise();
  return (
    <>
      <SiteHeader title="Daftar Klaim Merchandise" />
      <DataTable columns={columns} data={riwayatTransaksiMerch} />
    </>
  );
}
