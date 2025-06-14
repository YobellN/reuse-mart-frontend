import { DetailProdukTitipan } from "../penitipan/schema-penitipan";

export type Penjualan = {
  id_penjualan: string;
  tanggal_penjualan: string;
  metode_pengiriman: "Ambil di gudang" | "Antar Kurir";
  jadwal_pengambilan?: string;
  total_ongkir?: number | 0;
  poin_perolehan: number | 0;
  poin_potongan: number | 0;
  total_harga: number;
  total_poin: number;
  status_penjualan: string;
  tenggat_pembayaran?: string;
  pembeli: {
    user: {
      nama: string;
      no_telp: string;
      email: string;
    };
  } | null;
  detail: {
    produk: DetailProdukTitipan;
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
    kurir: {
        user: {
          nama: string;
        }
    }
    alamat: {
      label: string;
      detail_alamat: string;
    };
  } | null;
};
