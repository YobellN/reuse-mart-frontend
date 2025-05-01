import {User } from "../utils";

export type Penjualan = {
  id_penjualan: string;
  tanggal_penjualan: string;
  metode_pengiriman: "Ambil di gudang" | "Antar Kurir";
  jadwal_pengambilan?: string;
  total_ongkir?: string;
  poin_perolehan: number | 0;
  poin_potongan: number | 0;
  total_harga: string;
  total_poin: number;
  status_penjualan: string;
  tenggat_pembayaran?: string;
  pembeli: {
    nama: string;
    no_telp: string;
    email: string;
  };
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
  pengiriman: {
    jadwal_pengiriman: string;
    status_pengiriman: string;
    alamat: {
      label: string;
      detail_alamat: string;
    }
  } | null;
};
