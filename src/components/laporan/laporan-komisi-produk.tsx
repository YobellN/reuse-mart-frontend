"use client";

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../../public/reuse-mart.png";
import { KomisiProduk } from "@/services/laporan/schema-laporan";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ECFDF5",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#D1FAE5",
    marginBottom: 16,
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
    marginBottom: 4,
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

const tableStyle = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    fontSize: 9,
    borderWidth: 1,
    borderColor: "#000",
    padding: 4,
    textAlign: "center",
  },
  header: {
    backgroundColor: "#D1FAE5",
    fontWeight: "bold",
  },
  total: {
    backgroundColor: "#DCFCE7",
    fontWeight: "bold",
  },
});

type Props = {
  data: KomisiProduk[];
  bulan: string;
  tahun: string;
};

const KomisiProdukDocument: React.FC<Props> = ({ data, bulan, tahun }) => {
  const total = {
    hargaJual: data.reduce((sum, item) => sum + item.hargaJual, 0),
    komisiHunter: data.reduce((sum, item) => sum + item.komisiHunter, 0),
    komisiReuseMart: data.reduce((sum, item) => sum + item.komisiReuseMart, 0),
    bonusPenitip: data.reduce((sum, item) => sum + item.bonusPenitip, 0),
  };

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.logo} src={logo.src} />
            <View>
              <Text style={styles.title}>ReUse Mart</Text>
              <Text style={styles.subtitle}>
                Jl. Green Eco Park No. 456, Yogyakarta
              </Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            {format(new Date(), "dd MMM yyyy")}
          </Text>
        </View>

        <View style={styles.headerSeparator} />

        <Text style={styles.sectionTitle}>Laporan Komisi Per Produk</Text>
        <Text style={styles.value}>
          Bulan:{" "}
          {new Date(2025, Number(bulan) - 1).toLocaleString("id-ID", {
            month: "long",
          })}
        </Text>
        <Text style={styles.value}>Tahun: {tahun}</Text>

        <Text style={styles.value}>
          Tanggal Cetak: {format(new Date(), "dd MMM yyyy")}
        </Text>

        <View style={[tableStyle.row, tableStyle.header]}>
          {[
            "Kode Produk",
            "Nama Produk",
            "Harga Jual",
            "Tanggal Masuk",
            "Tanggal Laku",
            "Komisi Hunter",
            "Komisi Reuse Mart",
            "Bonus Penitip",
          ].map((header, i) => (
            <Text style={tableStyle.cell} key={i}>
              {header}
            </Text>
          ))}
        </View>

        {data.map((item, idx) => (
          <View style={tableStyle.row} key={idx} wrap={false}>
            <Text style={tableStyle.cell}>{item.kodeProduk}</Text>
            <Text style={tableStyle.cell}>{item.namaProduk}</Text>
            <Text style={tableStyle.cell}>{`Rp${item.hargaJual.toLocaleString(
              "id-ID"
            )}`}</Text>
            <Text style={tableStyle.cell}>{item.tanggalMasuk}</Text>
            <Text style={tableStyle.cell}>{item.tanggalLaku}</Text>
            <Text
              style={tableStyle.cell}
            >{`Rp${item.komisiHunter.toLocaleString("id-ID")}`}</Text>
            <Text
              style={tableStyle.cell}
            >{`Rp${item.komisiReuseMart.toLocaleString("id-ID")}`}</Text>
            <Text
              style={tableStyle.cell}
            >{`Rp${item.bonusPenitip.toLocaleString("id-ID")}`}</Text>
          </View>
        ))}

        <View style={[tableStyle.row, tableStyle.total]}>
          <Text style={[tableStyle.cell, { flex: 2.1 }]}>Total</Text>
          <Text style={tableStyle.cell}>{`Rp${total.hargaJual.toLocaleString(
            "id-ID"
          )}`}</Text>
          <Text style={tableStyle.cell}></Text>
          <Text style={tableStyle.cell}></Text>
          <Text style={tableStyle.cell}>{`Rp${total.komisiHunter.toLocaleString(
            "id-ID"
          )}`}</Text>
          <Text
            style={tableStyle.cell}
          >{`Rp${total.komisiReuseMart.toLocaleString("id-ID")}`}</Text>
          <Text style={tableStyle.cell}>{`Rp${total.bonusPenitip.toLocaleString(
            "id-ID"
          )}`}</Text>
        </View>

        <Text style={styles.footerMarker}>
          ReUse Mart © {new Date().getFullYear()}
        </Text>
      </Page>
    </Document>
  );
};

export async function cetakLaporanKomisiProduk({ data, bulan, tahun }: Props) {
  const blob = await pdf(
    <KomisiProdukDocument data={data} bulan={bulan} tahun={tahun} />
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `laporan-komisi-per-produk-${tahun}-${bulan}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function DownloadKomisiProdukButton({ data, bulan, tahun }: Props) {
  return (
    <Button
      variant="outline"
      className="flex items-center px-4 py-2"
      onClick={() => cetakLaporanKomisiProduk({ data, bulan, tahun })}
    >
      <Printer className="w-4 h-4 mr-2" />
      Unduh Laporan
    </Button>
  );
}
