export type PenjualanPerKategori = {
    nama_kategori: string;
    jumlah_item_terjual: number;
    jumlah_item_gagal_terjual: number;
}

export type BarangHangus = {
    id_produk: string,
    nama_produk: string,
    id_penitip: string,
    nama_penitip: string,
    tanggal_penitipan: string,
    tenggat_penitipan: string,
    tenggat_pengambilan: string,
}