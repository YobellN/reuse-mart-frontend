"use client";

import { useRef } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

export default function UploadBox({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-teal-300 bg-teal-50 hover:bg-teal-100 cursor-pointer flex flex-col items-center justify-center aspect-square w-1/2 sm:w-1/3 rounded-md text-teal-600 text-sm transition-all"
    >
      <ImagePlus />
      <span>Pilih Foto Produk</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
