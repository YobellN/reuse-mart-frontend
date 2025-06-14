import { SiteHeader } from "@/components/site-header";
import { getAllDataPenitipan } from "@/services/penitipan/penitipan-services";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default async function Page() {
  const penitipan = await getAllDataPenitipan();

  return (
    <>
      <SiteHeader title="Data Master Penitipan" />
      <DataTable columns={columns} data={penitipan} />
    </>
  );
}
