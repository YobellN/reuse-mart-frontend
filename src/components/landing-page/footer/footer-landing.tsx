"use client";
import Image from "next/image";
import Link from "next/link";

export default function FooterLanding() {
  return (
    <footer className="bg-green-500 text-white">
      <div className="px-6 py-8 md:py-10 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        <div>
          <Image
            src="/ReuseMart_horizontal.png"
            alt="ReuseMart"
            width={180}
            height={42}
            className="brightness-0 invert mb-12"
          />
          <p className="mt-4 mb-2">Unduh Aplikasi Kami</p>
          <div className="flex gap-2 items-center">
            <Link
              href="https://play.google.com/store/apps/details?id=..."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/images/generic/id_badge_web_generic.png"
                alt="Dapatkan di Google Play"
                width={130}
                height={40}
              />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Kantor ReUseMart</h4>
          <p className="text-sm leading-6">
            Jl. Soekarno Hatta No. 123
            <br />
            Umbulharjo, Kota Yogyakarta
            <br />
            Daerah Istimewa Yogyakarta, 55161
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Jam Operasional</h4>
          <p className="text-sm leading-6">
            Senin – Jumat: 08.00 - 17.00
            <br />
            Sabtu: 08.00 - 13.00
            <br />
            Minggu & Tanggal Merah: Tutup
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Hubungi Kami</h4>
          <p className="text-sm">+62 812-3456-7890</p>
          <p className="text-sm mb-4">support@reusemart.id</p>
          <div className="flex gap-4 text-white text-xl">
            <Link href="#">
              <i className="ri-instagram-line" />
            </Link>
            <Link href="#">
              <i className="ri-facebook-fill" />
            </Link>
            <Link href="#">
              <i className="ri-twitter-x-line" />
            </Link>
            <Link href="#">
              <i className="ri-linkedin-box-line" />
            </Link>
            <Link href="#">
              <i className="ri-youtube-line" />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-green-600">
        <div className="py-4 w-5/6 mx-auto text-sm text-center flex flex-col md:flex-row justify-between items-center px-6">
          <p>&copy; 2025 ReUseMart – Yogyakarta, Indonesia</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
