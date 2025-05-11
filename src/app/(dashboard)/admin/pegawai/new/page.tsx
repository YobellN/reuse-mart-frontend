import NewPegawaiForm from "@/components/pegawai/new-pegawai-form";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
  return (
    <>
      <SiteHeader title="Tambah Pegawai" />
      <br />
      <NewPegawaiForm />
    </>
  );
}
