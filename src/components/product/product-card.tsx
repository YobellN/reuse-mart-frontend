import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function DisplayProductCard() {
  return (
    <Card
      className="p-0 pb-2 w-full rounded-lg shadow-none bg-white gap-2
    hover:shadow-md hover:border-2 hover:border-green-500 transition-all duration-300 ease-in-out"
    >
      <CardHeader className="w-full h-50 relative">
        <Image
          src="/kategori/pakaian.png"
          alt="Reuse Mart Banner"
          fill
          className="object-cover rounded-t-lg"
        />
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground px-2 py-0">
        <p className="my-1 font-semibold">Nama Produk Disini</p>
        <p className="my-1 font-extrabold">Rp100.000</p>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground px-2 py-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#00be16"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-badge-check-icon lucide-badge-check"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <p className="my-1 font-semibold">Nama Penjual Maybe</p>
      </CardFooter>
    </Card>
  );
}
