import { z } from "zod";

export type Pegawai = {
  id_pegawai: string;
  id_user: string;
  id_jabatan: number;
  nip: string;
  tanggal_lahir: string;
  total_komisi: number | 0;
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

export const PegawaiSchema = z.object({
  nama: z
    .string()
    .trim()
    .nonempty({ message: "Nama tidak boleh kosong" })
    .regex(/^[a-zA-Z ]+$/, { message: "Nama harus berupa huruf" })
    .min(3, { message: "Nama minimal 3 karakter" }),
  email: z
    .string()
    .trim()
    .email({ message: "Format email tidak valid" })
    .nonempty({ message: "Email tidak boleh kosong" }),
  password: z
    .string()
    .trim()
    .nonempty({ message: "Password tidak boleh kosong" })
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        "Password harus mengandung huruf besar, kecil, angka, dan karakter khusus",
    }),
  no_telp: z
    .string()
    .trim()
    .nonempty({ message: "Nomor telepon tidak boleh kosong" })
    .min(10, { message: "Nomor telepon tidak valid" })
    .max(14, { message: "Nomor telepon tidak valid" })
    .startsWith("0", { message: "Format Nomor telepon tidak valid" }),
  id_jabatan: z
    .number()
    .gte(1, { message: "Jabatan tidak valid" })
    .lte(5, { message: "Jabatan tidak valid" })
    .refine((val) => val !== 4, {
      message: "Jabatan tidak valid",
    }),
  nip: z
    .string()
    .trim()
    .nonempty({ message: "NIP tidak boleh kosong" })
    .regex(/^\d+$/, { message: "NIP harus berupa angka" })
    .length(18, { message: "NIK harus 18 karakter" }),
  tanggal_lahir: z
    .date()
    .min(new Date("1955-01-01"), { message: "Usia Terlalu Tua" })
    .max(new Date("2008-06-01"), { message: "Usia Terlalu Muda" }),
});

export type PegawaiFormSchema = z.infer<typeof PegawaiSchema>;
export type PegawaiPayload = Omit<PegawaiFormSchema, "tanggal_lahir"> & {
  tanggal_lahir: string;
};
