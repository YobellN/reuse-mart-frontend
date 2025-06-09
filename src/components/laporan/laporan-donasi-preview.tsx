import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { DonasiLaporanSchema } from '@/services/donasi/schema-donasi';
import { getDonasiPerTahun } from '@/services/donasi/donasi-services';
import { Button } from '../ui/button';
import { Printer } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import logo from '../../../public/reuse-mart.png';

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
    marginBottom: 16,
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
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  value: {
    fontSize: 10,
    color: '#111827',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginVertical: 8,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#111827',
  },
  signatureSection: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  signatureBox: {
    width: '40%',
  },
  signatureLine: {
    marginTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
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
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#111827',
    marginBottom: 12,
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
    padding: 4,
    fontSize: 9,
  },
  tableCellLast: {
    borderRightWidth: 0,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#111827',
  },
});

// Komponen tabel PDF
const DonasiBarangTable: React.FC<{ data: DonasiLaporanSchema[] }> = ({ data }) => (
  <View style={tableStyles.table}>
    {/* Header */}
    <View style={[tableStyles.tableRow, tableStyles.tableHeader]}>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Kode Produk</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Nama Produk</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>ID Penitip</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Nama Penitip</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Tanggal Donasi</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Organisasi</Text>
      <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText, tableStyles.tableCellLast]}>Nama Penerima</Text>
    </View>
    {/* Data Rows */}
    {data.map((item, idx) => (
      <View style={tableStyles.tableRow} key={idx}>
        <Text style={tableStyles.tableCell}>{item.id_produk}</Text>
        <Text style={tableStyles.tableCell}>{item.nama_produk}</Text>
        <Text style={tableStyles.tableCell}>{item.id_penitip}</Text>
        <Text style={tableStyles.tableCell}>{item.nama_penitip}</Text>
        <Text style={tableStyles.tableCell}>{format(new Date(item.tanggal_donasi), 'd/M/yyyy')}</Text>
        <Text style={tableStyles.tableCell}>{item.nama_organisasi}</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableCellLast]}>{item.nama_penerima}</Text>
      </View>
    ))}
  </View>
);

type NotaProps = { trx: DonasiLaporanSchema };

const LaporanDonasi: React.FC<{ data: DonasiLaporanSchema[] }> = ({ data }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      {/* Header ReUse Mart */}
      <View style={styles.headerLeft}>
        <Image
          style={styles.logo}
          src={logo.src}
        />
        <View>
          <Text style={styles.title}>ReUse Mart</Text>
          <Text style={styles.subtitle}>
            Jl. Green Eco Park No. 456, Yogyakarta
          </Text>
        </View>
      </View>

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>LAPORAN Donasi Barang</Text>
      <Text style={styles.value}>Tahun: {new Date().getFullYear()}</Text>
      <Text style={styles.value}>Tanggal cetak: {format(new Date(), 'd MMM yyyy', { locale: id })}</Text>

      <View style={styles.separator} />

      {/* Tabel Donasi Barang */}
      <DonasiBarangTable data={data} />

      <Text style={styles.footerMarker}>
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);


export function LaporanDonasiPreview({ tahun }: { tahun: number }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<DonasiLaporanSchema[] | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = async () => {
    setLoading(true);
    setOpen(true);
    const res = await getDonasiPerTahun(tahun);
    setData(res);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setData(null);
  };

  return (
    <>
      <Button variant="outline" onClick={handleOpen}>
        Preview
      </Button>
      <Dialog open={open} onOpenChange={val => { if (!val) handleClose(); }}>
        <DialogContent className="max-w-5xl w-full p-0 flex flex-col items-center">
          <DialogHeader className="w-full">
            <DialogTitle className="text-green-700 text-xl text-center mb-1 mt-4">
              Laporan Donasi Barang Tahun {tahun}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 mb-3">
              Berikut adalah preview laporan donasi barang untuk tahun <span className="font-semibold">{tahun}</span>.
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <div className="p-8 text-center w-full">
              <Button variant="outline" disabled>
                Loading...
              </Button>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="p-8 text-center w-full text-gray-600">
              Tidak ada data donasi untuk tahun <span className="font-semibold">{tahun}</span>
            </div>
          ) : (
            <div className="w-full h-[70vh] flex justify-center items-center">
              <PDFViewer width="100%" height="100%" style={{ border: 'none', width: '100%', height: '100%', minHeight: 400 }}>
                <LaporanDonasi data={data} />
              </PDFViewer>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}