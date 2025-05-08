'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from "@/components/product/product-card";
import { getProdukByPenitip } from "@/services/produk/produk-services";
import { Produk } from "@/services/produk/schema-produk";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from 'next/link';


export default function DisplayProdukPenitip({ id_penitip }: { id_penitip: string }) {
  const [items, setItems] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProdukByPenitip(id_penitip).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [id_penitip]);

  return (
    <div className="mt-8 my-6 bg-white p-3 lg:p-6 dark:bg-slate-950 dark:border-slate-600">
      <div className="mb-6 font-semibold text-xl">
        <h2>PRODUK LAINNYA DARI PENITIP</h2>
        <div className="w-64 my-1">
          <Separator className="border-3 border-green-500 rounded-full" />
        </div>
      </div>

      <div className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-48 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
          ))
          : items.map((p) => (
            <Link  href={`/produk/${p.id_produk}`} key={p.id_produk}>
              <ProductCard {...p} />
            </Link>
          ))}
      </div>
    </div>
  );
}
