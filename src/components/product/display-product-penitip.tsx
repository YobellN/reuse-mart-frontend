import ProductCard from "@/components/product/product-card";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function DisplayProdukPenitip() {
  return (
    <div
      className="mt-4 my-6 bg-white p-3 lg:p-6
      dark:bg-slate-950 dark:border-slate-600"
    >
      <div className="mb-6 font-semibold text-xl">
        <h2>PRODUK LAINNYA DARI PENITIP</h2>
        <div className="w-64 my-1">
          <Separator className="border-3 border-green-500 rounded-full" />
        </div>
      </div>
      <div className="grid gap-2 md:gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
