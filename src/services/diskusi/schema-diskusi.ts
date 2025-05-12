import { z } from "zod";

export type Diskusi = {
  id_diskusi: number;
  id_user: number;
  id_produk: string;
  pesan: string;
  timestamp: string;
  user: {
    nama: string;
    email: string;
    no_telp: string;
    role: string;
    fcm_token: string | null;
  };
  produk: {
    id_produk: string;
    id_kategori: string;
    nama_produk: string;
    deskripsi_produk: string;
    harga_produk: number;
    status_akhir_produk: string;
    status_ketersediaan: boolean;
    waktu_garansi: string | null;
    status_produk_hunting: boolean;
    rating: number;
  };
};

export const DiskusiSchema = z.object({
    id_produk: z.string().nonempty({ message: "ID produk tidak boleh kosong" }),
    pesan: z.string().nonempty({ message: "Pesan tidak boleh kosong" }),
});

export type DiskusiFormSchema = z.infer<typeof DiskusiSchema>;