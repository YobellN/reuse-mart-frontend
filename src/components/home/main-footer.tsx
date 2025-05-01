import Image from "next/image";

export default function MainFooter() {
  return (
    <footer className="bg-white dark:bg-[--card] text-sm text-gray-700 dark:text-[--card-foreground] border-t border-gray-200 dark:border-[--border] mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold mb-3">ReUseMart</h3>
          <ul className="space-y-2">
            <li>Tentang Kami</li>
            <li>Blog</li>
            <li>Karier</li>
            <li>Kebijakan Donasi</li>
            <li>Visi & Misi</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Beli</h3>
          <ul className="space-y-2">
            <li>Cari Produk</li>
            <li>Cara Checkout</li>
            <li>Promo & Poin</li>
          </ul>

          <h3 className="font-semibold mt-5 mb-3">Jual</h3>
          <ul className="space-y-2">
            <li>Daftar Penitip</li>
            <li>FAQ Penitipan</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Bantuan dan Panduan</h3>
          <ul className="space-y-2">
            <li>Pusat Bantuan</li>
            <li>Syarat & Ketentuan</li>
            <li>Kebijakan Privasi</li>
          </ul>

          <h3 className="font-semibold mt-5 mb-3">Keamanan & Privasi</h3>
          <div className="flex gap-2 items-center">
            <Image
              src="/security/pci-dss.png"
              alt="PCI"
              className="h-10"
              width={100}
              height={100}
            />
            <Image
              src="/security/bsi-27001.png"
              alt="BSI"
              className="h-10"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <Image
            src="/mascot/reusemart-family.png"
            alt="ReuseMart Mascot"
            className="w-40 h-auto mb-4"
            width={100}
            height={100}
          />

          <div className="flex gap-2 mb-4">
            <Image
              src="/store/googleplay.png"
              alt="Google Play"
              className="h-10"
              width={100}
              height={100}
            />
            <Image
              src="/store/appstore.png"
              alt="App Store"
              className="h-10"
              width={100}
              height={100}
            />
            <Image
              src="/store/appgallery.png"
              alt="App Gallery"
              className="h-10"
              width={100}
              height={100}
            />
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            © 2025 ReUseMart
          </p>

          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-semibold rounded bg-green-500 text-white">
              Indonesia
            </button>
            <button className="px-3 py-1 text-xs font-medium rounded bg-gray-100 text-gray-800">
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
