'use server';

import api from "../api";
import { IResponse } from "../utils";
import { RequestDonasi } from "./schema-organisasi";

export async function getAllRequestDonasi(): Promise<RequestDonasi[]> {
  try {
    const res = await api.get("/request-donasi");
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

export async function getRequestDonasyById(id_request_donasi: number): Promise<RequestDonasi | null> {
    try {
        const res = await api.get(`/request-donasi/${id_request_donasi}`);
        return res.data.data;
    } catch (err: any) {
        return null;
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


export async function handleDeleteRequestDonasi(id_request_donasi:number) : Promise<IResponse<any>> {
    try {
        const res = await api.delete(`/request-donasi/${id_request_donasi}`);
        return {
            message: res.data.message,
        }
    } catch (error:any) {
        if(error.response?.data){
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
