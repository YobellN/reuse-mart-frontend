'use client';

import React, { useState } from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  pdf,
  BlobProvider,
} from '@react-pdf/renderer';
import { Printer, Download } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from '../../../public/reuse-mart.png';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { PenitipTransaksiLaporanSchema } from '@/services/penitip_penjualan/schema-penitip_penjualan';
import { getIndonesianMonth } from '@/lib/utils/date';

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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  infoRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4B5563',
    width: 90,
  },
  infoValue: {
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
    padding: 4,
    fontSize: 9,
    textAlign: 'center',
    wordBreak: 'break-word',
  },
  tableCellLast: {
    borderRightWidth: 0,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 9,
    color: '#111827',
    textAlign: 'center',
    wordBreak: 'break-word',
  },
});

// Komponen tabel PDF
const TransaksiPenitipTable: React.FC<{ data: PenitipTransaksiLaporanSchema["data"] }> = ({ data }) => {
  // Hitung total
  const totalHargaJualBersih = data.reduce((sum, d) => sum + (d.harga_jual_bersih || 0), 0);
  const totalBonus = data.reduce((sum, d) => sum + (d.bonus_terjual_cepat || 0), 0);
  const totalPendapatan = data.reduce((sum, d) => sum + (d.pendapatan || 0), 0);

  return (
    <View style={tableStyles.table}>
      {/* Header */}
      <View style={[tableStyles.tableRow, tableStyles.tableHeader]}>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Kode Produk</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Nama Produk</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Tanggal Masuk</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Tanggal Laku</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Harga Jual Bersih</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>Bonus terjual cepat</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText, tableStyles.tableCellLast]}>Pendapatan</Text>
      </View>
      {/* Data Rows */}
      {data.map((item, idx) => (
        <View style={tableStyles.tableRow} key={idx}>
          <Text style={tableStyles.tableCell}>{item.kode_produk}</Text>
          <Text style={tableStyles.tableCell}>{item.nama_produk}</Text>
          <Text style={tableStyles.tableCell}>{item.tanggal_masuk ? format(new Date(item.tanggal_masuk), 'd/M/yyyy') : '-'}</Text>
          <Text style={tableStyles.tableCell}>{item.tanggal_laku ? format(new Date(item.tanggal_laku), 'd/M/yyyy') : '-'}</Text>
          <Text style={tableStyles.tableCell}>{item.harga_jual_bersih?.toLocaleString("id-ID")}</Text>
          <Text style={tableStyles.tableCell}>{item.bonus_terjual_cepat?.toLocaleString("id-ID")}</Text>
          <Text style={[tableStyles.tableCell, tableStyles.tableCellLast]}>{item.pendapatan?.toLocaleString("id-ID")}</Text>
        </View>
      ))}
      {/* Total Row */}
      <View style={tableStyles.tableRow}>
        <Text style={[tableStyles.tableCell, tableStyles.tableHeaderText]}>TOTAL</Text>
        <Text style={tableStyles.tableCell}></Text>
        <Text style={tableStyles.tableCell}></Text>
        <Text style={tableStyles.tableCell}></Text>
        <Text style={tableStyles.tableCell}>{totalHargaJualBersih.toLocaleString("id-ID")}</Text>
        <Text style={tableStyles.tableCell}>{totalBonus.toLocaleString("id-ID")}</Text>
        <Text style={[tableStyles.tableCell, tableStyles.tableCellLast]}>{totalPendapatan.toLocaleString("id-ID")}</Text>
      </View>
    </View>
  );
};

const LaporanTransaksiPenitip: React.FC<{ data: PenitipTransaksiLaporanSchema }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
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

      <Text style={styles.sectionTitle}>LAPORAN TRANSAKSI PENITIP</Text>

      {/* Info Penitip */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>ID Penitip</Text>
        <Text style={styles.infoValue}>: {data.id_penitip}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Nama Penitip</Text>
        <Text style={styles.infoValue}>: {data.nama_penitip}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Bulan</Text>
        <Text style={styles.infoValue}>: {getIndonesianMonth(data.bulan)}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Tahun</Text>
        <Text style={styles.infoValue}>: {data.tahun}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Tanggal Cetak</Text>
        <Text style={styles.infoValue}>: {format(new Date(), "d MMMM yyyy", { locale: id })}</Text>
      </View>

      <View style={styles.separator} />

      {/* Tabel Transaksi Penitip */}
      <TransaksiPenitipTable data={data.data} />

      <Text style={styles.footerMarker}>
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

// Komponen Modal Preview PDF
const PDFPreviewModal = ({ 
  isOpen, 
  setIsOpen, 
  data 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void; 
  data: PenitipTransaksiLaporanSchema 
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-6">
        <DialogHeader>
          <DialogTitle>Preview Laporan Transaksi Penitip</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-1 h-full min-h-0">
          <BlobProvider document={<LaporanTransaksiPenitip data={data} />}>
            {({ url }) => (
              <>
                <div className="flex-1 w-full min-h-0 overflow-hidden bg-gray-100 rounded-md">
                  {/* PDF Container dengan aspect ratio A4 */}
                  <div 
                    className="relative w-full h-full"
                    style={{
                      aspectRatio: '1 / 1.4142', // A4 aspect ratio
                    }}
                  >
                    <iframe
                      src={url as string}
                      className="absolute inset-0 w-full h-full"
                      style={{
                        transform: 'scale(0.95)', // Slightly scale down for margins
                        transformOrigin: 'center',
                        border: 'none',
                      }}
                      title="PDF Preview"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => cetakLaporanTransaksiPenitip(data)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Unduh PDF
                  </Button>
                </div>
              </>
            )}
          </BlobProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Tombol download PDF laporan transaksi penitip
export function LaporanTransaksiPenitipPreviewButton({ data }: { data: PenitipTransaksiLaporanSchema }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isDataEmpty = !data || !data.data || data.data.length === 0;

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setIsPreviewOpen(true)}
        disabled={isDataEmpty}
        title={isDataEmpty ? "Tidak ada data untuk ditampilkan" : "Lihat preview laporan"}
      >
        <Printer className="w-1 h-1 mr-2" />
        {isDataEmpty ? "Data Kosong" : "Preview Laporan"}
      </Button>

      <PDFPreviewModal
        isOpen={isPreviewOpen}
        setIsOpen={setIsPreviewOpen}
        data={data}
      />
    </>
  );
}

export async function cetakLaporanTransaksiPenitip(data: PenitipTransaksiLaporanSchema) {
  const blob = await pdf(<LaporanTransaksiPenitip data={data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `laporan-transaksi-penitip-${data.id_penitip}-${data.bulan}-${data.tahun}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
