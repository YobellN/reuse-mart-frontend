import AlertBox from "@/components/alert-box";
import UpdateRequestDonasiForm from "@/components/organisasi/update-request-donasi-form";
import { SiteHeader } from "@/components/site-header";
import { getRequestDonasyById } from "@/services/organisasi/organisasi-services";


export default async function Page({ params }: {
    params: Promise<{ id_request_donasi: number }>
}) {
    const { id_request_donasi } = await params;
    const request_donasi = await getRequestDonasyById(id_request_donasi).catch(() => null);

    if (!request_donasi) {
        return (
            <>
                <SiteHeader title="Penitip" />
                <div className="flex justify-center w-full mt-4">
                    <AlertBox variant="destructive" title="Error 404" description="Request donasi tidak ditemukan" />
                </div>
            </>
        )
    }

    return (
        <>
            <SiteHeader title={`Edit Request Donasi ${id_request_donasi}` }  />
            <UpdateRequestDonasiForm requestDonasi={request_donasi} />
        </>

    )
}