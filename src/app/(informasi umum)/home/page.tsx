import HomeNavbar from "@/components/home/home-navbar-with-search";
import { getUser } from "@/services/auth/get-user";
import { cookies } from "next/dist/server/request/cookies";

export default async function homePage() {
  const token = (await cookies()).get("token")?.value || "";

  if (!token) {
    //navbar tanpa profil
    return (
      <div>
        <HomeNavbar />
      </div>
    );
  } else {
    const userData = await getUser(token);
    return (
      <div>
        <HomeNavbar user={userData} />
      </div>
    );
  }
}
