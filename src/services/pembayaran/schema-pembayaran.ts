import { z } from "zod";
import { Penjualan } from "../penjualan/schema-penjualan";

export type Pembayaran = {
    id_penjualan: string;
    tanggal_pembayaran: string; // ISO date
    metode_pembayaran: "BCA" | "BNI" | "Mandiri" | "BRI";
    status_pembayaran: string;
    bukti_pembayaran: string;
    penjualan : Penjualan;
};

export type PembayaranResponse = {
    status: "success";
    message: string;
    data: {
        id_pembayaran: number;
        id_penjualan: string;
        tanggal_pembayaran: string;
        metode_pembayaran: "BCA" | "BNI" | "Mandiri" | "BRI";
        status_pembayaran: string;
        bukti_pembayaran: string; // nama file di folder storage
    };
};

export const PembayaranSchema = z.object({
    id_penjualan: z
        .string()
        .nonempty({ message: "ID Penjualan tidak boleh kosong" })
        .max(50, { message: "ID Penjualan maksimal 50 karakter" }),

    metode_pembayaran: z.enum(["BCA", "BNI", "Mandiri", "BRI"], {
        errorMap: () => ({ message: "Metode pembayaran harus BCA, BNI, Mandiri, atau BRI" }),
    }),

    // Di sisi frontend, kita validasi sebagai file (type File)
    bukti_pembayaran: z
        .instanceof(File, { message: "File tidak valid" })
        .refine((file) => !!file, {
            message: "Bukti wajib diunggah",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
                    file.type
                ),
            {
                message: "Format Bukti tidak valid (hanya jpg, jpeg, png, webp)",
            }
        ),
});

export type PembayaranFormSchema = z.infer<typeof PembayaranSchema>;
