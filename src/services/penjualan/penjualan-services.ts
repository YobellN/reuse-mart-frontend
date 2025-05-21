"use server";

import api from "../api";
import { Penjualan } from "./schema-penjualan";

export async function getRiwayatPenjualan({
  status,
  metode_pengiriman,
}: {
  status?: string;
  metode_pengiriman?: "Ambil di gudang" | "Antar Kurir";
} = {}): Promise<Penjualan[]> {
  try {
    const res = await api.get("/gudang/penjualan", {
      params: {
        status_penjualan: status,
        metode_pengiriman: metode_pengiriman,
      },
    });

    return res.data.data;
  } catch (error) {
    return [];
  }
}
