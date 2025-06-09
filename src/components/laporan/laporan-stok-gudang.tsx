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
import { StokGudangItem } from "@/services/laporan/schema-laporan";

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
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
    color: "#111827",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    fontSize: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4B5563",
  },
  value: {
    fontSize: 10,
    color: "#111827",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginVertical: 8,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 8,
    color: "#111827",
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

type NotaProps = { trx: StokGudangItem[] };

const NotaDocument: React.FC<NotaProps> = ({ trx }) => (
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
        <Text style={styles.subtitle}>{format(new Date(), "dd MMM yyyy")}</Text>
      </View>

      <View style={styles.headerSeparator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Laporan Stok Gudang</Text>
        <Text style={styles.value}>
          Tanggal Cetak : {format(new Date(), "dd MMM yyyy")}
        </Text>
      </View>

      {trx.length > 0 ? (
        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <View
            wrap={false}
            style={{ flexDirection: "row", backgroundColor: "#D1FAE5" }}
          >
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              Kode Produk
            </Text>
            <Text
              style={{
                flex: 2,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              Nama Produk
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              ID Penitip
            </Text>
            <Text
              style={{
                flex: 2,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              Nama Penitip
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              Tanggal Masuk
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              Perpanjangan
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              ID Hunter
            </Text>
            <Text
              style={{
                flex: 2,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              Nama Hunter
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 10,
                borderWidth: 1,
                borderColor: "#000",
                padding: 4,
              }}
            >
              Harga
            </Text>
          </View>

          {trx.map((item, idx) => (
            <View
              key={idx}
              wrap={false}
              style={{
                flexDirection: "row",
                backgroundColor: idx % 2 === 0 ? "#F0FDF4" : "#FFFFFF",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {item.kodeProduk}
              </Text>
              <Text
                style={{
                  flex: 2,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {item.namaProduk}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {item.idPenitip}
              </Text>
              <Text
                style={{
                  flex: 2,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {item.namaPenitip}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {format(new Date(item.tanggalMasuk), "dd/MM/yyyy")}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {item.perpanjangan}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {item.idHunter}
              </Text>
              <Text
                style={{
                  flex: 2,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {item.namaHunter}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 9,
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 4,
                }}
              >
                {`Rp${item.hargaProduk.toLocaleString("id-ID")}`}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.value}>Tidak Ada Data Stok Gudang</Text>
        </View>
      )}

      <Text style={styles.footerMarker}>
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

export function LaporanStokGudangButton({ trx }: { trx: StokGudangItem[] }) {
  return (
    <Button
      variant="outline"
      className="flex items-center px-4 py-2 hover:cursor-pointer"
      onClick={() => cetakLaporanStokGudang(trx)}
    >
      <Printer className="w-4 h-4 mr-2" />
      Unduh Laporan
    </Button>
  );
}

export async function cetakLaporanStokGudang(trx: StokGudangItem[]) {
  const blob = await pdf(<NotaDocument trx={trx} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `laporan-stok-gudang-${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
