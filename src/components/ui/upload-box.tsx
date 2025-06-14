"use client";

import { useRef } from "react";
import { ImagePlus } from "lucide-react";

export default function UploadBox({
  onFileSelect,
}: {
  onFileSelect: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-teal-300 bg-teal-50 hover:bg-teal-100 cursor-pointer flex flex-col items-center justify-center aspect-square w-24 h-24 sm:w-30 sm:h-30 rounded-md text-teal-600 text-sm transition-all"
    >
      <ImagePlus />
      <span>Pilih Foto Produk</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
