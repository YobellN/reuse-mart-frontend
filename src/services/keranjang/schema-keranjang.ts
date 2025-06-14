import { z } from "zod";

export type Keranjang = {
    id_keranjang: number;
    id_pembeli: string;
};

export const KeranjangSchema = z.object({
    id_pembeli: z.string().nonempty({ message: "ID Pembeli tidak boleh kosong" }),
});
export type KeranjangFormSchema = z.infer<typeof KeranjangSchema>;