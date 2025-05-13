'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from "@/components/product/product-card";
import { getProduk } from "@/services/produk/produk-services";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Produk } from '@/services/produk/schema-produk';
import Link from 'next/link';

export default function DisplayProdukTerbaru() {
  const [items, setItems] = useState<Produk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProduk() {
      try {
        const { data } = await getProduk({ limit: 6 });
        const sorted = data
          .slice()
          .sort((a, b) => new Date(b.tanggal_penitipan).getTime() - new Date(a.tanggal_penitipan).getTime());
        setItems(sorted);
      } finally {
        setLoading(false);
      }
    }
    fetchProduk();
  }, []);

  return (
    <div className="my-6 bg-white rounded-2xl p-3 lg:p-6 border border-gray-200 dark:bg-slate-950 dark:border-slate-600">
      <div className="mb-6 font-semibold text-xl">
        <h2>PRODUK TERBARU</h2>
        <div className="w-64 my-1">
          <Separator className="border-3 border-green-500 rounded-full" />
        </div>
      </div>
      <div className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2 animate-pulse">
                <Skeleton className="h-48 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            ))
          : items.length > 0
          ? items.map(item => (
            <Link href={`/produk/${item.id_produk}`} key={item.id_produk}>
              <ProductCard key={item.id_produk} {...item} />
            </Link>
          ))
          : !loading && <p className="col-span-6 text-center">Tidak ada produk</p>}
      </div>
    </div>
  );
}
