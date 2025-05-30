'use server';

import api from "../api";
import { IResponse } from "../utils";
import { Pembayaran } from "./schema-pembayaran";

export async function handleNewPembayaran(
    formData: FormData
): Promise<IResponse<Pembayaran>> {
    try {
        console.log("INIRESPON");
        const res = await api.post("/pembayaran", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        
        console.log("INIRESPON", res.data); // ✅ bukan pakai +

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
        console.error(err);
        return {
            message: "Terjadi kesalahan",
        };
    }
}

export async function getTagihanPembayaran(id_penjualan: string){
    try {
        const res = await api.get(`/tagihan/${id_penjualan}`);
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

// mengambil semua pembayaran yang masih pending, api nya getPembayaranPending

export async function getPembayaranPending() {
    try {
        const res = await api.get("/getPembayaranPending");
        return res.data.data;
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

export async function getPembayaranBukanPending() {
    try {
        const res = await api.get("/getPembayaranBukanPending");
        return res.data.data;
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

// Terima pembayaran, API nya : Route::post('konfirmasiPembayaran/{id_penjualan}', [PembayaranController::class, 'konfirmasiPembayaran']);
export async function konfirmasiPembayaran(id_penjualan: string) {
    try {
        const res = await api.post(`/konfirmasiPembayaran/${id_penjualan}`);
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

// Tolak pembayaran, API nya : Route::post('tolakPembayaran/{id_penjualan}', [PembayaranController::class, 'tolakPembayaran']);
export async function tolakPembayaran(id_penjualan: string) {
    try {
        const res = await api.post(`/tolakPembayaran/${id_penjualan}`);
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