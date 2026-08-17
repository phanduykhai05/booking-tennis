import { notFound } from "next/navigation";

import ProductDetail from "@/components/product/ProductDetail";
import { getProductBySlug, products } from "@/components/product/ProductDetail/mockData";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
