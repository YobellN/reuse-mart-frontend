export type Penjualan = {
  id_penjualan: string;
  tanggal_penjualan: string;
  metode_pengiriman: "Ambil di gudang" | "Antar kurir";
  jadwal_pengambilan?: string;
  total_ongkir?: string;
  poin_potongan?: number;
  total_harga: string;
  total_poin: number;
  status_penjualan: string;
  tenggat_pembayaran?: string;
  produk: {
    nama_produk: string;
    foto_produk: string;
    kategori: string;
    harga: number;
  }[];
  pembayaran: {
    tanggal_pembayaran: string;
    metode_pembayaran: string;
    status_pembayaran: string;
    bukti_pembayaran: string;
  } | null;
  pengiriman: {} | null;
};
