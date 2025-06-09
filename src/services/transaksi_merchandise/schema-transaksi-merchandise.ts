export type TransaksiMerchandise = {
  id_transaksi_merchandise: number;
  id_pembeli: string;
  id_merchandise: number;
  tanggal_transaksi: string;
  status_transaksi: string;
  tanggal_pengambilan: string | null;
  merchandise: Merchandise;
  pembeli: Pembeli;
};

export type Merchandise = {
  id_merchandise: number;
  nama_merchandise: string;
  stok: number;
  poin_penukaran: number;
  foto_merchandise: string;
};

export type Pembeli = {
  id_pembeli: string;
  id_user: number;
  poin: number;
  otp: string | null;
  otp_created_at: string | null;
  user: User;
};

export type User = {
  nama: string;
  email: string;
  no_telp: string;
  role: string;
  fcm_token: string;
};
