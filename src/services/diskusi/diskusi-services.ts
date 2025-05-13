'use server';

import api from "../api";
import { IResponse } from "../utils";
import { Diskusi } from "./schema-diskusi";

export async function handleNewDiskusi(formData: FormData): Promise<IResponse<Diskusi>> {
  try {
    // formData.append("_method", "POST");
    const res = await api.post("/diskusi", formData);
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("Diskusi Error", err);
    if (err.response?.data?.errors) {
      return {
        message: err.response.data.message,
        errors: err.response.data.errors,
      };
    }
    return {
      message: err?.message || "Unknown error",
    };
  }
}


export async function getDiskusiById(id_produk: string): Promise<IResponse<Diskusi> | null> {
  try {
    // Aku gatau kenapa, tapi id_produk itu jadi object pas ku passing
    const actualId = typeof id_produk === 'object' && id_produk !== null && 'id_produk' in id_produk
      ? (id_produk as { id_produk: string }).id_produk
      : id_produk;

    const res = await api.get(`diskusi/getDiskusiProduk/${actualId}`);
    return res.data.data;
  } catch (err: any) {
    console.error("API Error:", err);
    return null;
  }
}
