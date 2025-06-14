"use server";

import { cookies } from "next/headers";
import api from "../api";
import { IResponse, User } from "../utils";
import { cache } from "react";

export const getUser = cache(async (): Promise<IResponse<User>> => {
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
    return { message: "Terjadi kesalahan" };
  }
});

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
        message: err,
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

export async function handleRegisterOrganisasi(formData: FormData): Promise<IResponse<User>> {
  try {
    const nama = formData.get("nama");
    const email = formData.get("email");
    const no_telp = formData.get("no_telp");
    const password = formData.get("password");
    const no_sk = formData.get("no_sk");
    const jenis_organisasi = formData.get("jenis_organisasi");
    const alamat_organisasi = formData.get("alamat_organisasi");

    const res = await api.post("/register-organisasi", {
      nama: nama,
      no_telp: no_telp,
      email: email,
      password: password,
      no_sk: no_sk,
      jenis_organisasi: jenis_organisasi,
      alamat_organisasi: alamat_organisasi
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

export async function sendEmailLink(formData: FormData): Promise<IResponse<any>> {
  try {
    const email = formData.get("email");
    console.log("Sending reset password request for email:", email);

    const res = await api.post("/password/reset-link", {
      email: email
    });

    console.log("Response received:", res.data);
    return { 
      message: res.data.message,
    };
  } catch (err: any) {
    console.log("Error details:", {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      headers: err.response?.headers
    });
    
    // Handle specific error cases
    if (err.response?.data?.exception === 'InvalidArgumentException') {
      return {
        message: "Terjadi kesalahan sistem. Mohon hubungi admin.",
      };
    }

    if (err.response?.data?.errors) {
      return {
        message: err.response.data.message || "Terjadi kesalahan",
      };
    }

    return {
      message: "Terjadi kesalahan pada sistem",
    };
  }
}

// Ini fungsi yg ngecek token dan email dari URL
export async function checkTokenEmail(tokenInput: string, emailInput: string): Promise<IResponse<any>> {
  try {
    const res = await api.post("/password/validate-token", {
      token: tokenInput,
      email: emailInput
    });
    
    return {
      message: res.data.message,
      data: {
        email: emailInput
      }
    };
  } catch (err: any) {
    return {
      message: "Token tidak valid",
      errors: err.response?.data?.errors
    };
  }
}

// Kalau udh berhasil token dan klik link, jika 200 statusnya maka pakai api ini untuk ganti password
export async function changePassword(formData: FormData): Promise<IResponse<any>> {
  try {
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");
    const res = await api.post("/password/reset-password", {
      password: password,
      confirm_password: confirm_password,
    });
    console.log("Response received:", res.data);
    return { 
      message: res.data.message,
    };
  }catch (err: any) {
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

/*
  Ini dari AI:
  Fungsi ini digunakan untuk mereset password pengguna.
  Menggunakan email dan password baru yang diinputkan oleh pengguna.
  Jika berhasil, akan mengembalikan pesan sukses.
  Jika gagal, akan mengembalikan pesan kesalahan.

  Parameter:
  - email: string | { email: string }, email pengguna
  - password: string, password baru
  - confirmPassword: string, konfirmasi password baru

  Return:
  - Promise<IResponse<any>>, objek yang berisi pesan dan data (jika ada)

  Pesan seka:
  aku ngambil parameternya langsung dari form data, karena ada email yg bukan form. dan kupaksa jadi string.
  bingung juga, dia bisa jadi object sesekali entah kenapa.

  Intinya dia ambil email dari link yg udh dikirim, lalu user tinggal masukin password baru dan konfirmasi password baru.
  Pas pencet submit maka jika gk aneh2, langsung diganti passwordnya.

  email dan token otomatis di hapus kalau udh berhasil yg di database. kalau lebih dari 15 menit, ttp delete jg sih, intinya tokennya bakal di delete.
*/

export async function resetPassword(email: string | { email: string }, password: string, confirmPassword: string): Promise<IResponse<any>> {
  try {
    // Handle email whether it's a string or object
    const emailValue = typeof email === 'object' ? email.email : email;
    
    console.log("Attempting password reset with data:", {
      email: emailValue,
      password,
      confirm_password: confirmPassword
    });

    const res = await api.post("/password/reset", {
      email: emailValue,
      password,
      confirm_password: confirmPassword
    });
    
    console.log("Password reset response:", res.data);
    
    return {
      message: res.data.message
    };
  } catch (err: any) {
    if (err.response?.data?.errors) {
      return {
        message: err.response.data.message,
        errors: err.response.data.errors
      };
    }
    console.log("Error details:", {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      headers: err.response?.headers
    });
    return {
      message: "Terjadi kesalahan"
    };

  }
}

export async function resetPasswordByAdmin(id_pegawai: string): Promise<IResponse<any>> {
  try {
    const res = await api.post("/password/reset-password-pegawai", {
      id_pegawai: id_pegawai
    });
    
    return {
      message: res.data.message
    };
  } catch (err: any) {
    if (err.response?.data?.errors) {
      return {
        message: err.response.data.message,
        errors: err.response.data.errors
      };
    }
    return {
      message: "Terjadi kesalahan saat mereset password"
    };
  }
}