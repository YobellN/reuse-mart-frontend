import AlertBox from "@/components/alert-box";
import HomeNavbar from "@/components/home/home-navbar-with-search";
import { Button } from "@/components/ui/button";
import { getUser } from "@/services/auth/user-services";
import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
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
      <div className="font-[family-name:var(--font-plus-jakarta-sans)]">
        <HomeNavbar />
        <section>{children}</section>
      </div>
    );
  } else {
    const user = await getUser();
    if (user?.data && user.data.role !== "Pembeli") {
      notFound();
    }
    return (
      <div className="font-[family-name:var(--font-plus-jakarta-sans)]">
        <HomeNavbar user={user} />
        <section>{children}</section>
      </div>
    );
  }
}
