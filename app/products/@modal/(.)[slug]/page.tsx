import ProductDialog from '@/components/product-modal';

export default async function ProductModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ProductDialog slug={slug} />;
}
