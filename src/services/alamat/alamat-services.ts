'use server';

import api from "../api";
import { IResponse } from "../utils";
import { Alamat } from "./schema-alamat";

export async function handleNewAlamat(formData: FormData): Promise<IResponse<Alamat>> {
  try {
    const res = await api.post("/alamat", formData);
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
};

export async function getAlamatById(id_alamat: string): Promise<Alamat | null> {
  try {
    const res = await api.get(`/alamat/${id_alamat}`);
    return res.data.data;
  } catch (err: any) {
    return null;
  }
};

export async function handleUpdateAlamat(formData: FormData, id_alamat: string): Promise<IResponse<Alamat>> {
  try {
    formData.append("_method", "PUT");
    const res = await api.post(`/alamat/${id_alamat}`, formData, {
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
};

export async function handleDeleteAlamat(id_alamat: string): Promise<IResponse<any>> {
  try {
    const res = await api.delete(`/alamat/${id_alamat}`);
    return {
      message: res.data.message,
    }
  } catch (error: any) {
    if (error.response?.data) {
      return {
        message: error.response.data.message,
        errors: error.response.data.errors
      }
    }
    return {
      message: "Terjadi kesalahan"
    }
  }
};

export async function handleAlamatUtamaById(id_alamat: string): Promise<IResponse<any>> {
  try {
    const res = await api.post(`/alamat/gantiAlamatUtama/${id_alamat}`);
    return {
      message: res.data.message,
    }
  } catch (error: any) {
    if (error.response?.data) {
      return {
        message: error.response.data.message,
        errors: error.response.data.errors
      }
    }
    return {
      message: "Terjadi kesalahan"
    }
  }
}