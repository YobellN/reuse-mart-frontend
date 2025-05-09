"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    category: "Keberlanjutan Lingkungan",
    title: "Mengurangi Limbah Lewat Penggunaan Kembali",
    image:
      "https://plus.unsplash.com/premium_photo-1683072005067-455d56d323b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHJlY3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    details:
      "ReuseMart hadir untuk menjawab persoalan lingkungan dengan cara memperpanjang usia pakai barang. Setiap transaksi jual beli barang bekas bukan cuma lebih hemat, tapi juga jadi langkah nyata untuk mengurangi timbunan sampah.",
  },
  {
    category: "Kemudahan & Kepedulian Sosial",
    title: "Sistem Penitipan dan Donasi yang Berdaya Guna",
    image:
      "https://images.unsplash.com/photo-1562709911-a355229de124?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details:
      "Lewat sistem penitipan, pengguna bisa menjual barang tanpa repot. Kalau tidak terjual, barang bisa disumbangkan ke organisasi sosial melalui proses yang adil dan transparan. Setiap barang yang didonasikan menjadi bentuk kepedulian yang berarti.",
  },
  {
    category: "Apresiasi & Insentif",
    title: "Dapatkan Poin, Hadiah, dan Apresiasi",
    image:
      "https://images.unsplash.com/photo-1688561807440-8a57dfa77ee3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details:
      "Baik pembeli maupun penitip akan mendapatkan poin dari setiap kontribusi mereka. Poin ini bisa ditukar dengan diskon atau merchandise, dan penitip dengan performa terbaik juga akan mendapatkan badge 'Top Seller' serta bonus bulanan.",
  },
  {
    category: "Transformasi Ekonomi Sirkular",
    title: "Mewujudkan Perubahan dari Barang Bekas",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    details:
      "Barang bekas bukanlah barang buangan. Di tangan yang tepat, barang tersebut bisa menjadi peluang baru—baik sebagai alat bantu orang lain maupun sumber penghasilan tambahan bagi pemilik sebelumnya. Inilah semangat ekonomi sirkular yang kami bawa.",
  },
];

interface FeatureSectionProps {
  category: string;
  title: string;
  image: string;
  details: string;
  reverse?: boolean;
}

export function FeatureSection({
  category,
  title,
  image,
  details,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className={`flex flex-col md:flex-row items-center gap-x-16 gap-y-6 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full aspect-[6/4] rounded-xl border border-border/50 basis-1/2 overflow-hidden relative">
        <Image src={image} alt="Image" fill className="object-cover" />
      </div>

      <div className="basis-1/2 shrink-0">
        <span className="uppercase font-semibold text-xs sm:text-sm text-green-600">
          {category}
        </span>
        <h4 className="my-3 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-green-800">
          {title}
        </h4>
        <p className="text-sm sm:text-base md:text-[17px] text-muted-foreground">
          {details}
        </p>
      </div>
    </motion.div>
  );
}

export default function MissionPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-24 bg-white">
      <div className="max-w-5/6 w-full px-0 flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl md:leading-[3.5rem] text-center font-bold tracking-tight md:max-w-4/5 md:mx-auto mt-0 mb-6 text-green-800"
        >
          Misi Kami: Inovasi dan Keberlanjutan
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg my-8 font-medium tracking-tight text-center max-w-full md:max-w-4/5 mx-0 md:mx-auto "
        >
          Kami percaya bahwa barang bekas bukanlah akhir dari nilai suatu benda.
          ReUseMart berdiri untuk menghubungkan masyarakat yang ingin mengurangi
          limbah dengan mereka yang membutuhkan, sembari menciptakan sistem yang
          adil, efisien, dan berdampak sosial.
        </motion.p>

        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature, index) => (
            <FeatureSection
              key={feature.category}
              category={feature.category}
              title={feature.title}
              image={feature.image}
              details={feature.details}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
