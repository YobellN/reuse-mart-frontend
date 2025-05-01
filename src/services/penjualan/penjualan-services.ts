"use server";

import api from "../api";
import { Penjualan } from "./schema-penjualan";

export async function getRiwayatPenjualan(
  status?: string
): Promise<Penjualan[]> {
  try {
    const res = await api.get("/penjualan", {
      params: {
        status_penjualan: status,
      },
    });

    const penjualans: Penjualan[] = res.data.data.map((item: any) => ({
      id_penjualan: item.id_penjualan,
      tanggal_penjualan: item.tanggal_penjualan,
      metode_pengiriman: item.metode_pengiriman,
      jadwal_pengambilan: item.jadwal_pengambilan ?? undefined,
      total_ongkir: item.total_ongkir ?? "0",
      poin_potongan: item.poin_potongan ?? 0,
      poin_perolehan: item.poin_perolehan ?? 0,
      total_harga: item.total_harga,
      total_poin: item.total_poin,
      status_penjualan: item.status_penjualan,
      tenggat_pembayaran: item.tenggat_pembayaran ?? undefined,
      pembeli: {
        nama: item.pembeli.user.nama,
        no_telp: item.pembeli.user.no_telp,
        email: item.pembeli.user.email,
      },
      produk:
        item.detail?.map((d: any) => ({
          nama_produk: d.produk?.nama_produk ?? "",
          foto_produk: d.produk?.foto_produk ?? "",
          kategori: d.produk?.kategori?.nama_kategori ?? "",
          harga: parseInt(d.produk?.harga_produk ?? "0"),
        })) ?? [],
      pembayaran: item.pembayaran
        ? {
            tanggal_pembayaran: item.pembayaran.tanggal_pembayaran,
            metode_pembayaran: item.pembayaran.metode_pembayaran,
            status_pembayaran: item.pembayaran.status_pembayaran,
            bukti_pembayaran: item.pembayaran.bukti_pembayaran,
          }
        : null,
      pengiriman: item.pengiriman ? {
        jadwal_pengiriman: item.pengiriman.jadwal_pengiriman,
        status_pengiriman: item.pengiriman.status_pengiriman,
        alamat: {
          label: item.pengiriman.alamat.label,
          detail_alamat: item.pengiriman.alamat.detail_alamat,
        },
      } : null,
    }));

    return penjualans;
  } catch (error) {
    return [];
  }
}
