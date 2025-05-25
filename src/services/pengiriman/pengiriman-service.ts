'use server'

import api from "../api";
import { Penjualan } from "../penjualan/schema-penjualan";
import { IResponse, Pegawai } from "../utils";
import { Pengiriman } from "./schema-pengiriman";

export async function getPengirimanById(id: string) : Promise<Pengiriman | null>{
    try {
        const res = await api.get(`/gudang/get-pengiriman/${id}`);
        return res.data.data
    } catch (error) {
        return null;
    }
}

export  async function getAllKurir() : Promise<Pegawai[]> {
    try {
        const res = await api.get('/gudang/get-all-kurir');
        return res.data.data;
    } catch (error) {
        return [];
    }
}

export async function handlePenjadwalanPengiriman(formData: FormData, id_pengiriman: string) : Promise<IResponse<Penjualan>> {
    try {
        const res = await api.patch(`/gudang/penjadwalan-pengiriman/${id_pengiriman}`, {
            id_kurir: formData.get('id_kurir'),
            jadwal_pengiriman: formData.get('jadwal_pengiriman'),
        });
        return {
            message: res.data.message,
            data: res.data.data,
        }
    } catch (error : any) {
        if(error.response?.data?.errors) {
            return {
                message: error.response.data.message,
                errors: error.response.data.errors,
            };
        }
        return {
            message: "Terjadi kesalahan",
        };
    }
}