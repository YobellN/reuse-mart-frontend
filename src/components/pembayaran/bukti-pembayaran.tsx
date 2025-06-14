'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BuktiPembayaranProps {
    filename?: string;
    style?: React.CSSProperties;
}

export default function BuktiPembayaran({ filename, style }: BuktiPembayaranProps) {
    const [open, setOpen] = useState(false);

    const backendUrl = filename
        ? `http://localhost:8000/storage/bukti_pembayaran/${filename}`
        : '';
    const [src, setSrc] = useState<string>(backendUrl || '/reuse-mart.png');

    return (
        <>
            {/* Thumbnail kecil */}
            <div
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setOpen(true)}
            >
                <Image
                    src={src}
                    alt={filename || 'Reuse Mart'}
                    fill
                    style={{ objectFit: 'cover', ...style }}
                    onError={() => {
                        if (src !== '/reuse-mart.png') {
                            setSrc('/reuse-mart.png');
                        }
                    }}
                    unoptimized
                    placeholder="blur"
                    blurDataURL="/reuse-mart.png"
                />
            </div>

            {/* Modal Zoom */}
            {open && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-zoom-out"
                    onClick={() => setOpen(false)}
                >
                    <img
                        src={src}
                        alt="Zoomed Bukti"
                        className="max-h-[90%] max-w-[90%] rounded-lg shadow-xl"
                    />
                </div>
            )}
        </>
    );
}
