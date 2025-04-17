import axiosInstance from "@/services/axios-instance"
import { SiteHeader } from "@/components/site-header";
import { columns, Jabatan } from "../../admin/jabatan/columns";


// async function getData(): Promise<Jabatan[]> {
//     const res = await axiosInstance.get('/pegawai');

//     if (!res.data) {
//         throw new Error('Failed to fetch pegawai');
//     }

//     const pegawai: Jabatan[] = res.data.data;
//     return [
//         ...pegawai
//     ]
// }

export default async function PegawaiPage() {
    // const data = await getData()

    return (
        <>
            <SiteHeader title="Data Master Penitip" />
        </>
    )
}
