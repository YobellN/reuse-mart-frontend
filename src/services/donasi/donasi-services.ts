"use server";

import api from "../api";
import { DonasiLaporanSchema, DonasiRequestLaporanSchema } from "./schema-donasi";
export async function getDonasiPerTahun(tahun: number): Promise<DonasiLaporanSchema[]> {
  try {
    const res = await api.get(`/donasiPerTahun/${tahun}`);
    return res.data.data;
  } catch (error) {
    return [];
  }
}
export async function getRekapRequest(): Promise<DonasiRequestLaporanSchema[]> {
  try {
    const res = await api.get(`/getRekapRequest`);
    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function tahunTerlamaDonasi(): Promise<number> {
  try {
    const res = await api.get("/tahunTerlamaDonasi");
    return res.data.tahun;
  } catch (error) {
    return 2025; // Default fallback year
  }
}
