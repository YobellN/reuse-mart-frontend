"use client";

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import { LaporanPenjualanKotor } from "@/services/laporan/schema-laporan";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ECFDF5",
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16A34A",
  },
  subtitle: {
    fontSize: 10,
    color: "#6B7280",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
    color: "#111827",
  },
  value: {
    fontSize: 10,
    color: "#111827",
    marginBottom: 2,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#D1FAE5",
    fontSize: 10,
    fontWeight: "bold",
  },
  dataRow: {
    flexDirection: "row",
    fontSize: 9,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
  },
  footerMarker: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#4B5563",
    opacity: 0.5,
  },
});

const bulanMap: Record<string, string> = {
  January: "Januari",
  February: "Februari",
  March: "Maret",
  April: "April",
  May: "Mei",
  June: "Juni",
  July: "Juli",
  August: "Agustus",
  September: "September",
  October: "Oktober",
  November: "November",
  December: "Desember",
};

type Props = {
  trx: LaporanPenjualanKotor[];
  tahun: string;
};

const NotaDocument: React.FC<Props> = ({ trx, tahun }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>ReUse Mart</Text>
      <Text style={styles.subtitle}>
        Jl. Green Eco Park No. 456, Yogyakarta
      </Text>

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Laporan Penjualan Bulanan</Text>
      <Text style={styles.value}>Tahun: {tahun}</Text>
      <Text style={styles.value}>
        Tanggal Cetak: {format(new Date(), "dd MMM yyyy")}
      </Text>

      <View style={styles.separator} />

      <View style={styles.headerRow}>
        <Text style={styles.cell}>Bulan</Text>
        <Text style={styles.cell}>Jumlah Barang Terjual</Text>
        <Text style={styles.cell}>Jumlah Penjualan Kotor</Text>
      </View>

      {trx.map((item, idx) => (
        <View style={styles.dataRow} key={idx}>
          <Text style={styles.cell}>{bulanMap[item.bulan] || item.bulan}</Text>
          <Text style={styles.cell}>{item.jumlah_barang_terjual} Produk</Text>
          <Text style={styles.cell}>
            Rp{Number(item.jumlah_penjualan_kotor).toLocaleString("id-ID")}
          </Text>
        </View>
      ))}

      <View style={[styles.dataRow, { backgroundColor: "#DCFCE7" }]}>
        <Text style={styles.cell}>Total</Text>
        <Text style={styles.cell}>
          {trx.reduce((sum, i) => sum + Number(i.jumlah_barang_terjual), 0)}{" "}
          Produk
        </Text>
        <Text style={styles.cell}>
          Rp
          {trx
            .reduce((sum, i) => sum + Number(i.jumlah_penjualan_kotor), 0)
            .toLocaleString("id-ID")}
        </Text>
      </View>

      <Text style={styles.footerMarker}>
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

export async function cetakLaporanPenjualanBulanan(
  trx: LaporanPenjualanKotor[],
  tahun: string
) {
  const blob = await pdf(<NotaDocument trx={trx} tahun={tahun} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `laporan-penjualan-bulanan-${tahun}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function LaporanPenjualanBulananDownloadButton({ trx, tahun }: Props) {
  return (
    <Button
      variant="outline"
      className="flex items-center px-4 py-2 hover:cursor-pointer"
      onClick={() => cetakLaporanPenjualanBulanan(trx, tahun)}
    >
      <Printer className="w-4 h-4 mr-2" />
      Unduh Laporan
    </Button>
  );
}
