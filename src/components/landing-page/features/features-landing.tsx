"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { BookCheck, ChartPie, Goal, Users } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Goal,
    title: "Ekosistem Jual Beli Terintegrasi",
    image: "/landing/buying.png",
    description:
      "ReuseMart menghadirkan platform jual beli barang bekas yang menyatukan penitip, pembeli, dan mitra sosial dalam satu sistem efisien, transparan, dan terpercaya.",
  },
  {
    icon: BookCheck,
    title: "Proses Penitipan Mudah & Aman",
    image: "/landing/penitipan.png",
    description:
      "Cukup titipkan barang bekas Anda ke gudang kami, tim ReuseMart yang akan mengurus pemasaran, penjualan, hingga pengiriman. Anda cukup duduk santai dan tunggu hasilnya.",
  },
  {
    icon: ChartPie,
    title: "Sistem Reward & Donasi Sosial",
    image: "/landing/reward.png",
    description:
      "Dapatkan poin reward dari pembelian, penjualan cepat, dan bahkan donasi barang. Tukarkan poin dengan merchandise menarik atau gunakan untuk potongan belanja.",
  },
  {
    icon: Users,
    title: "Transparansi & Kepercayaan Pengguna",
    image: "/landing/transparansi.png",
    description:
      "Dengan sistem rating penitip, status barang real-time, dan QC ketat di gudang, ReuseMart memastikan semua pihak mendapat pengalaman terbaik dalam transaksi barang bekas.",
  },
];

type FeatureType = {
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
};

export function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureType;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -50px 0px",
  });

  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.4,
        ease: "easeOut",
      }}
    >
      <Card className="relative min-h-[20rem] flex flex-col justify-between rounded-xl overflow-hidden border border-green-200 shadow-none bg-gradient-to-br from-green-50 via-white to-white transition-all duration-300 ease-in-out hover:shadow-lg hover:border-green-500 hover:-translate-y-1">
        <Image
          src={feature.image}
          alt="reuse-mart"
          width={150}
          height={150}
          className="absolute bottom-0 right-0 pointer-events-none scale-[0.8] sm:scale-90 md:scale-100 origin-bottom-right transition-transform duration-300"
        />

        <CardHeader className="mb-24 sm:mb-0">
          <Icon className="text-green-700" />
          <h4 className="mt-1 mb-0 text-xl font-semibold tracking-tight text-green-700">
            {feature.title}
          </h4>
          <p className="mt-1 text-green-600 text-[17px]">
            {feature.description}
          </p>
        </CardHeader>
      </Card>
    </motion.div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-screen-lg w-full pt-12 pb-24 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center mt-0 mb-6 md:mb-6 text-green-800">
          Fitur Cerdas untuk Jual Beli Barang Bekas
        </h2>
        <p className="text-lg my-8 font-medium tracking-tight text-center">
          Dari proses penitipan hingga pengiriman, ReuseMart dirancang untuk
          memberikan pengalaman yang praktis, transparan, dan menyenangkan bagi
          semua pengguna—baik Anda sebagai penitip, pembeli, maupun mitra
          sosial.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
