import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Image,
  pdf,
} from '@react-pdf/renderer';
import { Penjualan } from '@/services/penjualan/schema-penjualan';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { Printer } from 'lucide-react';
import { Button } from '../ui/button';
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

type NotaProps = { trx: Penjualan };

const NotaDocument: React.FC<NotaProps> = ({ trx }) => (
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
        {[
          ['No. Nota', trx.id_penjualan],
          [
            'Tanggal Pesan',
            format(new Date(trx.tanggal_penjualan), 'dd MMM yyyy, HH:mm', {
              locale: id,
            }),
          ],
          [
            'Lunas Pada',
            format(
              new Date(trx.pembayaran?.tanggal_pembayaran as string),
              'dd MMM yyyy, HH:mm',
              { locale: id }
            ),
          ],
          [
            trx.metode_pengiriman === 'Antar Kurir' ? 'Tanggal Kirim' : 'Tanggal Ambil',
            format(
              new Date(
                trx.metode_pengiriman === 'Antar Kurir'
                  ? trx.pengiriman?.jadwal_pengiriman as string
                  : trx.jadwal_pengambilan as string
              ),
              'dd MMM yyyy',
              { locale: id }
            )
          ]
        ].map(([label, value], idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pembeli</Text>
        {['Nama', 'Email', 'Telp'].map((field, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.label}>{field}</Text>
            <Text style={styles.value}>
              {
                {
                  Nama: trx.pembeli?.user.nama,
                  Email: trx.pembeli?.user.email,
                  Telp: trx.pembeli?.user.no_telp,
                }[field]
              }
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pengiriman</Text>
        <Text style={styles.value}>
          {trx.metode_pengiriman === 'Antar Kurir'
            ? `Antar Kurir: ${trx.pengiriman?.kurir.user.nama} \n${trx.pengiriman?.alamat.label}, ${trx.pengiriman?.alamat.detail_alamat}`
            : `Ambil di Gudang: \n${format(
              new Date(
                trx.jadwal_pengambilan ?? trx.tanggal_penjualan
              ),
              'dd MMM yyyy',
              { locale: id }
            )}`}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detail Produk</Text>
        {trx.detail.map((item, idx) => (
          <View key={idx} style={styles.productRow}>
            <Text style={styles.value}>{item.produk.nama_produk}</Text>
            <Text style={styles.value}>
              Rp{item.produk.harga_produk.toLocaleString('id-ID')}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>
            Rp{trx.detail
              .reduce((sum, p) => sum + p.produk.harga_produk, 0)
              .toLocaleString('id-ID')}
          </Text>
        </View>
        {trx.poin_potongan > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Potongan Poin</Text>
            <Text style={styles.value}>
              - Rp{(trx.poin_potongan / 100 * 10000).toLocaleString('id-ID')}
            </Text>
          </View>
        )}
        {trx.metode_pengiriman === 'Antar Kurir' && (
          <View style={styles.row}>
            <Text style={styles.label}>Ongkos Kirim</Text>
            <Text style={styles.value}>
              Rp{trx.total_ongkir?.toLocaleString('id-ID')}
            </Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text>Total Bayar</Text>
          <Text>Rp{trx.total_harga.toLocaleString('id-ID')}</Text>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Poin</Text>
        <Text style={styles.value}>
          Poin perolehan: {trx.poin_perolehan}
        </Text>
        <Text style={styles.value}>
          Total poin: {trx.total_poin}
        </Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <Text style={styles.label}>
            {trx.metode_pengiriman === 'Antar Kurir'
              ? 'Diterima oleh'
              : 'Diambil oleh'}
          </Text>
          <View style={styles.signatureLine} />
        </View>
        <View style={[styles.signatureBox, { marginLeft: 60 }]}>n
          <Text style={styles.label}>Tanggal</Text>
          <View style={styles.signatureLine} />
        </View>
      </View>

      <Text style={styles.footerMarker}>
        Terima kasih telah berbelanja di ReUse Mart. Sikahkan kontak customer service kami untuk pertanyaan lebih lanjut. {'\n'}
        ReUse Mart © {new Date().getFullYear()}
      </Text>
    </Page>
  </Document>
);

export function NotaTransaksiPDF({ trx }: NotaProps) {
  return (
    <PDFDownloadLink
      document={<NotaDocument trx={trx} />}
      fileName={`nota-${trx.id_penjualan}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <Button variant="ghost" className="px-4 py-2">
            Loading...
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="flex items-center px-4 py-2"
          >
            <Printer className="w-4 h-4 mr-2" />
            Download Nota
          </Button>
        )
      }
    </PDFDownloadLink>
  );
}

export async function downloadNotaTransaksi({ trx }: NotaProps) {
  const blob = await pdf(<NotaDocument trx={trx} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nota-${trx.id_penjualan}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}