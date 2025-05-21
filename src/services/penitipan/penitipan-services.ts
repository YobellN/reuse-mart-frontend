"use server";

import api from "../api";
import { IResponse } from "../utils";
import { Penitipan } from "./schema-penitipan";
import { DetailProdukTitipan } from "./schema-penitipan";

export async function getProdukTitipanPenitip(
  status_produk?: string
): Promise<DetailProdukTitipan[]> {
  try {
    const res = await api.get("/penitip/penitipan/produk-titipan", {
      params: {
        status_produk,
      },
    });

    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function getProdukTitipanGudang(
  status_produk?: string
): Promise<DetailProdukTitipan[]> {
  try {
    const res = await api.get("/gudang/penitipan/produk-titipan", {
      params: {
        status_produk,
      },
    });

    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function konfirmasiPerpanjangan(
  id_produk: string
): Promise<IResponse<any>> {
  try {
    const res = await api.patch(
      `/penitipan/konfirmasi-perpanjangan/${id_produk}`
    );
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    if (error.response?.data) {
      return {
        message: error.response.data.message,
        errors: error.response.data.errors,
      };
    } else {
      return {
        message: "Terjadi kesalahan",
      };
    }
  }
}

export async function konfirmasiPengambilan(
  id_produk: string
): Promise<IResponse<any>> {
  try {
    const res = await api.patch(
      `/penitipan/konfirmasi-pengambilan/${id_produk}`
    );
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    if (error.response?.data) {
      return {
        message: error.response.data.message,
        errors: error.response.data.errors,
      };
    } else {
      return {
        message: "Terjadi kesalahan",
      };
    }
  }
}

export async function getAllDataPenitipan(): Promise<Penitipan[]> {
  try {
    const res = await api.get("/penitipan/all");

    if (!res.data) {
      throw new Error("Failed to fetch penitipan");
    }

    const penitipan: Penitipan[] = res.data.data.map((item: any) => {
      return {
        id_penitipan: item.id_penitipan,
        id_penitip: item.id_penitip,
        id_qc: item.id_qc,
        id_hunter: item.id_hunter,
        tanggal_penitipan: item.tanggal_penitipan,
        tenggat_penitipan: item.tenggat_penitipan,
        tenggat_pengambilan: item.tenggat_pengambilan,
        status_perpanjangan: item.status_perpanjangan,
        nama_penitip: item.penitip?.user?.nama ?? "-",
        nama_qc: item.qc?.user?.nama ?? "-",
        nama_hunter: item.hunter?.user?.nama ?? null,
        produk_titipan:
          item.detail_penitipan?.map((detail: any) => ({
            id_produk: detail.id_produk,
            tanggal_pengambilan: detail.tanggal_pengambilan,
            konfirmasi_donasi: detail.konfirmasi_donasi,
            nama_produk: detail.produk?.nama_produk,
            kategori: detail.produk?.kategori.nama_kategori,
            deskripsi_produk: detail.produk?.deskripsi_produk,
            harga_produk: detail.produk?.harga_produk,
            status_akhir_produk: detail.produk?.status_akhir_produk ?? null,
            waktu_garansi: detail.produk?.waktu_garansi ?? null,
            status_produk_hunting: detail.produk?.status_produk_hunting ? 1 : 0,
            rating: detail.produk?.rating ?? null,
          })) ?? [],
      };
    });
    return penitipan;
  } catch (error) {
    return [];
  }
}

export async function getDetailPenitipanById(
  id_penitipan: string
): Promise<Penitipan | null> {
  try {
    const res = await api.get(`/penitipan/detail/${id_penitipan}`);

    if (!res.data) {
      throw new Error("Failed to fetch detail penitipan");
    }

    const item = res.data.data;

    const penitipan: Penitipan = {
      id_penitipan: item.id_penitipan,
      id_penitip: item.id_penitip,
      id_qc: item.id_qc,
      id_hunter: item.id_hunter,
      tanggal_penitipan: item.tanggal_penitipan,
      tenggat_penitipan: item.tenggat_penitipan,
      tenggat_pengambilan: item.tenggat_pengambilan,
      status_perpanjangan: item.status_perpanjangan,
      nama_penitip: item.penitip?.user?.nama ?? "-",
      nama_qc: item.qc?.user?.nama ?? "-",
      nama_hunter: item.hunter?.user?.nama ?? null,
      produk_titipan:
        item.detail_penitipan?.map((detail: any) => ({
          id_produk: detail.id_produk,
          tanggal_pengambilan: detail.tanggal_pengambilan,
          konfirmasi_donasi: detail.konfirmasi_donasi,
          nama_produk: detail.produk?.nama_produk,
          kategori: detail.produk?.kategori.nama_kategori,
          deskripsi_produk: detail.produk?.deskripsi_produk,
          harga_produk: detail.produk?.harga_produk,
          status_akhir_produk: detail.produk?.status_akhir_produk ?? null,
          waktu_garansi: detail.produk?.waktu_garansi ?? null,
          status_produk_hunting: detail.produk?.status_produk_hunting ? 1 : 0,
          rating: detail.produk?.rating ?? null,
        })) ?? [],
    };
    console.log(penitipan);
    return penitipan;
  } catch (error) {
    return null;
  }
}
export async function pengambilanProdukTitipan(
  id_produk: string
): Promise<IResponse<any>> {
  try {
    const res = await api.patch(
      `/penitipan/pengambilan-produk-titipan/${id_produk}`
    );
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    if (error.response?.data) {
      return {
        message: error.response.data.message,
        errors: error.response.data.errors,
      };
    } else {
      return {
        message: "Terjadi kesalahan",
      };
    }
  }
}
