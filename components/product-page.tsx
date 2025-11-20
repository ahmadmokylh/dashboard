'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { redirect } from 'next/navigation';

export const products = [
  {
    slug: 'test1',
    name: 'Front Table CSS',
    price: 150.5,
    veiw: 'ID',
    img: '/placeholder.png',
  },
  {
    slug: 'test2',
    name: 'Apple Watch Series 10',
    price: 160.4,
    veiw: 'ID',

    img: '/placeholder.png',
  },
  {
    slug: 'test3',
    name: 'Chester Chair',
    price: 120.3,
    veiw: 'ID',

    img: '/placeholder.png',
  },
  {
    slug: 'test4',
    name: 'Air Wireless Headphone',
    price: 120.99,
    veiw: 'ID',

    img: '/avatar.png',
  },
];

export default function ProductsPage() {
  return (
    <div dir="rtl" className="w-full px-8 py-8 space-y-8">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Products</h1>

        <Button
          className="bg-primary"
          onClick={() => redirect('/products/add-product')}
        >
          + إضافة منتج جديد{' '}
        </Button>
      </div>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {products.map((p, i) => (
          <Card
            key={i}
            className="rounded-2xl shadow-sm border bg-white hover:shadow-md transition py-3"
          >
            <CardContent className="px-3 space-y-2">
              {/* IMAGE */}
              <div className="w-full h-[250px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src={p.img}
                  alt={p.name}
                  width={250}
                  height={250}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* PRODUCT NAME */}
              <h2 className="text-[16px] font-medium mt-1">{p.name}</h2>

              {/* PRICE */}
              <p className="text-[15px] font-semibold mt-3">${p.price}</p>

              {/* veiw / SOLD */}

              <Button asChild size="sm" className="w-full">
                <Link href={`/products/${p.slug}`}>عرض</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
