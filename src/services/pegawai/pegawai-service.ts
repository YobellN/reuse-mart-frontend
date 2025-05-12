<<<<<<< HEAD
"use server";
=======
'use server'
>>>>>>> master

import api from "../api";
import { IResponse } from "../utils";
import { Pegawai, PegawaiPayload } from "./schema-pegawai";

export async function getAllPegawai(): Promise<Pegawai[]> {
  const res = await api.get("/pegawai");

  if (!res.data) {
    throw new Error("Failed to fetch pegawai");
  }

  const pegawai: Pegawai[] = res.data.data;
  return [...pegawai];
}

export async function getPegawaiById(
  id_pegawai: string
): Promise<Pegawai | null> {
  try {
    const res = await api.get(`/pegawai/${id_pegawai}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

export async function handleNewPegawai(
  data: PegawaiPayload
): Promise<IResponse<Pegawai>> {
  try {
    const res = await api.post("/pegawai", data);
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    console.error("AXIOS ERROR:", err.response?.data || err.message);
    if (err.response?.data?.errors) {
      return {
        message: err.response.data.message,
        errors: err.response.data.errors,
      };
    }
    return {
      message: "Terjadi kesalahan",
    };
  }
}

export async function handleUpdatePegawai(
  data: PegawaiPayload,
  id_pegawai: string
): Promise<IResponse<Pegawai>> {
  try {
    const res = await api.put(`/pegawai/${id_pegawai}`, data);
    return {
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    if (err.response?.data?.errors) {
      return {
        message: err.response.data.message,
        errors: err.response.data.errors,
      };
    }
    return {
      message: "Terjadi kesalahan",
    };
  }
}

export async function handleDeletePegawai(
  id_pegawai: string
): Promise<IResponse<any>> {
  try {
    const res = await api.delete(`/pegawai/${id_pegawai}`);
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
