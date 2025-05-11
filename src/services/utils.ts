export type IResponse<T> = {
  message: string;
  data?: T;
  errors?: Record<string, string>;
};

export type User = {
  nama: string;
  email: string;
  no_telp: string;
  role: string;
  pegawai: Pegawai | null;
  pembeli: Pembeli | null;
  organisasi: Organisasi | null;
  penitip: Penitip | null;
};


export type Pembeli = {
  id_pembeli: string;
  poin: number;
  otp: string | null;
  otp_created_at: string | null;
}

export type Pegawai = {
  id_pegawai: string,
  nip: string,
  tanggal_lahir: string
  user: {
      nama: string;
      email: string;
      no_telp: string;
      fcm_token: string | null;
  };
  jabatan: {
      id_jabatan: number;
      nama_jabatan: string;
  };
};

export type Jabatan = {
    id_jabatan: string
    nama_jabatan: string
    status_jabatan: boolean
}

// seka yg nambahin
export type Penitip = {
  id_penitip: string;
  nik: string;
  foto_ktp: string;
  saldo: number;
  poin: number; 
}

export type Organisasi = {
  id_organisasi: string;
  no_sk: string;
  jenis_organisasi: string;
  alamat_organisasi: string;
}