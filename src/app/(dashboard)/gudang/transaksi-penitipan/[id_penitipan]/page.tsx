"use server";

import AlertBox from "@/components/alert-box";
import ShowDetailPenitipan from "@/components/penitipan/show-detail-penitipan";
import { SiteHeader } from "@/components/site-header";
import { getDetailPenitipanById } from "@/services/penitipan/penitipan-services";

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

  return (
    <>
      <SiteHeader title="Detail Penitipan" />
      <br />
      <ShowDetailPenitipan penitipan={detPenitipan} />
    </>
  );
}
