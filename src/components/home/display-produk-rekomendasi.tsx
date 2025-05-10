'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/product/product-card';
import { getProduk, Paginated } from '@/services/produk/produk-services';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Produk } from '@/services/produk/schema-produk';
import Link from 'next/link';

export default function DisplayProdukRekomendasi() {
  const [items, setItems] = useState<Produk[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadPage(1);
  }, []);

  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());

  async function loadPage(p: number) {
    if (loadedPages.has(p)) return;

    setLoading(true);
    try {
      const { data, meta }: Paginated<Produk> = await getProduk({ limit: 6, page: p });
      setItems(prev => (p === 1 ? data : [...prev, ...data]));
      setPage(meta.current_page);
      setLastPage(meta.last_page);
      setLoadedPages(prev => new Set(prev).add(p));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-6 bg-white rounded-2xl p-3 lg:p-6 border border-gray-200 dark:bg-slate-950 dark:border-slate-600">
      <div className="mb-6 font-semibold text-xl">
        <h2>REKOMENDASI PRODUK</h2>
        <div className="w-64 my-1">
          <Separator className="border-3 border-green-500 rounded-full" />
        </div>
      </div>

      <div className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {items.map(item => (
          <Link href={`/produk/${item.id_produk}`} key={item.id_produk}>
            <ProductCard key={item.id_produk} {...item} />
          </Link>
        ))}

        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} className="space-y-2 animate-pulse">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          ))}

        {!loading && items.length === 0 && (
          <p className="col-span-6 text-center">Tidak ada produk</p>
        )}
      </div>

      {page < lastPage && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            onClick={() => loadPage(page + 1)}
            disabled={loading}
          >
            {loading ? 'Memuat...' : 'Muat Lebih Banyak'}
          </button>
        </div>
      )}
    </div>
  );
}
