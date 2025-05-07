"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const features = [
  {
    title: "Limbah Rumah Tangga yang Terus Meningkat",
    image:
      "https://images.unsplash.com/photo-1612965110667-4175024b0dcc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Sebanyak 34,5% dari 18,2 juta ton sampah tahunan di Indonesia berasal dari rumah tangga. Banyak di antaranya berupa barang yang sebenarnya masih layak pakai. [KLHK, 2022]",
  },
  {
    title: "Barang Bekas Tak Tersalurkan",
    image:
      "https://images.unsplash.com/photo-1516382461343-35e1ba016e01?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    description:
      "Banyak orang memiliki barang bekas yang masih bagus, namun bingung harus diapakan atau tidak punya waktu untuk menjualnya.",
  },
  {
    title: "Rendahnya Praktik Ekonomi Sirkular",
    image:
      "https://images.unsplash.com/photo-1666804830091-56ba0e22becf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    description:
      "Meski kampanye reuse dan recycle sudah dikenal luas, penerapan ekonomi sirkular di kehidupan sehari-hari masih rendah.",
  },
];

const ChallengeCard = function ChallengeCard({
  title,
  image,
  description,
  index,
}: {
  title: string;
  image: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{
        type: "tween",
        ease: [0.25, 0.8, 0.25, 1],
        duration: 0.6,
        delay: 0.4 + index * 0.25,
      }}
      className="relative flex flex-col text-start rounded-xl overflow-hidden bg-white shadow-md border border-green-200 hover:border-green-500 transition-all duration-300 ease-in-out hover:shadow-lg"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover w-full h-full absolute z-0"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/95 to-transparent" />

      <div className="relative z-20 p-5 grid place-content-end">
        <div className="h-42"></div>
        <h3 className="text-2xl font-semibold tracking-tight text-green-700 mb-2">
          {title}
        </h3>
        <p className="text-green-600 text-md text-justify max-w-[25ch]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function ChallengesPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
      className="min-h-screen flex items-center justify-center pt-24 pb-24 bg-green-50 px-6"
    >
      <div className="w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-center mt-0 mb-6 md:mb-6 "
        >
          Tantangan di Sekitar Kita
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg my-8 font-medium tracking-tight text-center w-full md:w-2/3 mx-auto"
        >
          ReuseMart hadir sebagai solusi inovatif terhadap isu limbah barang
          bekas, keterbatasan waktu masyarakat, dan rendahnya kesadaran ekonomi
          sirkular di Indonesia.
        </motion.p>

        {/* card */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 max-w-3xl sm:max-w-5xl lg:max-w-6xl w-full mx-auto px-6">
          {features.map((feature, index) => (
            <ChallengeCard
              key={feature.title}
              title={feature.title}
              image={feature.image}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
