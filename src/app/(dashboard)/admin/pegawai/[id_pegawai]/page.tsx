import UpdatePegawaiForm from "@/components/pegawai/update-pegawai-form";
import { SiteHeader } from "@/components/site-header";

export default async function UpdatePegawaiPage() {
  return (
    <>
      <SiteHeader title="Tambah Pegawai" />
      <br />
      <UpdatePegawaiForm />
    </>
  );
}
