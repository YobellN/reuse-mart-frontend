"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import ScrollIndicator from "./scroll-indicator";

export default function MainHero() {
  return (
    <div className="relative min-h-[calc(100vh+0rem)] flex flex-col justify-start lg:justify-end items-stretch bg-gradient-to-br from-lime-100 via-green-100 to-emerald-200 overflow-hidden">
      {/* background wave  */}
      <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0 }}
          className="absolute top-0 left-0 w-full z-0 pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 10 1440 210"
            className="w-full h-full"
          >
            <path
              fill="#bbf7d0"
              fillOpacity="1"
              d="M0,120L48,105C96,90,192,60,288,70C384,80,480,120,576,140C672,160,768,165,864,160C960,155,1056,140,1152,125C1248,110,1344,95,1392,90L1440,85L1440,0L0,0Z"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 left-0 w-full z-1 pointer-events-none"
        >
          <svg
            viewBox="0 0 1440 365"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto scale-y-[-1] scale-x-[-1]"
          >
            <defs>
              <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                <stop stopColor="#4ade80" offset="0%"></stop>
                <stop stopColor="#22c55e" offset="100%"></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#sw-gradient-0)"
              d="M0,268C96,258,192,248,288,252C384,256,480,264,576,276C672,288,768,300,864,312C960,324,1056,336,1152,328C1248,320,1344,296,1440,284V365H0Z"
            />
          </svg>
        </motion.div>
      </div>

      {/* hero konten */}
      <div className="relative z-10 w-full px-4 md:px-0 lg:mt-32 lg:mb-8 md:w-5/6 mx-auto grid lg:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-2 lg:order-1 mt-8 mb-12 sm:mb-6 lg:mb-0 sm:mt-0"
        >
          <Badge className="bg-green-600 text-white rounded-full py-1 px-3 border-none shadow text-xs sm:text-sm">
            Baru! Kini Hadir ReuseMart v1.0
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-[20ch] text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold !leading-snug text-green-900"
          >
            Jual Beli Barang Bekas Berkualitas & Ramah Lingkungan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 max-w-[60ch] text-justify text-sm sm:text-base md:text-md text-green-800"
          >
            ReuseMart hadir untuk bantu kamu menemukan barang layak pakai dengan
            harga terjangkau. Titipkan atau beli dengan mudah, aman, dan peduli
            lingkungan. Dukung gaya hidup berkelanjutan dengan memberi
            kesempatan kedua bagi barang bekas berkualitas. Setiap transaksi
            yang kamu lakukan ikut berkontribusi mengurangi limbah, mendukung
            komunitas, dan membangun ekonomi sirkular di sekitar kita.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 sm:mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              size="sm"
              className=" rounded-full text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-3 bg-green-700 hover:bg-green-800 text-white"
            >
              Mulai Sekarang <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-sm sm:text-base px-5 py-2 sm:px-6 sm:py-3 border-green-600 text-green-800 hover:bg-green-100"
            >
              <CirclePlay className="h-4 w-4 mr-2" /> Pelajari Lebih Lanjut
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="order-1 lg:order-2 flex rounded-xl justify-center lg:justify-end shrink-0 mt-16 lg:mt-0"
        >
          <Image
            src="/landing/hero-picture.png"
            alt="ReuseMart Hero Image"
            width={500}
            height={400}
            className="w-full max-w-[250px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </div>
      <div className=" w-5/6 mx-auto mt-8 sm:mt-0 z-10 flex justify-center lg:justify-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <ScrollIndicator />
        </motion.div>
      </div>
      <div className=" h-16 mt-6 bg-white rounded-t-full" />
    </div>
  );
}
