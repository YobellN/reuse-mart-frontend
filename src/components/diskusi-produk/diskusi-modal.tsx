"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import DiskusiPembeliPage from "./diskusi-pembeli-page";

//INI TYPE NYA SESUAIKAN SAJA SESUAI KEBUTUHAN
type Diskusi = {
  id: number;
  namaUser: string;
  idProduk: string;
  pesan: string;
  waktu: string;
  gambar: string[];
};

export default function DiskusiModal({
  trigger,
  open,
  onOpenChange,
  diskusi,
}: {
  trigger: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  diskusi: Diskusi;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-auto max-h-[80vh] overflow-y-auto px-4 py-5 bg-white rounded-xl shadow-xl">
        <DialogTitle className="text-lg font-semibold mb-4">
          Diskusi Tentang Produk Bersama CS ReuseMart
        </DialogTitle>
        <DiskusiPembeliPage diskusi={diskusi} />
      </DialogContent>
    </Dialog>
  );
}
