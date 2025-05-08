"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import DetailProductImage from "./detail-product-image";

export default function ProductImageModal({
  images,
  trigger,
}: {
  images: string[];
  trigger: React.ReactElement;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-full max-w-5xl sm:!max-w-5xl p-6 bg-white rounded-xl shadow-xl">
        <DialogTitle className="text-lg font-semibold mb-4">
          Gambar Produk
        </DialogTitle>
        <DetailProductImage images={images} />
      </DialogContent>
    </Dialog>
  );
}
