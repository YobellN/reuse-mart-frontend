import { User } from "../utils"
import { z } from "zod"

export type RequestDonasi = {
    id_request_donasi: number,
    tanggal_request: string,
    deskripsi_request: string,
    status_request: string,
    organisasi: {
        no_sk: string,
        nama_organisasi: string,
        jenis_organisasi: string,
        alamat_organisasi: string,
        user: User
    } | null
};

export const RequestDonasiSchema =  z.object({
    deskripsi_request: z.string().nonempty({message: "Deskripsi request tidak boleh kosong"}).min(10, {message: "Deskripsi request minimal 10 karakter"}),
});

export type RequestDonasiFormSchema = z.infer<typeof RequestDonasiSchema>;