"use server";

import api from "../api";
import { IResponse } from "../utils";
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

export async function getRiwayatPenjualanPembeli({
  status,
  metode_pengiriman,
}: {
  status?: string;
  metode_pengiriman?: "Ambil di gudang" | "Antar Kurir";
} = {}): Promise<Penjualan[]> {
  try {
    const res = await api.get("/penjualan", {
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


// Membuat penjualan baru
// input:
// 'metode_pengiriman' => 'required|in:Ambil di gudang,Antar Kurir',
//   'jadwal_pengambilan' => 'nullable|date',
//     'poin_potongan' => 'nullable|integer|min:0',
export async function createPenjualan({
  metode_pengiriman,
  jadwal_pengambilan,
  poin_potongan,
  id_alamat,
}: {
  metode_pengiriman: "Ambil di gudang" | "Antar Kurir";
  jadwal_pengambilan?: string;
  poin_potongan?: number;
  id_alamat?: number;
}): Promise<IResponse<Penjualan>> {
  try {
    const res = await api.post("/penjualan", {
      metode_pengiriman,
      jadwal_pengambilan,
      poin_potongan,
      id_alamat,
    });

    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      message: err?.response?.data?.message || "Unknown error",
    };
  }
}