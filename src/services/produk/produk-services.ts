"use server";

import api from "../api";
import { Produk } from "./schema-produk";

type Params = {
  limit?: number | null;
  status_akhir_produk?: string | null;
  kategori?: string | null;
  page?: number;
};
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

export async function getProduk({
  limit,
  page = 1,
  status_akhir_produk,
  kategori,
}: Params = {}): Promise<Paginated<Produk>> {
  try {
    const res = await api.get<any>("/produk", {
      params: { limit, page, status_akhir_produk, kategori },
    });

    const wrapper = res.data.data;
    const rawItems = wrapper.data as any[];

    const data: Produk[] = rawItems.map((item) => ({
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      deskripsi_produk: item.deskripsi_produk,
      harga_produk: item.harga_produk,
      status_akhir_produk: item.status_akhir_produk,
      status_ketersediaan: item.status_ketersediaan,
      status_garansi: item.status_garansi,
      status_produk_hunting: item.status_produk_hunting,
      waktu_garansi: item.waktu_garansi,
      rating: item.rating,
      nama_kategori: item.kategori.nama_kategori,
      id_penitip: item.detail_penitipan.penitipan.penitip.id_penitip,
      nama_penitip: item.detail_penitipan.penitipan.penitip.user.nama,
      tanggal_penitipan: item.detail_penitipan.penitipan.tanggal_penitipan,
      foto_produk: item.foto_produk.map((f: any) => ({
        path_foto: f.path_foto,
      })),
    }));

    const meta: PaginationMeta = {
      current_page: wrapper.current_page,
      last_page: wrapper.last_page,
      per_page: wrapper.per_page,
      total: wrapper.total,
    };

    return { data, meta };
  } catch (error) {
    console.error("getProduk error", error);
    return {
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: limit ?? 0, total: 0 },
    };
  }
}

export async function getProdukById(id_produk: string): Promise<Produk | null> {
  try {
    const res = await api.get<any>(`/produk/${id_produk}`);
    const data = res.data.data;
    const produk: Produk = {
      id_produk: data.id_produk,
      nama_produk: data.nama_produk,
      deskripsi_produk: data.deskripsi_produk,
      harga_produk: data.harga_produk,
      status_akhir_produk: data.status_akhir_produk,
      status_ketersediaan: data.status_ketersediaan,
      status_garansi: data.status_garansi,
      status_produk_hunting: data.status_produk_hunting,
      waktu_garansi: data.waktu_garansi,
      rating: data.rating,
      nama_kategori: data.kategori.nama_kategori,
      id_penitip: data.detail_penitipan.penitipan.penitip.id_penitip,
      nama_penitip: data.detail_penitipan.penitipan.penitip.user.nama,
      tanggal_penitipan: data.detail_penitipan.penitipan.tanggal_penitipan,
      foto_produk: data.foto_produk.map((f: any) => f.path_foto),
    };

    console.log(produk);

    return produk;

  } catch (error) {
    return null;
  }
}


export async function getProdukByPenitip(id_penitip: string) : Promise<Produk[]> {
  try {
    const res = await api.get(`/get-produk-by-penitip/${id_penitip}`);
    
    const data: Produk[] = res.data.data.map((item: any) => ({
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      deskripsi_produk: item.deskripsi_produk,
      harga_produk: item.harga_produk,
      status_akhir_produk: item.status_akhir_produk,
      status_ketersediaan: item.status_ketersediaan,
      status_garansi: item.status_garansi,
      status_produk_hunting: item.status_produk_hunting,
      waktu_garansi: item.waktu_garansi,
      rating: item.rating,
      nama_kategori: item.kategori.nama_kategori,
      id_penitip: item.detail_penitipan.penitipan.penitip.id_penitip,
      nama_penitip: item.detail_penitipan.penitipan.penitip.user.nama,
      tanggal_penitipan: item.detail_penitipan.penitipan.tanggal_penitipan,
      foto_produk: item.foto_produk.map((f: any) => f.path_foto),
    }));

    return data;

  } catch (error) {
    return [];
  }
}

export async function getProdukAll(): Promise<Produk[]> {
  try {
    const res = await api.get<any>("/produk/getAllProduk");

    const wrapper = res.data.data;
    const rawItems = wrapper.data as any[];

    const data: Produk[] = rawItems.map((item) => ({
      id_produk: item.id_produk,
      nama_produk: item.nama_produk,
      deskripsi_produk: item.deskripsi_produk,
      harga_produk: item.harga_produk,
      status_akhir_produk: item.status_akhir_produk,
      status_ketersediaan: item.status_ketersediaan,
      status_garansi: item.status_garansi,
      status_produk_hunting: item.status_produk_hunting,
      waktu_garansi: item.waktu_garansi,
      rating: item.rating,
      nama_kategori: item.kategori.nama_kategori,
      id_penitip: item.detail_penitipan.penitipan.penitip.id_penitip,
      nama_penitip: item.detail_penitipan.penitipan.penitip.user.nama,
      tanggal_penitipan: item.detail_penitipan.penitipan.tanggal_penitipan,
      foto_produk: item.foto_produk.map((f: any) => f.path_foto),
    }));

    return data;
  } catch (error) {
    console.error("getProdukAll error", error);
    return [];
  }
}
