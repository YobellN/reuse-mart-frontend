"use server";

import { cookies } from "next/headers";
import api from "../api";
import { IResponse, User } from "../utils";

export async function getUser(): Promise<IResponse<User>> {
  try {
    const res = await api.get("/getUser");

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

export async function handleLogin(formData: FormData): Promise<IResponse<any>> {
    try {
      const res = await api.post("/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      });
      
      (await cookies()).set("token", res.data.data.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24
      });
  
      return { 
        message: res.data.message, 
        data: {
          user: res.data.data.user as User,
          access_token: res.data.data.access_token 
        } 
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
  
export async function handleRegister(formData: FormData): Promise<IResponse<User>> {
    try {
      const nama = formData.get("nama");
      const email = formData.get("email");
      const no_telp = formData.get("no_telp");
      const password = formData.get("password");
  
      const res = await api.post("/register", {
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

export default async function logout() {
    (await cookies()).delete("token");
}

export async function redirectMenu(role: string): Promise<string> {
    try {
      switch (role) {
        case "Admin":
          return "/admin";
        case "CS":
          return "/cs";
        case "Gudang":
          return "/gudang";
        case "Penitip":
          return "/penitip";
        case "Organisasi":
          return "/organisasi";
        case "Owner":
          return "/owner";
        case "Pembeli":
          return "/home";
        default:
          return "/login";
      }
    } catch (error) {
      return "error";
    }
}