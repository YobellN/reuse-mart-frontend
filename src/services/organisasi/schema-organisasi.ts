import { startOfDay } from "date-fns";
import { User } from "../utils";
import { z } from "zod";
import { Produk } from "../produk/schema-produk";

// Request Donasi
export type RequestDonasi = {
  id_request_donasi: number;
  id_organisasi: string | null;
  tanggal_request: string;
  deskripsi_request: string;
  status_request: string;
  organisasi: {
    id_organisasi: string;
    no_sk: string;
    jenis_organisasi: string;
    alamat_organisasi: string;
    user: User;
  } | null;
};

export type Donasi = {
  id_donasi: string;
  id_produk: string;
  id_request_donasi: number;
  tanggal_donasi: string;
  nama_penerima: string;
  produk:Produk
  request_donasi: RequestDonasi;
};

export const RequestDonasiSchema = z.object({
  deskripsi_request: z
    .string()
    .nonempty({ message: "Deskripsi request tidak boleh kosong" })
    .min(10, { message: "Deskripsi request minimal 10 karakter" }),
});

export const DonasiSchema = z.object({
  id_produk: z.string().nonempty({ message: "Produk tidak boleh kosong" }),
  id_request_donasi: z.number(),
  nama_organisasi: z.string().optional(),
  deskripsi_request: z.string().optional(),
  nama_penerima: z
    .string()
    .nonempty({ message: "Nama penerima tidak boleh kosong" }),
  tanggal_donasi: z.date().min(startOfDay(new Date()), {
    message: "Tanggal donasi minimal hari ini",
  }),
});

export type RequestDonasiFormSchema = z.infer<typeof RequestDonasiSchema>;
export type DonasiFormSchema = z.infer<typeof DonasiSchema>;
// Organisasi

export type Organisasi = {
  id_organisasi: string;
  no_sk: string;
  jenis_organisasi: string;
  alamat_organisasi: string;
  user: {
    nama: string;
    email: string;
    no_telp: string;
    fcm_token: string | null;
  };
};

export type DropdownProduk = {
  id_produk: string;
  nama_produk: string;
};

export const OrganisasiSchema = z.object({
  nama: z
    .string()
    .trim()
    .nonempty({ message: "Nama tidak boleh kosong" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Nama hanya boleh mengandung huruf" })
    .min(3, { message: "Nama minimal 3 karakter" }),
  email: z
    .string()
    .trim()
    .nonempty({ message: "Email tidak boleh kosong" })
    .email({ message: "Format email tidak valid" }),
  no_telp: z
    .string()
    .trim()
    .nonempty({ message: "Nomor telepon tidak boleh kosong" })
    .min(10, { message: "Nomor telepon tidak valid" })
    .max(14, { message: "Nomor telepon tidak valid" })
    .startsWith("0", { message: "Format Nomor telepon tidak valid" }),
  password: z
    .string()
    .trim()
    .nonempty({ message: "Password tidak boleh kosong" })
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        "Password harus mengandung huruf besar, kecil, angka, dan karakter khusus",
    }),
  no_sk: z.string().nonempty({ message: "No SK tidak boleh kosong" }),
  jenis_organisasi: z
    .string()
    .nonempty({ message: "Jenis organisasi tidak boleh kosong" }),
  alamat_organisasi: z
    .string()
    .nonempty({ message: "Alamat organisasi tidak boleh kosong" }),
});
export type OrganisasiFormSchema = z.infer<typeof OrganisasiSchema>;
