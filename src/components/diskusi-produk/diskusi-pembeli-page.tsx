"use client";

import * as React from "react";

// INI DUMMY AJA, NANTI SESUAIKAN DENGAN KEBUTUHAN CHAT AJA
type Diskusi = {
  id: number;
  namaUser: string;
  idProduk: string;
  pesan: string;
  waktu: string;
  gambar: string[];
};

export default function DiskusiPembeliPage({ diskusi }: { diskusi: Diskusi }) {
  return <div className="flex w-5/6">isi komponen chat nya disini</div>;
}
