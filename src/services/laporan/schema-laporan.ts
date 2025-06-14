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

export type LaporanPenjualanKotor = {
  bulan: string;
  jumlah_barang_terjual: number;
  jumlah_penjualan_kotor: string;
};

export type KomisiProduk = {
  kodeProduk: string;
  namaProduk: string;
  hargaJual: number;
  tanggalMasuk: string;
  tanggalLaku: string;
  komisiHunter: number;
  komisiReuseMart: number;
  bonusPenitip: number;
};

export type StokGudangItem = {
  kodeProduk: string;
  namaProduk: string;
  idPenitip: string;
  namaPenitip: string;
  tanggalMasuk: string;
  perpanjangan: "Ya" | "Tidak";
  idHunter: string;
  namaHunter: string;
  hargaProduk: number;
};