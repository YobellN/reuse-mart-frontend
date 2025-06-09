import { SiteHeader } from "@/components/site-header";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllTransaksiMerchandise } from "@/services/transaksi_merchandise/transaksi-merchandise-service";

export default async function Page() {
  const riwayatTransaksiMerch = await getAllTransaksiMerchandise();

  return (
    <>
      <SiteHeader title="Riwayat Transaksi Merchandise" />
      <DataTable columns={columns} data={riwayatTransaksiMerch} />
    </>
  );
}
