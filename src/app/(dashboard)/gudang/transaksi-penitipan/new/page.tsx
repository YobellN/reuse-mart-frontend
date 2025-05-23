import { SiteHeader } from "@/components/site-header";
import NewPenitipanForm from "@/components/transaksi-penitipan/new-penitipan-form";

export default function TambahPenitipanPage() {
  return (
    <>
      <SiteHeader title="Tambah Penitipan" />
      <br />
      <NewPenitipanForm />
    </>
  );
}
