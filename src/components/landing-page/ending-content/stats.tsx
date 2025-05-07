"use client";
import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedNumber = ({
  target,
  color,
}: {
  target: number;
  color: string;
}) => {
  const [value, setValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const duration = 1500;
    const increment = end / (duration / 16);

    const step = () => {
      start += increment;
      if (start < end) {
        setValue(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className={`text-5xl md:text-6xl font-bold ${color}`}>
      {value.toLocaleString()}+
    </span>
  );
};

const StatisticCard = ({
  target,
  title,
  desc,
  color,
  index,
}: {
  target: number;
  title: string;
  desc: string;
  color: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="text-center sm:text-left"
    >
      <AnimatedNumber target={target} color={color} />
      <p className="mt-4 font-semibold text-xl">{title}</p>
      <p className="mt-2 text-[17px] text-muted-foreground">{desc}</p>
    </motion.div>
  );
};

const StatisticsPage = () => {
  const stats = [
    {
      target: 12300,
      title: "Barang Bekas Terjual",
      desc: "Barang layak pakai yang menemukan pemilik baru dan tidak jadi sampah.",
      color: "text-emerald-600",
    },
    {
      target: 3200,
      title: "Barang Didonasikan",
      desc: "Barang-barang tak terjual yang disalurkan ke organisasi sosial dan warga.",
      color: "text-rose-600",
    },
    {
      target: 7800,
      title: "Pengguna Aktif",
      desc: "Penitip, pembeli, kurir, dan relawan yang terlibat dalam ekosistem ReUseMart.",
      color: "text-green-600",
    },
    {
      target: 45,
      title: "Organisasi Penerima Donasi",
      desc: "Lembaga sosial, yayasan, dan komunitas yang terbantu dari program donasi barang.",
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-start pt-24 pb-24 bg-green-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-screen-xl mx-auto w-full px-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center text-green-800 mt-0 mb-6">
          Dampak Nyata ReUseMart
        </h2>
        <p className="mt-6 text-lg max-w-full text-center mx-auto text-black">
          Bersama pengguna dan mitra, kami terus mendorong pemanfaatan barang
          bekas, mengurangi limbah, dan menyalurkan bantuan ke mereka yang
          membutuhkan.
        </p>

        <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 justify-center">
          {stats.map((stat, index) => (
            <StatisticCard key={stat.title} index={index} {...stat} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;
