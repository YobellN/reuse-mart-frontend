import FooterLanding from "@/components/landing-page/footer/footer-landing";
import NavbarLandingPage from "@/components/landing-page/navbar/navbar-landing";
import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Informasi Umum",
};

const fontPlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default function InformasiUmumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fontPlusJakartaSans.className} w-full`}>
      {/* <section className="p-2 md:p-0 md:w-5/6 m-auto">{children}</section> */}
      <NavbarLandingPage />
      <section>{children}</section>
      <FooterLanding />
    </div>
  );
}
