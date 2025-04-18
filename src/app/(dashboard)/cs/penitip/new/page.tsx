import NewPenitipForm from "@/components/penitip/new-penitip-form";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
    return (
        <>
            <SiteHeader title="Tambah Penitip" />
            <br />
            <NewPenitipForm />
        </>
    )
}