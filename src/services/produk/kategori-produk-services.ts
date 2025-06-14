"use server";
import api from "../api";
import { KategoriProduk } from "./schema-kategori-produk";

export async function getAllKategoriProduk(): Promise<KategoriProduk[]> {
  try {
    const res = await api.get<any>("/kategori-produk");

    const rawItems = res.data.data as any[];

    const data: KategoriProduk[] = rawItems.map((item) => ({
      id_kategori: item.id_kategori,
      nama_kategori: item.nama_kategori,
    }));

    return data;
  } catch (error) {
    return [];
  }
}
