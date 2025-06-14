import NewPengambilanForm from "@/components/pengiriman/new-pengambilan-form";
import NewPengirimanForm from "@/components/pengiriman/new-pengiriman-form";
import { SiteHeader } from "@/components/site-header";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) return <div>Penjualan tidak ditemukan</div>
    return (
        <>
            <SiteHeader title="Penjadwalan Pengambilan Transaksi" />
            <br />
            <NewPengambilanForm id_penjualan={id} />
        </>
    )
}