import { notFound } from "next/navigation";
import { getUser } from "@/services/auth/user-services";
import HomeNavbar from "@/components/home/home-navbar-with-search";

export default async function HomePage() {
  const user = await getUser();

  if (!user?.data || user.data.role !== "Pembeli") {
    notFound();
  }

  return (
    <div>
      <HomeNavbar user={user} />
    </div>
  );
}
