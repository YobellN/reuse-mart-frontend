import { getUser } from "@/services/auth/get-user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const token = (await cookies()).get("token")?.value || "";
    const user = await getUser(token);
    if (user.data?.role === "Admin") {
        redirect("/admin");
    } else if (user.data?.role === "CS") {
        redirect("/cs");
    } else {
        return null;
    }
}