export type ProdukTitipan = {
  id_produk: string;
  nama_produk: string;
  deskripsi_produk: string;
  harga_produk: number;
  foto_produk: string;
  status_akhir_produk: string | null;
  status_ketersediaan: boolean;
  waktu_garansi: string | null;
  status_produk_hunting: boolean;
  rating: number | null;
  kategori: string;
  id_penitipan: string;
  tanggal_penitipan: string;
  tenggat_penitipan: string;
  tenggat_pengambilan: string;
  status_perpanjangan: number;
  id_penitip: string | null;
  nama_penitip: string | null;
  id_qc: string;
  nama_qc: string;
  id_hunter: string | null;
  hunter: string | null;
  tanggal_pengambilan: string | null;
};

export type Penitipan = {
  id_penitipan: string;
  id_penitip: string;
  id_qc: string;
  id_hunter: string | null;
  tanggal_penitipan: string;
  tenggat_penitipan: string;
  tenggat_pengambilan: string;
  status_perpanjangan: number;
  nama_penitip: string;
  nama_qc: string;
  nama_hunter: string | null;
  produk_titipan: [
    {
      id_produk: string;
      tanggal_pengambilan: string | null;
      konfirmasi_donasi: number;
      nama_produk: string;
      kategori: string;
      deskripsi_produk: string;
      harga_produk: number;
      status_akhir_produk: string | null;
      waktu_garansi: string | null;
      status_produk_hunting: number;
      rating: number | null;
    }
  ];
};
export type DetailProdukTitipan = {
  id_produk: string;
  nama_produk: string;
  deskripsi_produk: string;
  harga_produk: number;
  status_akhir_produk: string | null;
  status_ketersediaan: boolean;
  waktu_garansi: string | null;
  status_produk_hunting: boolean;
  rating: number | null;
  foto_produk: {
    path_foto: string;
  }[];
  kategori: {
    nama_kategori: string;
  };
  detail_penitipan: {
    tanggal_pengambilan: string | null;
    konfirmasi_donasi: boolean | null;
    penitipan: {
      id_penitipan: string;
      tanggal_penitipan: string;
      tenggat_penitipan: string;
      tenggat_pengambilan: string;
      status_perpanjangan: number;
      hunter: {
        id_hunter: string;
        user: {
          nama: string;
        };
      } | null;
      penitip: {
        id_penitip: string;
        user: {
          nama: string;
        };
      };
      qc: {
        id_qc: string;
        user: {
          nama: string;
        };
      };
    };
  };
};
