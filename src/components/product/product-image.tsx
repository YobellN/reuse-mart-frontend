'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  filename?: string;
  style?: React.CSSProperties;
  className?: string; // tambahkan className opsional
}

export default function ProductImage({
  filename,
  style,
  className,
}: ProductImageProps) {
  const backendUrl = filename
    ? `${process.env.NEXT_PUBLIC_STORAGE}/foto-produk/${filename}`
    : "";
  const [src, setSrc] = useState<string>(backendUrl || "/reuse-mart.png");

  return (
    <Image
      src={src}
      alt={filename || "Reuse Mart"}
      fill
      className={className}
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
