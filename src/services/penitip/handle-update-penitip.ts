'use server'

import { IResponse } from "../utils";
import axiosInstance from "../axios-instance";
import { Penitip } from "./schema";

export default async function handleUpdatePenitip(formData: FormData, id_penitip: string): Promise<IResponse<Penitip>> {
  try {
    formData.append("_method", "PUT");
    
    const res = await axiosInstance.post(`/penitip/${id_penitip}`, formData, {
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
