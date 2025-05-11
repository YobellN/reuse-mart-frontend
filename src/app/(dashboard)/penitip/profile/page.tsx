import AlertBox from "@/components/alert-box";
import { SiteHeader } from "@/components/site-header";
import { getUser } from "@/services/auth/user-services";
import Form_Profile from "./form-data";

export default async function Page() {
    
    const res = await getUser();
    const User = res.data;

    if (!User) {
        return (
            <>
                <SiteHeader title="Profile Penitip" />
                <div className="flex justify-center w-full mt-4">
                    <AlertBox variant="destructive" title="Error 404" description="Penitip tidak ditemukan" />
                </div>
            </>
        )
    }
    return (
        <>
            <SiteHeader title="Profil Penitip" />
            <Form_Profile user={User} />
        </>

    )
}