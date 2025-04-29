import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-green-50 via-white to-green-100">
      <Alert className="max-w-lg border-l-8 border-destructive bg-white shadow-xl">
        <Terminal className="h-6 w-6 text-destructive-500" />
        <AlertTitle className="text-destructive text-xl font-semibold">404 - Halaman Tidak Ditemukan</AlertTitle>
        <AlertDescription className="text-gray-600 mt-2">
          Ups! Sepertinya halaman yang kamu cari tidak tersedia atau telah dipindahkan.
        </AlertDescription>
      </Alert>

      <Link
        href="/"
        className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-full transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
