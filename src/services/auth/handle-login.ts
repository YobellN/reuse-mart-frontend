"use server";
import axiosClient from "@/lib/axios-instance";

type LoginResp = {
  message: string;
  data?: any;
  errors?: Record<string, string>;
};

export async function handleLogin(formData: FormData): Promise<LoginResp> {
  try {
    const res = await axiosClient.post("/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return { message: res.data.message, data: res.data };
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
