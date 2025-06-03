import { z } from "zod";

export type ProdukTitipan = {
  id_produk: string;
  nama_produk: string;
  deskripsi_produk: string;
  harga_produk: number;
  foto_produk: string;
  status_akhir_produk: string | null;
  status_ketersediaan: boolean;
  waktu_garansi: string | null;
  status_produk_hunting: boolean;
  rating: number | null;
  kategori: string;
  id_penitipan: string;
  tanggal_penitipan: string;
  tenggat_penitipan: string;
  tenggat_pengambilan: string;
  status_perpanjangan: number;
  id_penitip: string | null;
  nama_penitip: string | null;
  id_qc: string;
  nama_qc: string;
  id_hunter: string | null;
  hunter: string | null;
  tanggal_pengambilan: string | null;
};

export type Penitipan = {
  id_penitipan: string;
  id_penitip: string;
  id_qc: string;
  id_hunter: string | null;
  tanggal_penitipan: string;
  tenggat_penitipan: string;
  tenggat_pengambilan: string;
  status_perpanjangan: number;
  nama_penitip: string;
  nama_qc: string;
  nama_hunter: string | null;
  produk_titipan: [
    {
      id_produk: string;
      tanggal_pengambilan: string | null;
      konfirmasi_donasi: number;
      nama_produk: string;
      kategori: string;
      id_kategori: number;
      deskripsi_produk: string;
      harga_produk: number;
      status_akhir_produk: string | null;
      waktu_garansi: string | null;
      status_produk_hunting: number;
      rating: number | null;
      foto_produk: {
        path_foto: string;
      }[];
    }
  ];
};
export type DetailProdukTitipan = {
  id_produk: string;
  nama_produk: string;
  deskripsi_produk: string;
  harga_produk: number;
  status_akhir_produk: string | null;
  status_ketersediaan: boolean;
  waktu_garansi: string | null;
  status_produk_hunting: boolean;
  rating: number | null;
  foto_produk: {
    path_foto: string;
  }[];
  kategori: {
    nama_kategori: string;
  };
  detail_penitipan: {
    tanggal_pengambilan: string | null;
    konfirmasi_donasi: boolean | null;
    penitipan: {
      id_penitipan: string;
      tanggal_penitipan: string;
      tenggat_penitipan: string;
      tenggat_pengambilan: string;
      status_perpanjangan: number;
      hunter: {
        id_hunter: string;
        user: {
          nama: string;
        };
      } | null;
      penitip: {
        id_penitip: string;
        user: {
          nama: string;
        };
      };
      qc: {
        id_qc: string;
        user: {
          nama: string;
        };
      };
    };
  } | null;
};

export const FotoProdukSchema = z
  .instanceof(File, { message: "File tidak valid" })
  .refine((file) => !!file, {
    message: "Foto produk tidak boleh kosong",
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      ),
    {
      message: "Format foto produk tidak valid (hanya jpg, jpeg, png, webp)",
    }
  )
  .refine((file) => file.size <= 2 * 1024 * 1024, {
    message: "Ukuran foto maksimal 2MB",
  });

export const ProdukSchema = z.object({
  nama_produk: z.string().min(3, { message: "Nama produk minimal 3 karakter" }),
  deskripsi_produk: z
    .string()
    .min(1, { message: "Deskripsi produk tidak boleh kosong" }),
  id_kategori: z
    .number({ invalid_type_error: "ID kategori harus berupa angka" })
    .min(1, { message: "Kategori tidak boleh kosong" }),
  harga_produk: z
    .string()
    .min(1, { message: "Harga wajib diisi" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Harga harus berupa angka lebih dari 0",
    }),

  waktu_garansi: z
    .date()
    .min(new Date(), { message: "Waktu garansi minimal hari ini" })
    .nullable(),
  foto_produk: z
    .array(FotoProdukSchema)
    .min(2, { message: "Minimal 2 foto produk" })
    .max(10, { message: "Maksimal 10 foto produk" }),
});

export const PenitipanSchema = z.object({
  id_penitip: z
    .string()
    .trim()
    .nonempty({ message: "ID penitip tidak boleh kosong" })
    .startsWith("T", { message: "Format ID Penitip tidak valid" }),
  id_qc: z
    .string()
    .trim()
    .nonempty({ message: "ID QC tidak boleh kosong" })
    .startsWith("P", { message: "Format ID QC tidak valid" }),
  id_hunter: z
    .string()
    .trim()
    .startsWith("P", { message: "Format ID Hunter tidak valid" })
    .nullable(),

  produk: z
    .array(ProdukSchema)
    .min(1, { message: "Minimal 1 produk harus diisi" }),
});

export type PenitipanFormSchema = z.infer<typeof PenitipanSchema>;
export type PenitipanPayload = PenitipanFormSchema;

export const ProdukUpdateSchema = ProdukSchema.extend({
  foto_produk: z
    .array(FotoProdukSchema)
    .max(10, { message: "Maksimal 10 foto produk" })
    .refine((arr) => arr.length === 0 || arr.length >= 2, {
      message: "Minimal 2 foto jika ingin mengganti foto produk",
    })
    .optional(),
});

export const PenitipanUpdateSchema = PenitipanSchema.partial().extend({
  produk: z.array(ProdukUpdateSchema).min(1, {
    message: "Minimal 1 produk harus diisi",
  }),
});

export type PenitipanUpdateFormSchema = z.infer<typeof PenitipanUpdateSchema>;