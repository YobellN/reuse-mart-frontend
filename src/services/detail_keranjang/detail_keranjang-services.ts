'use server';

import api from "../api";
import { IResponse } from "../utils";
import { DetailKeranjang } from "./schema-detail_keranjang";

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