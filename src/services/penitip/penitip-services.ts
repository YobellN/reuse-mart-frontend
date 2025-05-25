"use server";

import api from "../api";
import { IResponse } from "../utils";
import { Penitip } from "./schema-penitip";

export async function getAllPenitip(): Promise<Penitip[]> {
  try {
    const res = await api.get("/cs/penitip");
    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function getPenitipById(
  id_penitip: string
): Promise<Penitip | null> {
  try {
    const res = await api.get(`/cs/penitip/${id_penitip}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
}

export async function handleNewPenitip(
  formData: FormData
): Promise<IResponse<Penitip>> {
  try {
    const res = await api.post("/cs/penitip", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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

export default async function handleUpdatePenitip(
  formData: FormData,
  id_penitip: string
): Promise<IResponse<Penitip>> {
  try {
    formData.append("_method", "PUT");

    const res = await api.post(`/cs/penitip/${id_penitip}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

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

export async function handleDeletePenitip(id: string): Promise<IResponse<any>> {
  try {
    const res = await api.delete(`/cs/penitip/${id}`);
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

export async function getNikPenitip(): Promise<string | null> {
  try {
    const res = await api.get(`penitip/getNikPenitip`);
    console.log(res.data.data.nik);
    return res.data.data.nik;
  } catch (error) {
    return null;
  }
}
