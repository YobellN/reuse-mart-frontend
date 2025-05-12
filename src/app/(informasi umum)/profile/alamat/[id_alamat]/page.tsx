import AlertBox from "@/components/alert-box";
import UpdateAlamatForm from "@/components/profile/alamat/update-alamat-form";
import { getAlamatById } from "@/services/alamat/alamat-services";


export default async function Page({ params }: {
    params: Promise<{ id_alamat: string }>
}) {
    const { id_alamat } = await params;
    const alamat = await getAlamatById(id_alamat).catch(() => null);

    if (!alamat) {
        return (
            <div>
                <div className="flex justify-center w-full mt-4">
                    <AlertBox variant="destructive" title="Error 404" description="Request donasi tidak ditemukan" />
                </div>
            </div>
        )
    }

    return (
        <div>
            <UpdateAlamatForm alamat={alamat} />
        </div>

    )
}