import { z } from "zod";

export type Penitip = {
  id_penitip: string;
  id_user: string;
  nik: string;
  foto_ktp: string;
  saldo: number;
  poin: number;
  rating: number | null;
  total_produk: number | 0;
  user: {
    nama: string;
    email: string;
    no_telp: string;
    fcm_token: string | null;
  };
};

export const PenitipSchema = z.object({
    nama: z.string()
        .trim().
        nonempty({ message: "Nama tidak boleh kosong" })
        .regex(/^[a-zA-Z\s]+$/, { message: "Nama hanya boleh mengandung huruf" })
        .min(3, { message: "Nama minimal 3 karakter" }),
    email: z.string()
        .trim()
        .nonempty({ message: "Email tidak boleh kosong" })
        .email({ message: "Format email tidak valid" }),
    no_telp: z.string()
        .trim()
        .nonempty({ message: "Nomor telepon tidak boleh kosong" })
        .min(10, { message: "Nomor telepon tidak valid" })
        .max(14, { message: "Nomor telepon tidak valid" })
        .startsWith("0", { message: "Format Nomor telepon tidak valid" }),
    password: z.string()
        .trim()
        .nonempty({ message: "Password tidak boleh kosong" })
        .min(8, { message: "Password minimal 8 karakter" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
            message: "Password harus mengandung huruf besar, kecil, angka, dan karakter khusus",
        }),
    nik: z.string()
        .trim()
        .nonempty({ message: "NIK tidak boleh kosong" })
        .regex(/^\d+$/, { message: "NIK harus berupa angka" })
        .length(16, { message: "NIK harus 16 karakter" }),
    foto_ktp: z
        .instanceof(File, { message: "File tidak valid" })
        .refine((file) => !!file, {
            message: "Foto KTP wajib diunggah",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                    file.type
                ),
            {
                message: "Format foto KTP tidak valid (hanya jpg, jpeg, png, webp)",
            }
        )
});

export type PenitipFormSchema = z.infer<typeof PenitipSchema>;