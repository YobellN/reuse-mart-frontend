"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const kategoriProduk = [
  { name: "Elektronik & Gadget", icon: "/kategori/elektronik.png" },
  { name: "Pakaian & Aksesori", icon: "/kategori/pakaian.png" },
  { name: "Perabotan Rumah Tangga", icon: "/kategori/rumah-tangga.png" },
  {
    name: "Buku, Alat Tulis, & Peralatan Sekolah",
    icon: "/kategori/alat-sekolah.png",
  },
  { name: "Hobi, Mainan, & Koleksi", icon: "/kategori/hobi.png" },
  { name: "Perlengkapan Bayi & Anak", icon: "/kategori/bayi.png" },
  { name: "Otomotif & Aksesori", icon: "/kategori/otomotif.png" },
  { name: "Perlengkapan Taman & Outdoor", icon: "/kategori/kebun.png" },
  { name: "Peralatan Kantor & Industri", icon: "/kategori/kantor.png" },
  { name: "Kosmetik & Perawatan Diri", icon: "/kategori/make-up.png" },
];

export default function KategoriGrid() {
  return (
    <div className="my-6 bg-white dark:bg-slate-950 rounded-2xl p-3 lg:p-6 border border-gray-200 dark:border-slate-600">
      <div className="mb-6 font-semibold text-xl">
        <h2>KATEGORI PRODUK</h2>
        <div className="w-64 my-1">
          <Separator className="border-3 border-green-500 rounded-full" />
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto scroll-smooth 2xl:justify-evenly 2xl:overflow-x-hidden">
        {kategoriProduk.map((kategori) => (
          <div
            key={kategori.name}
            className="shrink-0 max-w-[102px] flex justify-center snap-start mb-2"
          >
            <Card
              className="w-full h-40 flex flex-col items-center justify-center hover:shadow-md hover:border-2 hover:border-green-500 cursor-pointer transition-all duration-300 ease-in-out py-0 rounded-lg bg-white 
            dark:bg-slate-800 dark:border-slate-600 dark:hover:border-green-500 dark:hover:bg-slate-900"
            >
              <CardContent className="flex flex-col items-center align-top pt-2 h-full">
                <div className="w-23 h-23 relative mb-2 flex items-center justify-center">
                  <Image
                    src={kategori.icon}
                    alt={kategori.name}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>

                <div className="h-[36px] flex items-center justify-center text-center">
                  <p className="text-xs sm:text-sm font-medium leading-tight line-clamp-2">
                    {kategori.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
