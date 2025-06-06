import api from "../api";
import { BarangHangus, PenjualanPerKategori } from "./schema-laporan";

export async function getLaporanPenjualanPerKategori({tahun}: {tahun?: string} = {}) : Promise<PenjualanPerKategori[]> {
    try {
        const res = await api.get('/laporan-penjualan-per-kategori', {
            params: {
                tahun: tahun
            }
        });

        return res.data.data
    } catch (error) {
        return []
    }
}

export async function getLaporanBarangHangus({tahun, bulan}: {tahun?: string, bulan?: string} = {}) : Promise<BarangHangus[]> {
    try {
        const res = await api.get('/laporan-barang-hangus', {
            params: {
                tahun: tahun,
                bulan: bulan
            }
        });

        return res.data.data
    } catch (error) {
        return []
    }
}