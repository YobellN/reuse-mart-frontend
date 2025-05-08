'use client'

import { getPenitipById } from "@/services/penitip/penitip-services";
import { Penitip } from "@/services/penitip/schema-penitip";
import { Star, MessageSquareText } from "lucide-react";
import DiskusiModal from "../diskusi-produk/diskusi-modal";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export default function SellerInfo({ idPenitip }: { idPenitip: string }) {
  const [penitip, setPenitip] = useState<Penitip | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getPenitipById(idPenitip).then((data) => {
      setPenitip(data);
      setLoading(false);
    }
    );
  }, []);

  if (loading) {
    return (
      <div className="mt-4 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-start p-4 bg-white">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-6 mx-4 mb-4 md:mb-0">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-4 w-10 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2 mx-4 sm:border-l sm:pl-8 mb-4 md:mb-0">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
        </div>

        <div className="flex flex-col gap-2 mx-4 sm:border-l sm:pl-8 w-full md:w-auto">
          <Skeleton className="h-4 w-48 rounded" />
          <Skeleton className="h-8 w-48 rounded" />
        </div>
      </div>
    );
  }

  if (!penitip) return null;

  return (
    <div className="mt-4 flex flex-col md:flex-row flex-wrap items-start md:items-center justify-start p-4 bg-white">
      <div className="flex items-center gap-3 me-4 mb-4 md:mb-0">
        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold">
          {penitip?.user.nama}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{penitip?.user.nama}</p>
          <div className="flex items-center text-sm text-gray-600">
            <Star
              className="w-4 h-4 text-yellow-500 mr-1"
              fill="currentColor"
            />
            <span>{penitip?.rating} / 5.0</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm mx-4 mb-4 md:mb-0">
        <div className="text-left">
          <p className="text-gray-500">Produk</p>
          <p className="text-black font-semibold">{penitip.total_produk}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm mx-4 sm:border-l sm:pl-8 w-full md:w-auto mb-4 md:mb-0">
        <div className="text-left">
          <p className="text-gray-500 mb-1">Opsi Pengiriman</p>
          <p className="text-green-600 text-center font-medium border-2 border-green-600 py-1 px-2">
            Jemput Ke Gudang
          </p>
        </div>
        <div className="text-left">
          <p className="text-white mb-1">.</p>
          <p className="text-green-600 text-center font-medium border-2 border-green-600 py-1 px-2">
            Diantar Kurir
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm mx-4 sm:border-l sm:pl-8 w-full md:w-auto">
        <div className="text-left">
          <p className="text-black mb-1">Punya Pertanyaan Terkait Produk?</p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-green-600 text-white font-medium border-2 border-green-600 py-1 px-3 inline-flex items-center gap-2 cursor-pointer hover:bg-green-700 transition"
          >
            <MessageSquareText className="w-5 h-5 text-white" />
            <span>Chat Dengan CS Sekarang</span>
          </button>
        </div>
      </div>

      <DiskusiModal
        trigger={<span />}
        open={modalOpen}
        onOpenChange={setModalOpen}
        diskusi={{
          id: 123,
          namaUser: "Ani",
          idProduk: "P002",
          pesan: "Barang ini bisa COD?",
          waktu: "2024-05-08T16:12:00Z",
          gambar: ["/img1.jpg", "/img2.jpg"],
        }}
      />
    </div>
  );
}
