import AlertBox from "@/components/alert-box";
import { Button } from "@/components/ui/button";
import { getUser } from "@/services/auth/user-services";
import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();
    if(user?.data && user.data.role !== "CS") {
        return (
            <div className="p-4 md:p-10 flex justify-center min-h-svh">
                <div className="w-full max-w-md">
                    <AlertBox variant="destructive" title="Error 401" description="Anda tidak berhak mengakses halaman ini" />
                    <div className="flex justify-center mt-4">
                        <Link href="/login">
                            <Button variant="outline" className="w-full max-w-sm">
                                Kembali ke Halaman Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
       children
    );
}