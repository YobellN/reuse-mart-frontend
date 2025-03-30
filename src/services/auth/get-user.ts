"use server";
import axiosInstance from "@/services/axios-instance";
import { IResponse } from "../utils";

export type User = {
  nama: string;
  email: string;
  no_telp: string;
  role: string;
  pegawai: object | null;
  organisasi: object | null;
  penitip: object | null;
  pembeli: object | null;
};


export async function getUser(token: string): Promise<IResponse<User>> {
  try {
    const res = await axiosInstance.get("/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
