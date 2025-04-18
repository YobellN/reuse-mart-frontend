'use server'

import { Penitip } from "@/app/(dashboard)/cs/penitip/columns";
import { IResponse } from "../utils";
import axiosInstance from "../axios-instance";

export default async function handleNewPenitip(formData: FormData): Promise<IResponse<Penitip>> {
  try {
    const res = await axiosInstance.post("/penitip", formData, { headers: { "Content-Type": "multipart/form-data" } });

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
