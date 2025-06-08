export type Penitip_penjualan = {
    id_penjualan: string;
    tanggal_penjualan: string;
    id_pembeli: string;
    komisi_penitip: number;
    bonus_penitip: number;
    id_produk: string;
    nama_produk: string;
};

// tipe untuk laporan penitip penjualan
export type PenitipTransaksiLaporanSchema = {
    id_penitip: string;
    nama_penitip: string;
    bulan: number;
    tahun: number;
    data: {
        kode_produk: string;
        nama_produk: string;
        tanggal_masuk: string;
        tanggal_laku: string;
        harga_jual_bersih: number;
        bonus_terjual_cepat: number;
        pendapatan: number;
    }[];
};

// tipe untuk daftar penitip dan periode transaksi
export type PenitipTransaksiLaporanTableSchema = {
    id_penitip: string;
    nama_penitip: string;
    periode: {
        bulan: number;
        tahun: number;
    }[];
};

export type PenitipSelectProps = {
    id_penitip: string
    nama_penitip: string
}