"use server";

import axiosInstance from "../axios-instance";
import { IResponse } from "../utils";
import { User } from "./get-user";

export default async function handleRegister(
  formData: FormData
): Promise<IResponse<User>> {
  try {
    const nama = formData.get("nama");
    const email = formData.get("email");
    const no_telp = formData.get("no_telp");
    const password = formData.get("password");

    const res = await axiosInstance.post("/register", {
      nama: nama,
      no_telp: no_telp,
      email: email,
      password: password,
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
