"use server";
import axiosInstance from "@/services/axios-instance";
import { ApiResponse } from "../utils";
import { cookies } from "next/headers";

export async function handleLogin(formData: FormData): Promise<ApiResponse<any>> {
  try {
    const res = await axiosInstance.post("/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    
    (await cookies()).set("token", res.data.data.access_token);

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
