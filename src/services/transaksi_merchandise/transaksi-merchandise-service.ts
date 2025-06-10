"use server";

import api from "../api";
import { IResponse } from "../utils";
// import { IResponse } from "../utils";
import { TransaksiMerchandise } from "./schema-transaksi-merchandise";

export async function getAllTransaksiMerchandise(): Promise<
  TransaksiMerchandise[]
> {
  const res = await api.get("/daftar-klaim-merchandise-all");

  if (!res.data) {
    throw new Error("Failed to fetch transaksi merchandise");
  }

  const transaksi: TransaksiMerchandise[] = res.data.data;
  return [...transaksi];
}

export async function getTransaksiMerchandise(): Promise<
  TransaksiMerchandise[]
> {
  const res = await api.get("/daftar-klaim-merchandise");

  if (!res.data) {
    throw new Error("Failed to fetch transaksi merchandise");
  }

  const transaksi: TransaksiMerchandise[] = res.data.data;
  return [...transaksi];
}

export async function handleKlaimMerchandise(
  id_transaksi: number
): Promise<IResponse<any>> {
  try {
    const res = await api.patch(
      `/konfirmasi-klaim-merchandise/${id_transaksi}`
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
