import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Produk } from "@/services/produk/schema-produk";
import React from "react";
import ProductImage from "./product-image";
import { Banknote, Album } from "lucide-react";

export default function DisplayProductCard(produk: Produk) {
  return (
    <Card
      className="p-0 pb-2 w-full rounded-lg shadow-none bg-white gap-1
    hover:shadow-md hover:border-2 hover:border-green-500 transition-all duration-300 ease-in-out
    dark:bg-slate-800 dark:border-slate-600 dark:hover:border-green-500 dark:hover:bg-slate-900"
    >
      <CardHeader className="w-full h-40 relative">
        <ProductImage
          filename={produk.foto_produk?.[0].path_foto as string}
          style={{ objectFit: "cover" }}
          className="rounded-t-lg drop-shadow-sm "
        />
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground dark:text-white px-2 py-0">
        <p className="my-1 font-semibold">
          {produk.nama_produk.length > 28
            ? produk.nama_produk.slice(0, 28) + "..."
            : produk.nama_produk}
        </p>

        <p className="mt-2 mb-0 font-extrabold text-[16px] flex items-center gap-1 text-green-600">
          Rp{produk.harga_produk.toLocaleString("id-ID")}
        </p>

        <p className="mt-2 mb-0 text-slate-500 flex items-center gap-1 text-xs">
          <Album className="w-4 h-4 text-green-600" />
          {produk.nama_kategori.length > 18
            ? produk.nama_kategori.slice(0, 15) + "..."
            : produk.nama_kategori}
          {/* {produk.nama_kategori} */}
        </p>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground dark:text-white px-1 py-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#00be16"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-badge-check-icon lucide-badge-check dark:stroke-slate-800 me-[4px]"
        >
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <p className="m-0 font-medium text-xs text-slate-500">
          {produk.nama_penitip.length > 20
            ? produk.nama_penitip.slice(0, 15) + "..."
            : produk.nama_penitip}
        </p>
      </CardFooter>
    </Card>
  );
}
