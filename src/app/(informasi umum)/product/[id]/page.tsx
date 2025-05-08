import ShowDiskusiPage from "@/components/diskusi-produk/show-diskusi-page";
import BreadcrumbsProduct from "@/components/product/breadcrumb-product";
import DisplayProdukPenitip from "@/components/product/display-product-penitip";
import ProductDetail from "@/components/product/product-detail";
import SellerInfo from "@/components/product/seller-info-dan-chat";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <BreadcrumbsProduct />
      <ProductDetail id={params.id} />
      <SellerInfo />
      <ShowDiskusiPage />
      <DisplayProdukPenitip />
    </div>
  );
}
