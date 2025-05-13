'use server'

import ShowDiskusiPage from "@/components/diskusi-produk/show-diskusi-page";
import BreadcrumbsProduct from "@/components/product/breadcrumb-product";
import DisplayProdukPenitip from "@/components/product/display-product-penitip";
import ProductDetail from "@/components/product/product-detail";
import SellerInfo from "@/components/product/seller-info-dan-chat";
import { getProdukById } from "@/services/produk/produk-services";
import { Produk } from "@/services/produk/schema-produk";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produk: Produk | null = await getProdukById(id).catch(() => null);
  if (!produk) return <div>Produk tidak ditemukan</div>
  return (
    <div>
      <BreadcrumbsProduct />
      <ProductDetail {...produk} />
      <SellerInfo idPenitip={produk.id_penitip} id_produk={id} />
      <ShowDiskusiPage id_produk={id} />
      <DisplayProdukPenitip id_penitip={produk.id_penitip} />
    </div>
  );
}
