import NewPembayaranForm from "@/components/keranjang/form-pembayaran";
import { getTagihanPembayaran } from "@/services/pembayaran/pembayaran-services";

export default async function Page({ params }: {
    params: Promise<{ id_penjualan: string }>
}) {
    const { id_penjualan } = await params;

    const { data: totalTagihan } = await getTagihanPembayaran(id_penjualan);
    return (
        <>
            <NewPembayaranForm id_penjualan={id_penjualan} totalAkhir={totalTagihan} />
        </>
    )
}