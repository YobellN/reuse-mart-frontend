import AlertBox from "@/components/alert-box";
import { SiteHeader } from "@/components/site-header";
import UpdatePenitipForm from "@/components/penitip/update-penitip-form";
import { getPenitipById } from "@/services/penitip/penitip-services";


export default async function Page({ params }: {
    params: Promise<{ id_penitip: string }>
}) {
    const { id_penitip } = await params;
    const penitip = await getPenitipById(id_penitip).catch(() => null);

    if (!penitip) {
        return (
            <>
                <SiteHeader title="Penitip" />
                <div className="flex justify-center w-full mt-4">
                    <AlertBox variant="destructive" title="Error 404" description="Penitip tidak ditemukan" />
                </div>
            </>
        )
    }
    return (
        <>
            <SiteHeader title={"Edit Penitip " + penitip.id_penitip + " (" + penitip.user.nama + ")" }  />
            <UpdatePenitipForm penitip={penitip} />
        </>

    )
}