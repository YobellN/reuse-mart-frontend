"use client";
import ProductCarousel from "./product-carousel";
import { ShoppingCart } from "lucide-react";

type ProductDetailProps = {
  id: string;
};

export default function ProductDetail({ id }: ProductDetailProps) {
  const mockProduct = {
    name: "Kompor Tanam 3 Tungku",
    price: 2000000,
    stock: 1,
    category: "Peralatan Dapur",
    description: "Kompor tanam 3 tungku dengan api besar dan hemat gas.",
    warrantyUntil: "2025-07-01",
    images: ["/kompor1.jpg", "/kompor2.jpg", "/kompor3.jpg"],
    rating: 4.5,
    totalSold: 23,
  };

  return (
    <div className="max-w-full mx-auto p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/*FOTO PRODUK */}
        <div>
          <ProductCarousel images={mockProduct.images} />
        </div>

        {/* INFORMASI PRODUK */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{mockProduct.name}</h1>
          <p className="text-2xl text-green-600 font-bold bg-slate-50 p-2">
            Rp{mockProduct.price.toLocaleString("id-ID")}
          </p>

          <div className="grid grid-cols-[1fr_3fr] gap-y-4 text-sm text-gray-600">
            <p className="font-semibold">Kategori</p>
            <p>{mockProduct.category}</p>

            <p className="font-semibold">Stok</p>
            <p>{mockProduct.stock} pcs</p>

            <p className="font-semibold">Status Garansi</p>
            <p className="">Produk dengan garansi</p>

            <p className="font-semibold">Garansi hingga</p>
            <p className="">{mockProduct.warrantyUntil}</p>
          </div>

          <hr />
          <p className="font-semibold text-md">Deskripsi Produk:</p>
          <p className="text-gray-800 text-sm mb-6">
            {mockProduct.description}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-3 rounded-sm text-md hover:bg-green-50">
          <ShoppingCart className="w-5 h-5" />
          Masukkan Keranjang
        </button>

        <button className="bg-green-600 text-white px-4 py-3 rounded-sm text-md hover:bg-green-700">
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}
