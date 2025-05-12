import { z } from "zod";

export type Alamat = {
    id_alamat: string;
    id_pembeli: string;
    label: string;
    kabupaten_kota: string;
    kecamatan: string;
    kode_pos: string;
    detail_alamat: string;
    alamat_utama: number;
}

export const AlamatSchema = z.object({
    label: z.string().nonempty({ message: "Label tidak boleh kosong" }),
    kabupaten_kota: z.string().nonempty({ message: "Kota tidak boleh kosong" }),
    kecamatan: z.string().nonempty({ message: "Kecamatan tidak boleh kosong" }),
    kode_pos: z.string().nonempty({ message: "Kode pos tidak boleh kosong" }),
    detail_alamat: z.string().nonempty({ message: "Detail alamat tidak boleh kosong" }),
});

export type AlamatFormSchema = z.infer<typeof AlamatSchema>;