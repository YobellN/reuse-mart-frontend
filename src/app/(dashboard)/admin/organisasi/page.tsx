import axiosInstance from "@/services/api"
import { DataTable } from "./data-table"
import { SiteHeader } from "@/components/site-header";
import { Organisasi } from "@/services/utils";
import { columns } from "./columns";


async function getData(): Promise<Organisasi[]> {
  const res = await axiosInstance.get('/organisasi');

  if (!res.data) {
    throw new Error('Failed to fetch Organisasi');
  }

  const Organisasi: Organisasi[] = res.data.data;
  return [
    ...Organisasi
  ]
}

export default async function OrganisasiPage() {
  const data = await getData()

  return (
    <>
      <SiteHeader title="Data Master Organisasi" />
      <DataTable columns={columns} data={data} />
    </>
  )
}
