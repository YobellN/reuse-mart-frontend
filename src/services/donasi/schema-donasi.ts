export type DonasiLaporanSchema = {
  id_produk: string;
  nama_produk: string;
  id_penitip: string;
  nama_penitip: string;
  tanggal_donasi: string;
  nama_organisasi: string;
  nama_penerima: string;
};

export type DonasiRequestLaporanSchema = {
  id_organisasi: string;
  nama_organisasi: string;
  alamat_organisasi: string;
  request: string;
};

