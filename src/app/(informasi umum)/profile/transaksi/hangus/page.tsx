"use server";

import { getRiwayatPenjualanPembeli } from "@/services/penjualan/penjualan-services";
import TransaksiCard from "@/components/profile/transaction-card";

export default async function Page() {
  const transaksi = await getRiwayatPenjualanPembeli({
    status: "Hangus",
  });
  if (transaksi.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Tidak ada transaksi</h1>
      </div>
    );
  } else {
    return (
      <div className="space-y-6">
        {transaksi.map((trx) => (
          <TransaksiCard key={trx.id_penjualan} {...trx} />
        ))}
      </div>
    );
  }
}