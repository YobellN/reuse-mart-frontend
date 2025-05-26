import { z } from "zod";
import { DetailProdukTitipan } from "../penitipan/schema-penitipan";

export type DetailKeranjang = {
    id_keranjang: number;
    id_produk: string;
    produk: {
        id_produk: string;
        nama_produk: string;
        deskripsi_produk: string;
        harga_produk: number;
        foto_produk: string;
        status_akhir_produk: string | null;
        status_ketersediaan: number;
        waktu_garansi: string | null;
        status_produk_hunting: number;
        rating: number | null;
    };
};


export type KeranjangResponse = {
  status: string;
  poin: number;
  poin_dipakai: number;
  diskon: number;
  ongkir: number;
  total_harga: number;
  total_akhir: number;
};


export const DetailKeranjangSchema = z.object({
    id_keranjang: z.number().nonnegative({ message: "ID Keranjang tidak boleh negatif" }),
    id_produk: z.string().nonempty({ message: "ID Produk tidak boleh kosong" }),
    status: z.number().nonnegative({ message: "Status tidak boleh negatif" }),
});
export type DetailKeranjangFormSchema = z.infer<typeof DetailKeranjangSchema>;