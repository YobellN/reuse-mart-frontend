'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
    filename?: string;
}

export default function ProductImage({ filename }: ProductImageProps) {
    const backendUrl = filename
        ? `http://localhost:8000/storage/foto_produk/${filename}`
        : '';
    const [src, setSrc] = useState<string>(backendUrl || '/reuse-mart.png');

    return (
        <Image
            src={src}
            alt={filename || 'Reuse Mart'}
            fill
            style={{ objectFit: 'cover' }}
            onError={() => {
                if (src !== '/reuse-mart.png') {
                    setSrc('/reuse-mart.png');
                }
            }}
            unoptimized
            placeholder="blur"
            blurDataURL="/reuse-mart.png"
        />
    );
}
