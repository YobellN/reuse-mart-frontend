'use server'
import { getPenitipById } from "@/services/penitip/penitip-services";
import { Penitip } from "@/services/penitip/schema-penitip";
import { Star, MessageSquareText } from "lucide-react";

export default async function SellerInfo({ idPenitip }: { idPenitip: string }) {
  const penitip: Penitip | null = await getPenitipById(idPenitip);
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
          <div className="bg-green-600 text-white font-medium border-2 border-green-600 py-1 px-3 inline-flex items-center gap-2 cursor-pointer hover:bg-green-700 transition">
            <MessageSquareText className="w-5 h-5 text-white" />
            <span>Chat Dengan CS Sekarang</span>
          </div>
        </div>
      </div>
    </div>
  );
}
