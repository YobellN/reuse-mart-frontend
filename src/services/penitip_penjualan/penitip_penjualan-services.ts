'use server'
import api from "../api";
import { Penitip_penjualan } from "./schema-penitip_penjualan";

// sama kaya getRiwayatPenjualan, tapi ini berdasarkan id_user
export async function getRiwayatPenjualanByPenitip(
    status?: string
): Promise<Penitip_penjualan[]> {
    try {
        const res = await api.get("/get-detail-penjualan-penitip", {
            params: {
                status_penjualan: status
            },
        });
        

        const penjualans: Penitip_penjualan[] = res.data.data.map((item: any) => ({
            id_penjualan: item.id_penjualan,
            tanggal_penjualan: item.tanggal_penjualan,
            id_pembeli: item.id_pembeli || "",
            komisi_penitip: item.komisi_penitip || 0,
            bonus_penitip: item.bonus_penitip || 0,
            id_produk: item.id_produk || "",
            nama_produk: item.nama_produk || "",
        }));
        
        console.log("API Response:", res.data);
        console.log("Mapped Penjualans:", penjualans);
        
        return penjualans;
    } catch (error) {
        console.error("Error fetching penjualan:", error);
        return [];
    }
}