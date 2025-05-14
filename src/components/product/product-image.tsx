'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  filename?: string;
  style?: React.CSSProperties;
}

export default function ProductImage({ filename, style }: ProductImageProps) {
  console.log(filename);
  const backendUrl = filename
    ? `${process.env.NEXT_PUBLIC_URL}/storage/foto_produk/${filename}`
    : "";
  const [src, setSrc] = useState<string>(backendUrl || "/reuse-mart.png");

  return (
    <Image
      src={src}
      alt={filename || "Reuse Mart"}
      fill
      objectFit="cover"
      style={{ ...style }}
      onError={() => {
        if (src !== "/reuse-mart.png") {
          setSrc("/reuse-mart.png");
        }
      }}
      unoptimized
      placeholder="blur"
      blurDataURL="/reuse-mart.png"
    />
  );
}
