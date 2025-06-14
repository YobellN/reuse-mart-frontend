'use server'
import api from "../api";
import { Penitip_penjualan, PenitipSelectProps, PenitipTransaksiLaporanSchema, PenitipTransaksiLaporanTableSchema } from "./schema-penitip_penjualan";

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
        return penjualans;
    } catch (error) {
        console.error("Error fetching penjualan:", error);
        return [];
    }
}

// Ambil laporan verdasarkan bulan, tahun, dan id_penitip
    export async function getLaporanPenitip(
        { bulan, tahun, id_penitip }: { bulan?: string, tahun?: string, id_penitip?: string } = {}
    ): Promise<PenitipTransaksiLaporanSchema> {
        try {
            const res = await api.get("/getLaporanPenitip", {
                params: {
                    bulan,
                    tahun,
                    id_penitip
                },
            });
            return res.data.data;
        } catch (error) {
            console.error("Error fetching laporan penitip:", error);
            return {
                id_penitip: "",
                nama_penitip: "",
                bulan: 0,
                tahun: 0,
                data: [],
            };
        }
    }

    // Ambil daftar penitip dan periode transaksi
    export async function getIdPenitipTerakhir(): Promise<string> {
        try {
            const res = await api.get("/getIdPenitipTerakhir");
            return res.data.data;
        } catch (error) {
            console.error("Error fetching daftar penitip transaksi:", error);
            return 'T0001'; // Kembalikan ID default jika gagal
        }
    }