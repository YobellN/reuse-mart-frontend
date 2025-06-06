import api from "../api";
import { PenjualanPerKategori } from "./schema-laporan";

export default async function getLaporanPenjualanPerKategori({tahun}: {tahun?: string} = {}) : Promise<PenjualanPerKategori[]> {
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