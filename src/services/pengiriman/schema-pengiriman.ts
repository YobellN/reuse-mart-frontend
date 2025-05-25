import { z } from "zod";
import { Penjualan } from "../penjualan/schema-penjualan";
import { Alamat, Pegawai } from "../utils";
import { startOfDay } from "date-fns";

export type Pengiriman = {
  id_penjualan: string;
  id_alamat: number;
  id_kurir: string | null;
  alamat: Alamat;
  kurir: Pegawai | null;
  jadwal_pengiriman: string | null;
  status_pengiriman: string;
  penjualan: Penjualan;
};

const now = new Date();
const todayStart = startOfDay(now);
const cutoffHour = 16;

export const PengirimanSchema = z.object({
  id_penjualan: z.string().optional(),
  id_alamat: z.number().optional(),
  id_kurir: z.string().nonempty({ message: "Kurir tidak boleh kosong" }),
  jadwal_pengiriman: z
    .date()
    .refine((date) => date >= todayStart, {
      message: "Tanggal pengambilan minimal hari ini",
    })
    .refine(
      (date) => {
        const isToday = date.toDateString() === now.toDateString();
        const isAfterCutoff = now.getHours() >= cutoffHour;
        return !(isToday && isAfterCutoff);
      },
      {
        message: "Sudah lewat jam 4 sore, tidak bisa memilih hari ini",
      }
    ),
});

export const PengambilanSchema = z.object({
  id_penjualan: z.string().optional(),
  jadwal_pengambilan: z
    .date()
    .refine((date) => date >= todayStart, {
      message: "Tanggal pengiriman minimal hari ini",
    })
    .refine(
      (date) => {
        const isToday = date.toDateString() === now.toDateString();
        const isAfterCutoff = now.getHours() >= cutoffHour;
        return !(isToday && isAfterCutoff);
      },
      {
        message: "Sudah lewat jam 4 sore, tidak bisa memilih hari ini",
      }
    )
    .refine(
      (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
      },
      {
        message: "Pengambilan tidak tersedia di hari Sabtu atau Minggu",
      }
    ),
});

export type PengirimanFormSchema = z.infer<typeof PengirimanSchema>;

export type PengambilanFormSchema = z.infer<typeof PengambilanSchema>;
