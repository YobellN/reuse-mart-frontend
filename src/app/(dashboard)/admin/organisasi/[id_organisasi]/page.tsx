import AlertBox from "@/components/alert-box";
import UpdateOrganisasiForm from "@/components/organisasi/update-Organisasi-form";
import { SiteHeader } from "@/components/site-header";
import { getOrganisasiById } from "@/services/organisasi/organisasi-services";

export default async function Page({ params }: {
    params: Promise<{ id_organisasi: string }>
}) {
    const { id_organisasi } = await params;
    const organisasi = await getOrganisasiById(id_organisasi).catch(() => null);

    if (!organisasi) {
        return (
            <>
                <SiteHeader title="organisasi" />
                <div className="flex justify-center w-full mt-4">
                    <AlertBox variant="destructive" title="Error 404" description="organisasi tidak ditemukan" />
                </div>
            </>
        )
    }
    return (
        <>
            <SiteHeader title={"Edit organisasi " + organisasi.id_organisasi + " (" + organisasi.user.nama + ")" }  />
            <UpdateOrganisasiForm Organisasi={organisasi} />
        </>

    )
}