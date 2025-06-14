'use client';

import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import ProductDiscussionCard from "@/components/diskusi-produk/card-tampil-diskusi-produk";
import DiskusiModal from "@/components/diskusi-produk/diskusi-modal";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const id_produk = params.id_produk as string;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <SiteHeader title="Diskusi Produk" />
      
      <div className="mb-4 flex justify-end">
        <Button 
          onClick={() => setModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
        >
          <MessageSquareText className="w-4 h-4" />
          Tambah Diskusi Baru
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Riwayat Diskusi</h2>
        <ProductDiscussionCard id_produk={id_produk} />
      </div>

      <DiskusiModal
        trigger={<span />}
        open={modalOpen}
        onOpenChange={setModalOpen}
        id_produk={id_produk}
      />
    </div>
  );
}