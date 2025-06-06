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
import { BarangHangus, PenjualanPerKategori } from '@/services/laporan/schema-laporan';

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
    fontSize: 9,
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
    fontSize: 9,
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

type NotaProps = { trx: BarangHangus[], tahun: string, bulan: string };

const NotaDocument: React.FC<NotaProps> = ({ trx, tahun, bulan }) => (
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
        <Text style={styles.sectionTitle}>Laporan Barang Hangus</Text>
        <Text style={styles.value}>
          Bulan : {bulan} ({new Date().toLocaleString('id-ID', { month: 'long' })})
        </Text>
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
            <Text style={[{ flex: 2, textAlign: 'center' }]}>Kode Produk</Text>
            <Text style={[{ flex: 3, textAlign: 'center' }]}>Nama Produk</Text>
            <Text style={[{ flex: 2, textAlign: 'center' }]}>ID Penitip</Text>
            <Text style={[{ flex: 3, textAlign: 'center' }]}>Nama Penitip</Text>
            <Text style={[{ flex: 2, textAlign: 'center' }]}>Tanggal Masuk</Text>
            <Text style={[{ flex: 2, textAlign: 'center' }]}>Tanggal Akhir</Text>
            <Text style={[{ flex: 2, textAlign: 'center' }]}>Batas Ambil</Text>
          </View>
          {trx.map((item, idx) => (
            <View key={idx} style={styles.row}>
              <Text style={{ flex: 2, textAlign: 'center', fontSize: 9 }}>{item.id_produk}</Text>
              <Text style={{ flex: 3, textAlign: 'center', fontSize: 9 }}>{item.nama_produk}</Text>
              <Text style={{ flex: 2, textAlign: 'center', fontSize: 9 }}>{item.id_penitip}</Text>
              <Text style={{ flex: 3, textAlign: 'center' , fontSize: 9}}>{item.nama_penitip}</Text>
              <Text style={{ flex: 2, textAlign: 'center' , fontSize: 9}}>
                {item.tanggal_penitipan ? format(new Date(item.tanggal_penitipan), 'dd/M/yyyy') : ''}
              </Text>
              <Text style={{ flex: 2, textAlign: 'center' , fontSize: 9}}>
                {item.tenggat_penitipan ? format(new Date(item.tenggat_penitipan), 'dd/M/yyyy') : ''}
              </Text>
              <Text style={ { flex: 2, textAlign: 'center', fontSize: 9 }}>
                {item.tenggat_pengambilan ? format(new Date(item.tenggat_pengambilan), 'dd/M/yyyy') : ''}
              </Text>
            </View>
          ))}
        </View>) : (
          <View style={styles.section}>
            <Text style={styles.value}>
              Tidak Ada Data Untuk Tanggal Ini
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

export function LaporanBarangHangus({ trx, tahun, bulan }: NotaProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center px-4 py-2 hover:cursor-pointer"
      onClick={() => cetakLaporanBarangHangus({ trx, tahun, bulan })}
    >
      <Printer className="w-4 h-4 mr-2" />
      Unduh Laporan
    </Button>
  );
}

export async function cetakLaporanBarangHangus({ trx, tahun, bulan }: NotaProps) {
  const blob = await pdf(<NotaDocument trx={trx} tahun={tahun} bulan={bulan} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `laporan-penjualan-per-kategori-${tahun}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}