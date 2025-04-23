"use server";
import axiosInstance from "@/services/axios-instance";
import { IResponse, User } from "../utils";

export async function getUser(): Promise<IResponse<User>> {
  try {
    const res = await axiosInstance.get("/getUser");

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
