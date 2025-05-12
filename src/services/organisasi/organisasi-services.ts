'use server';

import api from "../api";
import { Produk } from "../produk/schema-produk";
import { IResponse } from "../utils";
import { RequestDonasi, Organisasi, DropdownProduk, Donasi } from "./schema-organisasi";

export async function getAllRequestDonasi(): Promise<RequestDonasi[]> {
  try {
    const res = await api.get("/request-donasi");
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export async function getOrganisasiById(id_organisasi: string): Promise<Organisasi | null> {
  try {
    const res = await api.get(`/organisasi/${id_organisasi}`);
    return res.data.data
  } catch (error) {
    return null;
  }
};

export async function getRequestDonasyById(id_request_donasi: number): Promise<RequestDonasi | null> {
  try {
    const res = await api.get(`/request-donasi/${id_request_donasi}`);
    return res.data.data;
  } catch (err: any) {
    return null;
  }

};

export async function getRequestDonasyOwnerById(id_request_donasi: number): Promise<RequestDonasi | null> {
  try {
    const res = await api.get(`/owner/request-donasi/${id_request_donasi}`);
    return res.data.data;
  } catch (err: any) {
    return null;
  }

};

export async function getProdukDonasi(): Promise<Produk[]> {
  try {
    const res = await api.get("/produk-untuk-donasi");
    const produk : Produk[] = res.data.data.map((item: any) => ({
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
      foto_produk: item.foto_produk[0].path_foto
    }));
    return produk;
  } catch (error : any) {
    return [];
  }
};

export async function getRiwayatDonasi(): Promise<Donasi[]> {
  try {
    const res = await api.get("/donasi");
    return res.data.data;
  } catch (error : any) {
    return [];
  }
};

export async function getDropdownProduk(): Promise<DropdownProduk[]> {
  try {
    const res = await api.get("/produk-untuk-donasi");
    return res.data.data;
  } catch (error) {
    return [];
  }
};

export async function handleNewRequestDonasi(formData: FormData): Promise<IResponse<RequestDonasi>> {
  try {
    const res = await api.post("/request-donasi", formData);
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

export async function handleNewDonasi(formData: FormData): Promise<IResponse<Donasi>> {
  try {
    const res = await api.post("/donasi", formData);
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

export async function handleUpdateRequestDonasi(formData: FormData, id_request_donasi: number): Promise<IResponse<RequestDonasi>> {
  try {
    //   formData.append("_method", "PATCH");
    const res = await api.patch(`/request-donasi/${id_request_donasi}`, {
      deskripsi_request: formData.get("deskripsi_request"),
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


export async function handleDeleteRequestDonasi(id_request_donasi: number): Promise<IResponse<any>> {
  try {
    const res = await api.delete(`/request-donasi/${id_request_donasi}`);
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

export async function handleUpdateOrganisasi(formData: FormData, id_organisasi: string): Promise<IResponse<Organisasi>> {
  try {
    formData.append("_method", "PUT");
    const res = await api.post(`/organisasi/${id_organisasi}`, formData, {
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

export async function handleDeleteOrganisasi(id: string) : Promise<IResponse<any>>{
    try {
        const res = await api.delete(`/organisasi/${id}`);
        return {
            message: res.data.message,
            data: res.data.data
        }
    } catch (error : any) {
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

export async function getAllRequestDonasiOrganisasi() : Promise<RequestDonasi[]> {
  try {
    const res = await api.get("/request-donasi-aktif");
    return res.data.data;
  } catch (error) {
    return [];
  }
}