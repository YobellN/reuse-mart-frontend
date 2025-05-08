import NewRequestDonasiForm from "@/components/organisasi/new-request-donasi-form";
import { SiteHeader } from "@/components/site-header";

export default function Page() {
    return (
        <>
            <SiteHeader title="Tambah Request Donasi" />
            <br />
            <NewRequestDonasiForm />
        </>
    )
}