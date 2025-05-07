import HomeNavbar from "@/components/home/home-navbar-with-search";
import MainFooter from "@/components/home/main-footer";
import { getUser } from "@/services/auth/user-services";
import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Informasi Umum",
};

const fontPlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default async function InformasiUmumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value || "";
  if (!token) {
    return (
      <div className={`${fontPlusJakartaSans.className} w-full`}>
        <HomeNavbar />
        <section className="p-2 md:p-0 md:w-5/6 m-auto">{children}</section>
        <MainFooter />
      </div>
    );
  } else {
    const user = await getUser();
    if (user?.data && user.data.role !== "Pembeli") {
      notFound();
    }
    return (
      <div className="w-full font-[family-name:var(--font-plus-jakarta-sans)]">
        <HomeNavbar user={user} />
        <section className="p-2 md:p-0 md:w-5/6 m-auto">{children}</section>
        <MainFooter />
      </div>
    );
  }
}
