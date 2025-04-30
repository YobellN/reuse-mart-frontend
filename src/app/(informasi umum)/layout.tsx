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
  //NOTE: Ini di comment karna halaman bisa diakses oleh guest. Kalo ada pengecekan kondisi, taru di halaman anak
  // const token = (await cookies()).get("token")?.value || "";

  // if (!token) {
  //   return (
  //     <div className="p-4 md:p-10 flex justify-center min-h-svh">
  //       <div className="w-full max-w-md">
  //         <AlertBox
  //           variant="destructive"
  //           title="Error 401"
  //           description="Sesi anda telah habis, silahkan login kembali"
  //         />
  //         <div className="flex justify-center mt-4">
  //           <Link href="/login">
  //             <Button variant="outline" className="w-full max-w-sm">
  //               Kembali ke Halaman Login
  //             </Button>
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
