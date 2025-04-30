import KategoriGrid from "@/components/home/display-category";
import DisplayProdukRekomendasi from "@/components/home/display-produk-rekomendasi";
import DisplayProdukTerbaru from "@/components/home/display-produk-terbaru";
import HomeCarousel from "@/components/home/home-carousel";

export default async function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <KategoriGrid />
      <DisplayProdukTerbaru />
      <DisplayProdukRekomendasi />
    </div>
  );
}
