import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { Penitipan } from "@/services/penitipan/schema-penitipan";
import { format } from "date-fns";
import { id } from "date-fns/locale/id";
import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../../public/reuse-mart.png";

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
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4B5563",
  },
  value: {
    fontSize: 10,
    color: "#111827",
    marginVertical: 4,
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
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
    color: "#111827",
  },
  signatureSection: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  signatureBox: {
    width: "30%",
  },
  signatureLine: {
    marginTop: 60,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
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

type NotaProps = { trx: Penitipan };

const NotaDocument: React.FC<NotaProps> = ({ trx }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
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
        {[
          ["No. Nota", trx.id_penitipan],
          [
            "Tanggal Penitipan",
            format(new Date(trx.tanggal_penitipan), "dd MMM yyyy, HH:mm", {
              locale: id,
            }),
          ],
          [
            "Masa Penitipan Sampai",
            format(new Date(trx.tenggat_penitipan), "dd MMM yyyy, HH:mm", {
              locale: id,
            }),
          ],
        ].map(([label, value], idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Penitip</Text>
        {["Nama", "ID"].map((field, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{field}</Text>
            <Text style={styles.value}>
              {
                {
                  Nama: trx.nama_penitip,
                  ID: trx.id_penitip,
                }[field]
              }
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status Hunting</Text>
        <Text style={styles.value}>
          {trx.id_hunter
            ? `Produk Hunting \nHunter: ${trx.id_hunter} - ${trx.nama_hunter}`
            : `Bukan Produk Hunting`}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detail Produk Titipan</Text>

        {trx.produk_titipan.map((item, idx) => (
          <View key={idx} style={styles.productRow}>
            <Text style={styles.value}>
              {item.nama_produk}
              {"\n"}
              {item.waktu_garansi
                ? `Garansi hingga: ${item.waktu_garansi}`
                : "Tanpa garansi"}
            </Text>
            <Text style={styles.value}>
              Rp{item.harga_produk.toLocaleString("id-ID")}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <Text style={styles.label}>Diterima dan QC Oleh:</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.value}>
            {trx.id_qc} - {trx.nama_qc}
          </Text>
        </View>
      </View>

      <Text style={styles.footerMarker}>
        Terima kasih telah berbelanja di ReUse Mart. Sikahkan kontak customer
        service kami untuk pertanyaan lebih lanjut. {"\n"}
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

export function NotaPenitipanPDF({ trx }: NotaProps) {
  return (
    <PDFDownloadLink
      document={<NotaDocument trx={trx} />}
      fileName={`nota-${trx.id_penitipan}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <Button variant="ghost" className="px-4 py-2">
            Loading...
          </Button>
        ) : (
          <Button variant="ghost" className="flex items-center px-4 py-2">
            <Printer className="w-4 h-4 mr-2" />
            Download Nota
          </Button>
        )
      }
    </PDFDownloadLink>
  );
}

export async function downloadNotaPenitipan({ trx }: NotaProps) {
  const blob = await pdf(<NotaDocument trx={trx} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `nota-${trx.id_penitipan}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
