'use client';

import Image from 'next/image';
import { useState } from 'react';

interface FotoKTPProps {
    filename?: string;
    style?: React.CSSProperties;
}

export default function FotoKTP({ filename, style }: FotoKTPProps) {
    const backendUrl = filename
        ? `http://localhost:8000/storage/foto_ktp/${filename}`
        : '';
    const [src, setSrc] = useState<string>(backendUrl || '/reuse-mart.png');

    return (
        <Image
            src={src}
            alt={filename || 'Reuse Mart'}
            fill
            style={{...style }}
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
