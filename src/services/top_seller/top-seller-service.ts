"use server";

import api from "../api";
import { TopSeller } from "./schema-top-seller";

export async function generateTopSeller(): Promise<{
  data: TopSeller | null;
  message: string;
}> {
  try {
    const res = await api.get("/generate-top-seller");

    return {
      data: res.data?.data ?? null,
      message: res.data?.message ?? "Tidak ada pesan",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      message: "Gagal mengambil data Top Seller.",
    };
  }
}
