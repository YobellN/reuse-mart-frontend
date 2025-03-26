"use server";
import axiosInstance from "@/services/axios-instance";
import { ApiResponse } from "../utils";

export async function handleLogin(token : string): Promise<ApiResponse> {
  try {
    const res = await axiosInstance.get("/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return { message: res.data.message, data: res.data.data };
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
