import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function MainFooter() {
  return (
    <footer className="bg-white dark:bg-slate-950 text-sm text-gray-700 dark:text-white border-t border-gray-200 dark:border-slate-600 mt-20">
      <div className="max-w-5/6 mx-auto py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold mb-3">ReUseMart</h3>
          <ul className="space-y-2">
            <li>
              <Link href={"#"} className="hover:text-green-600">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:text-green-600">
                Blog
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:text-green-600">
                Kebijakan Donasi
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:text-green-600">
                Visi & Misi
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Beli</h3>
          <ul className="space-y-2">
            <li>
              {" "}
              <Link href={"#"} className="hover:text-green-600">
                Cari Produk
              </Link>
            </li>
            <li>
              {" "}
              <Link href={"#"} className="hover:text-green-600">
                Cara Checkout
              </Link>
            </li>
            <li>
              {" "}
              <Link href={"#"} className="hover:text-green-600">
                Poin & Merchandise
              </Link>
            </li>
          </ul>

          <h3 className="font-bold mt-5 mb-3">Jual</h3>
          <ul className="space-y-2">
            <li>
              <Link href={"#"} className="hover:text-green-600">
                Cara Checkout
              </Link>
            </li>
            <li>
              <Link href={"#"} className="hover:text-green-600">
                FAQ Penitipan
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Bantuan dan Panduan</h3>
          <ul className="space-y-2">
            <li>
              {" "}
              <Link href={"#"} className="hover:text-green-600">
                Pusat Bantuan
              </Link>
            </li>
            <li>
              {" "}
              <Link href={"#"} className="hover:text-green-600">
                Syarat & Ketentuan
              </Link>
            </li>
            <li>
              {" "}
              <Link href={"#"} className="hover:text-green-600">
                Kebijakan Privasi
              </Link>
            </li>
          </ul>

          <h3 className="font-bold mt-5 mb-3">Download ReuseMart</h3>
          <div className="flex gap-2 items-center">
            <Link
              href="https://play.google.com/store/apps/details?id=..."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/images/generic/id_badge_web_generic.png"
                alt="Dapatkan di Google Play"
                width={130}
                height={40}
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <Image
            src="/Reuse-mart.png"
            alt="ReuseMart Logo"
            className="w-60 h-auto"
            width={100}
            height={100}
          />
        </div>
      </div>
      <Separator className="border-gray-200 dark:border-[--border]" />
      <div className="flex max-w-5/6 mx-auto py-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          &copy; 2025 ReUseMart, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
