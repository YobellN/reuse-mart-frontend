import NewPengirimanForm from "@/components/pengiriman/new-pengiriman-form";
import { SiteHeader } from "@/components/site-header";
import { getAllKurir, getPengirimanById } from "@/services/pengiriman/pengiriman-service";
import { Pengiriman } from "@/services/pengiriman/schema-pengiriman";
import { Pegawai } from "@/services/utils";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pengiriman: Pengiriman | null = await getPengirimanById(id);
    const kurir: Pegawai[] = await getAllKurir();

    if (!pengiriman) return <div>Pengiriman tidak ditemukan</div>
    return (
        <>
            <SiteHeader title="Tambah Pengiriman" />
            <br />
            <NewPengirimanForm pengiriman={pengiriman} kurir={kurir} />
        </>
    )
}