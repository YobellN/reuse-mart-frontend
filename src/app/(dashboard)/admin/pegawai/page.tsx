import axiosInstance from "@/services/api"
import { DataTable } from "./data-table"
import { SiteHeader } from "@/components/site-header";
import { Pegawai } from "@/services/utils";
import { columns } from "./columns";


async function getData(): Promise<Pegawai[]> {
  const res = await axiosInstance.get('/pegawai');

  if (!res.data) {
    throw new Error('Failed to fetch pegawai');
  }

  const pegawai: Pegawai[] = res.data.data;
  return [
    ...pegawai
  ]
}

export default async function PegawaiPage() {
  const data = await getData()

  return (
    <>
      <SiteHeader title="Data Master Pegawai" />
      <DataTable columns={columns} data={data} />
    </>
  )
}
