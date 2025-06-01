"use server";

import AlertBox from "@/components/alert-box";
import { SiteHeader } from "@/components/site-header";
import {
  getDetailPenitipanById,
  getPegawaiHunter,
  getPegawaiQC,
} from "@/services/penitipan/penitipan-services";
import EditPenitipanForm from "@/components/transaksi-penitipan/edit-penitipan-form";
import { getAllPenitipGudang } from "@/services/penitip/penitip-services";
import { getAllKategoriProduk } from "@/services/produk/kategori-produk-services";

export default async function DetailPenitipanPage({
  params,
}: {
  params: Promise<{ id_penitipan: string }>;
}) {
  const { id_penitipan } = await params;
  const detPenitipan = await getDetailPenitipanById(id_penitipan).catch(
    () => null
  );

  if (!detPenitipan) {
    return (
      <>
        <SiteHeader title="Detail Penitipan" />
        <div className="flex justify-center w-full mt-4">
          <AlertBox
            variant="destructive"
            title="Error 404"
            description="Data penitipan tidak ditemukan"
          />
        </div>
      </>
    );
  }

  const [penitipRaw, QcRaw, kategoriProdukRaw, hunterRaw] = await Promise.all([
    getAllPenitipGudang().catch(() => null),
    getPegawaiQC().catch(() => null),
    getAllKategoriProduk().catch(() => null),
    getPegawaiHunter().catch(() => null),
  ]);

  return (
    <>
      <SiteHeader title="Edit Data Penitipan" />
      <br />
      <EditPenitipanForm
        penitipRaw={penitipRaw}
        QcRaw={QcRaw}
        kategoriProdukRaw={kategoriProdukRaw}
        HunterRaw={hunterRaw}
        detailPenitipan={detPenitipan}
      />
    </>
  );
}
