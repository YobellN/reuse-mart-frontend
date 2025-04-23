import axiosInstance from "@/services/axios-instance";
import AlertBox from "@/components/alert-box";
import { SiteHeader } from "@/components/site-header";
import UpdatePenitipForm from "@/components/penitip/update-penitip-form";
import { Penitip } from "@/services/penitip/schema";

async function getPenitip(id_penitip: string): Promise<Penitip | null> {
    try {
        const res = await axiosInstance.get(`/penitip/${id_penitip}`);
        return res.data.data
    } catch (error) {
        return null;
    }
}

export default async function Page({ params }: {
    params: Promise<{ id_penitip: string }>
}) {
    const { id_penitip } = await params;
    const penitip = await getPenitip(id_penitip).catch(() => null);

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
            <SiteHeader title={"Update Penitip " + penitip.id_penitip + " (" + penitip.user.nama + ")" }  />
            <UpdatePenitipForm penitip={penitip} />
        </>

    )
}