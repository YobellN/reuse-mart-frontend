import AlertBox from "@/components/alert-box";
import NewDonasiForm from "@/components/organisasi/new-donasi-form";
import { SiteHeader } from "@/components/site-header";
import { getDropdownProduk, getRequestDonasyOwnerById } from "@/services/organisasi/organisasi-services";


export default async function Page({ params }: {
    params: Promise<{ id_request_donasi: number }>
}) {
    const { id_request_donasi } = await params;
    const [request_donasi, produk_donasi] = await Promise.all([
        getRequestDonasyOwnerById(id_request_donasi).catch(() => null),
        getDropdownProduk().catch(() => []),
    ])

    if (!request_donasi) {
        return (
            <>
                <SiteHeader title="Request Donasi" />
                <div className="flex justify-center w-full mt-4">
                    <AlertBox variant="destructive" title="Error 404" description="Request donasi tidak ditemukan" />
                </div>
            </>
        )
    }

    return (
        <>
            <SiteHeader title={`Donasi Produk ${id_request_donasi}`} />
            <NewDonasiForm requestDonasi={request_donasi} produk_donasi={produk_donasi} />
        </>

    )
}