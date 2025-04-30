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
  pegawai: object | null;
  organisasi: object | null;
  penitip: object | null;
  pembeli: object | null;
};




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