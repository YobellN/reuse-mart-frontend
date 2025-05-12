'use server'

import api from "../api";
import { IResponse } from "../utils";
import { ProdukTitipan } from "./schema-penitipan";

export async function getProdukTitipanPenitip(status_produk?: string): Promise<ProdukTitipan[]> {
  try {
    const res = await api.get("/penitip/penitipan/produk-titipan", {
      params: {
        status_produk
      }
    });

    const data : ProdukTitipan[] = res.data.data.map((item: any) => ({
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
      kategori: item.kategori.nama_kategori,
      foto_produk: item.foto_produk[0].path_foto,
      id_penitipan: item.detail_penitipan.id_penitipan,
      tanggal_penitipan: item.detail_penitipan.penitipan.tanggal_penitipan,
      tenggat_penitipan: item.detail_penitipan.penitipan.tenggat_penitipan,
      tenggat_pengambilan: item.detail_penitipan.penitipan.tenggat_pengambilan,
      status_perpanjangan: item.detail_penitipan.penitipan.status_perpanjangan,
      tanggal_pengambilan: item.detail_penitipan.tanggal_pengambilan
    }));

    return data;   
  } catch (error) {
    return [];
  }
}

export async function konfirmasiPerpanjangan(id_produk: string): Promise<IResponse<any>> {
  try {
    const res = await api.patch(`/penitipan/konfirmasi-perpanjangan/${id_produk}`);
    return {
      message: res.data.message,
      data: res.data.data
    }
  } catch (error: any) {
    if(error.response?.data) {
      return {
          message: error.response.data.message,
          errors: error.response.data.errors
      }
    } else {
      return {
          message: "Terjadi kesalahan" 
      }
    }
  }
}

export async function konfirmasiPengambilan(id_produk: string): Promise<IResponse<any>> {
  try {
    const res = await api.patch(`/penitipan/konfirmasi-pengambilan/${id_produk}`);
    return {
      message: res.data.message,
      data: res.data.data
    }
  } catch (error: any) {
    if(error.response?.data) {
      return {
          message: error.response.data.message,
          errors: error.response.data.errors
      }
    } else {
      return {
          message: "Terjadi kesalahan" 
      }
    }
  }
}