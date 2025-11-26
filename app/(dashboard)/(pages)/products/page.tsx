import CategoriesItem from '@/components/categories-item';
import ProductCard from '@/components/product-card';

export default function ProductPage() {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row gap-12">
      {/* product card */}
      <ProductCard />

      {/* category side */}
      <CategoriesItem />
    </div>
  );
}
