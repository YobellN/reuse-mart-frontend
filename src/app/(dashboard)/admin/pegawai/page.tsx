import axiosInstance from "@/services/axios-instance"
import { Pegawai, columns } from "./columns"
import { DataTable } from "./data-table"
import { SiteHeader } from "@/components/site-header";

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
      <br />
      <DataTable columns={columns} data={data} />
    </>
  )
}
