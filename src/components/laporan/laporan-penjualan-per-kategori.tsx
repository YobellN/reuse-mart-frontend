'use client';

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
import { format } from 'date-fns';
import { Printer } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '../../../public/reuse-mart.png';
import { PenjualanPerKategori } from '@/services/laporan/schema-laporan';

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
    fontSize: 10,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
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

type NotaProps = { trx: PenjualanPerKategori[], tahun: string };

const NotaDocument: React.FC<NotaProps> = ({ trx, tahun }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
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
        <Text style={styles.subtitle}>
          {format(new Date(), 'dd MMM yyyy')}
        </Text>
      </View>

      <View style={styles.headerSeparator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Laporan Penjualan Per Kategori Barang</Text>
        <Text style={styles.value}>
          Tahun : {tahun}
        </Text>
        <Text style={styles.value}>
          Tanggal Cetak : {format(new Date(), 'dd MMM yyyy')}
        </Text>
      </View>
      {
        trx.length > 0 ? (<View>
          <View style={[styles.headerRow, { backgroundColor: '#D1FAE5', paddingVertical: 4 }]}>
            <Text style={[ { flex: 2 }]}>Kategori</Text>
            <Text style={[ { flex: 1, textAlign: 'center' }]}>Jumlah Item Terjual</Text>
            <Text style={[{ flex: 1, textAlign: 'center' }]}>Jumlah Item Gagal Terjual</Text>
          </View>
          {trx.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={{ flex: 2 }}>{item.nama_kategori}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{item.jumlah_item_terjual}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{item.jumlah_item_gagal_terjual}</Text>
            </View>
          ))}
          <View style={[styles.row, { borderTopWidth: 1, borderTopColor: '#D1FAE5', marginTop: 8, paddingTop: 4 }]}>
            <Text style={[styles.label, { flex: 2 }]}>Total</Text>
            <Text style={[styles.label,{ flex: 1, textAlign: 'center' }]}>{trx.reduce((sum, item) => sum + Number(item.jumlah_item_terjual), 0)} Produk</Text>
            <Text style={[styles.label,{ flex: 1, textAlign: 'center' }]}>{trx.reduce((sum, item) => sum + Number(item.jumlah_item_gagal_terjual), 0)} Produk</Text>
          </View>
        </View>) : (
          <View style={styles.section}>
            <Text style={styles.value}>
              Tidak Ada Data Penjualan
            </Text>
          </View>
        )
      }

      <Text style={styles.footerMarker}>
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

export function LaporanPenjualanPerKategori({ trx, tahun }: NotaProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center px-4 py-2 hover:cursor-pointer"
      onClick={() => cetakLaporanPenjualanPerKategori({ trx, tahun })}
    >
      <Printer className="w-4 h-4 mr-2" />
      Unduh Laporan
    </Button>
  );
}

export async function cetakLaporanPenjualanPerKategori({ trx, tahun }: NotaProps) {
  const blob = await pdf(<NotaDocument trx={trx} tahun={tahun} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `laporan-penjualan-per-kategori-${tahun}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}