'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ NEW
  const [error, setError] = useState(null); // ⬅️ NEW

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:4000/api/products');

        if (!res.ok) {
          throw new Error('فشل في جلب البيانات');
        }

        const data = await res.json();
        console.log('DATA FROM API:', data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          throw new Error('صيغة البيانات غير متوقعة');
        }
      } catch (err: any) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 🔥 حذف المنتج
  async function deleteProduct(_id: string) {
    const sure = confirm('هل تريد حذف هذا المنتج؟');

    if (!sure) return;

    try {
      const res = await fetch(`http://localhost:4000/api/products/${_id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        alert('فشل في حذف المنتج');
        return;
      }

      // إزالة المنتج من الواجهة بدون reload
      setProducts((prev) => prev.filter((p) => p._id !== _id));
    } catch (error) {
      console.error('Error deleting:', error);
    }
  }

  // 🟡 أثناء التحميل
  if (loading) {
    return (
      <p className="text-center text-lg py-12" dir="rtl">
        جاري تحميل المنتجات...
      </p>
    );
  }

  // 🔴 في حال وجود خطأ
  if (error) {
    return (
      <p className="text-center text-red-600 py-12" dir="rtl">
        حدث خطأ: {error}
      </p>
    );
  }

  return (
    <div dir="rtl" className="w-full px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">المنتجات</h1>

        <Button
          className="bg-primary"
          onClick={() => redirect('/products/add-product')}
        >
          + إضافة منتج جديد
        </Button>
      </div>

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
                  src={p.img || '/placeholder.png'}
                  alt={p.name}
                  width={250}
                  height={250}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* NAME */}
              <h2 className="text-[16px] font-medium mt-1">{p.name}</h2>

              {/* PRICE */}
              <p className="text-[15px] font-semibold mt-3">${p.price}</p>

              <div className="flex justify-between">
                <Button asChild size="sm">
                  <Link href={`/products/${p.slug}`}>عرض</Link>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteProduct(p._id)}
                >
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
