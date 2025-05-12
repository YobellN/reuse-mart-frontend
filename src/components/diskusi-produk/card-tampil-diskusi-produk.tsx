import { ScrollArea } from "@/components/ui/scroll-area"
import { getDiskusiById } from "@/services/diskusi/diskusi-services";
import { use } from "react";

export default async function ProductDiscussionCard({ id_produk }: {id_produk: string }) {

  const result = await getDiskusiById(id_produk);
  const discussions = await result;

  if (!discussions || discussions.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Belum ada diskusi yang terjadi.
      </div>
    );
  }

  return (
    <ScrollArea className=" whitespace-nowrap rounded-md border">
      <div className="space-y-4">
        {discussions?.map((item, i) => (
          <div
            key={i}
            className="bg-green-50 border-1 border-green-300 rounded-md p-4 space-y-3"
          >
            <div className="flex items-start gap-3 ">
              <div className="w-8 min-w-8 aspect-square rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold shrink-0">
                {item.user.nama[0].toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Oleh {item.user.nama} • {item.timestamp}
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {item.pesan}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
