'use client';

import { ScrollArea } from "@/components/ui/scroll-area"
import { getDiskusiById } from "@/services/diskusi/diskusi-services";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Diskusi } from "@/services/diskusi/schema-diskusi";

export default function ProductDiscussionCard({ id_produk }: {id_produk: string}) {
  const [discussions, setDiscussions] = useState<Diskusi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiskusiById(id_produk)
      .then((result) => {
        if (result && Array.isArray(result.data)) {
          setDiscussions(result.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id_produk]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!discussions || discussions.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Belum ada diskusi yang terjadi.
      </div>
    );
  }

  return (
    <ScrollArea className="whitespace-nowrap rounded-md border p-6">
      <div className="space-y-6">
        {discussions.map((item, i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg p-6 space-y-3 border",
              item.user.role === "CS" 
                ? "bg-gray-50 border-green-300" 
                : "bg-green-50 border-green-300"
            )}
          >
            <div className="flex items-start gap-4">
                <div className={cn(
                "w-8 min-w-8 aspect-square rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0",
                item.user.role === "CS"
                  ? "bg-white text-green-600 border-2 border-green-600"
                  : "bg-gray-400"
                )}>
                {item.user.role === "CS" ? "CS" : item.user.nama[0].toUpperCase()}
                </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">
                  {item.user.role === "CS" ? "Customer Service" : "Pembeli"} • {item.timestamp}
                </p>
                <p className="text-base text-gray-800">
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
