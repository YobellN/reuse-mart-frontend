import api from "../api";
import {
  BarangHangus,
  KomisiProduk,
  LaporanPenjualanKotor,
  PenjualanPerKategori,
  StokGudangItem,
} from "./schema-laporan";

export async function getLaporanPenjualanPerKategori({
  tahun,
}: { tahun?: string } = {}): Promise<PenjualanPerKategori[]> {
  try {
    const res = await api.get("/laporan-penjualan-per-kategori", {
      params: {
        tahun: tahun,
      },
    });

    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function getLaporanBarangHangus({
  tahun,
  bulan,
}: { tahun?: string; bulan?: string } = {}): Promise<BarangHangus[]> {
  try {
    const res = await api.get("/laporan-barang-hangus", {
      params: {
        tahun: tahun,
        bulan: bulan,
      },
    });

    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function getLaporanPenjualanKotorBulanan({
  tahun,
}: { tahun?: string } = {}): Promise<LaporanPenjualanKotor[]> {
  try {
    const res = await api.get("/laporan-penjualan-kotor-bulanan", {
      params: {
        tahun: tahun,
      },
    });

    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function getLaporanKomisiProduk({
  bulan,
  tahun,
}: { bulan?: string; tahun?: string } = {}): Promise<KomisiProduk[]> {
  try {
    const res = await api.get("/laporan-komisi-produk", {
      params: {
        bulan,
        tahun,
      },
    });

    return res.data.data;
  } catch (error) {
    return [];
  }
}

export async function getLaporanStokGudang(): Promise<StokGudangItem[]> {
  try {
    const res = await api.get("/laporan-stok-gudang");

    return res.data.data;
  } catch (error) {
    return [];
  }
}