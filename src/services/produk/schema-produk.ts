export type Produk = {
    id_produk: string,
    nama_produk: string,
    deskripsi_produk: string,
    harga_produk: number,
    status_akhir_produk: string | null,
    status_ketersediaan: boolean,
    status_garansi: boolean,
    status_produk_hunting: boolean,
    waktu_garansi: string | null,
    rating: number | null,
    nama_kategori: string,
    id_penitip: string,
    nama_penitip: string,
    tanggal_penitipan: string,
    foto_produk: [
        {
            path_foto: string
        }
    ] | null,    
};

export type ProdukRaw = {
    id_produk: string;
    nama_produk: string;
    deskripsi_produk: string;
    harga_produk: number;
    status_akhir_produk: string;
    status_ketersediaan: boolean;
    status_garansi: string | null;
    status_produk_hunting: boolean;
    waktu_garansi: string | null;
    rating: number | null;
    kategori: { nama_kategori: string };
    detail_penitipan: Array<{
      penitipan: {
        penitip: { id_penitip: string; user: { nama: string } };
      };
    }>;
    foto_produk: Array<{ path_foto: string }>;
  }
  