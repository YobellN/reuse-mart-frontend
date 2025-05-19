"use server";

import api from "../api";
import { IResponse } from "../utils";
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
