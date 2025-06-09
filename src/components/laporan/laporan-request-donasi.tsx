import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  pdf,
} from '@react-pdf/renderer';
import { Printer } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '../../../public/reuse-mart.png';
import { getRekapRequest } from '@/services/donasi/donasi-services';
import { DonasiRequestLaporanSchema } from '@/services/donasi/schema-donasi';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ECFDF5',
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  subtitle: {
    fontSize: 10,
    color: '#6B7280',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    color: '#111827',
  },
  value: {
    fontSize: 10,
    color: '#111827',
  },
  footerMarker: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#4B5563',
    opacity: 0.5,
  },
});

const tableStyles = StyleSheet.create({
  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#111827',
    marginBottom: 12,
    tableLayout: 'fixed',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#D1FAE5',
  },
  tableCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
    padding: 6,
    fontSize: 9,
    textAlign: 'center',
    justifyContent: 'center',
  },
  tableCellLast: {
    borderRightWidth: 0,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#111827',
    textAlign: 'center',
  },
});

// Komponen tabel PDF
const RequestDonasiTable: React.FC<{ data: DonasiRequestLaporanSchema[] }> = ({ data }) => (
  <View style={tableStyles.table}>
    {/* Header */}
    <View style={[tableStyles.tableRow, tableStyles.tableHeader]}>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>ID Organisasi</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Nama</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Alamat</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText, tableStyles.tableCellLast]}>Request</Text>
    </View>
    {/* Data Rows */}
    {data.map((item, idx) => (
      <View style={tableStyles.tableRow} key={idx}>
        <Text style={tableStyles.tableCell}>{item.id_organisasi}</Text>
        <Text style={tableStyles.tableCell}>{item.nama_organisasi}</Text>
        <Text style={tableStyles.tableCell}>{item.alamat_organisasi}</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableCellLast]}>{item.request}</Text>
      </View>
    ))}
  </View>
);

const LaporanRequestDonasi: React.FC<{ data: DonasiRequestLaporanSchema[] }> = ({ data }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Header ReUse Mart */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ReUse Mart</Text>
          <Text style={styles.subtitle}>Jl. Green Eco Park No. 456 Yogyakarta</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>LAPORAN Request Donasi</Text>
      <Text style={styles.value}>
        Tanggal cetak: {format(new Date(), "d MMMM yyyy", { locale: id })}
      </Text>

      <View style={styles.separator} />

      {/* Tabel Request Donasi */}
      <RequestDonasiTable data={data} />

      <Text style={styles.footerMarker}>
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

// Tombol download PDF laporan request donasi
export function LaporanRequestDonasiDownloadButton() {
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const data = await getRekapRequest();
      const blob = await pdf(<LaporanRequestDonasi data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laporan-request-donasi.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800"
      onClick={handleDownload}
      disabled={loading}
    >
      <Printer className="w-4 h-4 mr-2" />
      {loading ? "Loading..." : "Download Laporan Request Donasi"}
    </Button>
  );
}