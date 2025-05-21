import NewPenitipForm from "@/components/penitip/new-penitip-form";
import { SiteHeader } from "@/components/site-header";

export default function TambahPenitipanPage() {
  return (
    <>
      <SiteHeader title="Tambah Penitipan" />
      <br />
      <NewPenitipForm />
    </>
  );
}
