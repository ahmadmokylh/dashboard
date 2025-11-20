'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { productSchema, ProdcctType } from '@/lib/validations/product.schema';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import UploadImg from './upload-img';

export default function AddProductPage() {
  const form = useForm<ProdcctType>({
    resolver: zodResolver(productSchema),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('تم إرسال النموذج');
    console.log(form.getValues());
  };

  return (
    <div dir="rtl" className="w-full">
      <form className=" px-8 py-6 space-y-8" onSubmit={handleSubmit}>
        {/* ---------------- HEADER ---------------- */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold mt-1">إضافة منتج جديد</h1>

          <Button className=" bg-primary" type="submit">
            إضافة المنتج
          </Button>
        </div>

        {/* ---------------- MAIN GRID ---------------- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SIDE FORM */}
          <div className="xl:col-span-2 space-y-6">
            {/* -------- Basic Information -------- */}
            <Card className="rounded-xl shadow-sm border bg-white">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">المعلومات الأساسية</h2>

                {/* Product Name */}
                <div className="space-y-2">
                  <Label>اسم المنتج</Label>
                  <Input
                    {...form.register('name')}
                    className="h-12"
                    placeholder="مثال: عسل السدر الفاخر"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Textarea
                    {...form.register('description')}
                    className="min-h-[130px]"
                    placeholder="اكتب وصفاً دقيقاً للمنتج..."
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* -------- Pricing -------- */}
            <Card className="rounded-xl shadow-sm border bg-white">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">السعر والمخزون</h2>

                <div className="grid grid-cols-3 gap-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <Label>السعر</Label>
                    <Input
                      {...form.register('price')}
                      className="h-12"
                      placeholder="25.00"
                      required
                    />
                  </div>

                  {/* Old price */}
                  <div className="space-y-2">
                    <Label>السعر القديم</Label>
                    <Input
                      {...form.register('oldPrice')}
                      className="h-12"
                      placeholder="30.00"
                    />
                  </div>

                  {/* Offer */}
                  <div className="space-y-2">
                    <Label>العرض</Label>
                    <Input
                      {...form.register('offer')}
                      className="h-12"
                      placeholder="خصم 20%"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* -------- Category -------- */}
            <Card className="rounded-xl shadow-sm border bg-white">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold">الفئة والوزن</h2>

                <div className="grid grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <Label>الفئة</Label>
                    <Select
                      onValueChange={(v) => form.setValue('category', v as any)}
                    >
                      <SelectTrigger className="h-12 w-60">
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="العروض">العروض</SelectItem>
                        <SelectItem value="العسل العضوي">
                          العسل العضوي
                        </SelectItem>
                        <SelectItem value="خلطات العسل">خلطات العسل</SelectItem>
                        <SelectItem value="منتجات الخلية">
                          منتجات الخلية
                        </SelectItem>
                        <SelectItem value="منتجات المزرعة">
                          منتجات المزرعة
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <Label>الوزن</Label>
                    <Select
                      onValueChange={(v) => form.setValue('weight', v as any)}
                    >
                      <SelectTrigger className="h-12 w-60">
                        <SelectValue placeholder="اختر الوزن" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500 جرام">500 جرام</SelectItem>
                        <SelectItem value="1000 جرام">1000 جرام</SelectItem>
                        <SelectItem value="250 جرام">250 جرام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* =================== RIGHT SIDE (IMAGE) =================== */}
          <UploadImg />
        </div>
      </form>
    </div>
  );
}
