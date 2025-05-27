'use server';

import api from "../api";
import { IResponse } from "../utils";
import { DetailKeranjang, KeranjangResponse } from "./schema-detail_keranjang";

// Memasukkan produk ke keranjang
export async function addToKeranjang(id_produk: string): Promise<IResponse<DetailKeranjang>> {
  try {
    const res = await api.post("/detail-keranjang", { id_produk });
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("Keranjang Error", err.response);
    return {
      message: err?.response?.data?.message || "Unknown error",
    };
  }
}

// Mengambil semua produk di keranjang
export async function getKeranjang(): Promise<DetailKeranjang[]> {
  try {
    const res = await api.get("/detail-keranjang");
    return res.data.data;
  } catch (error) {
    console.error("Get Keranjang Error:", error);
    return [];
  }
}

// menghapus produk di keranjang
export async function deleteKeranjang(id_produk: string): Promise<IResponse<DetailKeranjang>> {
  try {
    const res = await api.delete(`/detail-keranjang/${id_produk}`);
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("Delete Keranjang Error:", err.response);
    return {
      message: err?.response?.data?.message || "Unknown error",
    };
  }
}

// mengambil poin pembeli
export async function getPoinPembeli(): Promise<IResponse<number>> {
  try {
    const res = await api.get("/poinPembeli");
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("Get Poin Pembeli Error:", err.response);
    return {
      message: err?.response?.data?.message || "Unknown error",
    };
  }
}


// getTotalHarga
export async function getTotalHarga(formData: FormData): Promise<IResponse<KeranjangResponse>> {
  try {
    const res = await api.post("/getTotalHarga", {
      poinKepakai: formData.get("poinKepakai"),
      metode_pengambilan: formData.get("metode_pengambilan"),
    });
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("Get Total Harga Error:", err.response);
    return {
      message: err?.response?.data?.message || "Unknown error",
    };
  }
}


