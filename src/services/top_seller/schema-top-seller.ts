export type TopSeller = {
  id_top_seller: number;
  id_penitip: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  total_penjualan: number;
  bonus: number;
  penitip: {
    id_penitip: string;
    id_user: number;
    nik: string;
    foto_ktp: string;
    saldo: number;
    poin: number;
    user: {
      nama: string;
      email: string;
      no_telp: string;
      role: string;
      fcm_token: string;
    };
  };
};
