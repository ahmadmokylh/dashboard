import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Banknote, Weight } from 'lucide-react';
import getAllProducts from '@/hooks/getAllProducts';
import Image from 'next/image';
import ProductSkeleton from './product-skeleton';
import deleteProduct from '@/hooks/deleteProduct';
import { toast } from 'sonner';
import DeleteButton from './delete-btn';

export default async function ProductCard() {
  const { products } = await getAllProducts();

  const isLoading = !products || products.length === 0;

  return (
    <div className="flex-1 min-w-0">
      <div className="space-y-12">
        {/* ---------------- Skeleton ---------------- */}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}

        {/* ---------------- REAL DATA ---------------- */}
        {!isLoading &&
          products.map((product) => (
            <Card
              key={product._id}
              className="flex flex-col sm:flex-row shadow-none overflow-hidden rounded-md border-none py-0"
            >
              {/* الصورة */}
              <div className="w-full sm:w-56 h-40 sm:h-56 bg-muted rounded-lg shrink-0 relative">
                <Image
                  alt={product.name}
                  src={product.img}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* المحتوى */}
              <CardContent className="px-0 sm:px-6 py-0 flex flex-col justify-between flex-1 xl:min-w-[600px] max-w-full overflow-hidden">
                <div>
                  <div className="flex items-center gap-6">
                    <Badge className="bg-amber-200/70 text-primary hover:bg-primary/5 shadow-none">
                      {product.category}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold tracking-tight ">
                    {product.name}
                  </h3>
                </div>

                <p className="text-muted-foreground line-clamp-3 max-w-[340px] xl:max-w-full ">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4" /> د.ك. {product.price}
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4" /> {product.weight} جرام
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button className="px-3 py-1.5 text-sm rounded-md bg-primary/5 text-primary hover:bg-primary/15 transition">
                    عرض المنتج
                  </button>

                  <DeleteButton id={product._id} />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
