"use server";

import UpdatePegawaiForm from "@/components/pegawai/update-pegawai-form";
import { SiteHeader } from "@/components/site-header";
import { getPegawaiById } from "@/services/pegawai/pegawai-service";
import AlertBox from "@/components/alert-box";

export default async function UpdatePegawaiPage({
  params,
}: {
  params: Promise<{ id_pegawai: string }>;
}) {
  const { id_pegawai } = await params;
  const pegawai = await getPegawaiById(id_pegawai).catch(() => null);

  if (!pegawai) {
    return (
      <>
        <SiteHeader title="Pegawai" />
        <div className="flex justify-center w-full mt-4">
          <AlertBox
            variant="destructive"
            title="Error 404"
            description="Penitip tidak ditemukan"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SiteHeader title="Tambah Pegawai" />
      <br />
      <UpdatePegawaiForm pegawai={pegawai} />
    </>
  );
}
