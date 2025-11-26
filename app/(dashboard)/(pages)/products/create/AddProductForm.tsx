'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { productSchema, ProductType } from '@/validations/product.schema';

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
import { toast } from 'sonner';
import { ArSlug } from '@/lib/ar-sulg';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UploadImg from '@/components/upload-img';
import { useUploadThing } from '@/lib/uploadthing';

export default function AddProductForm() {
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  // 👇 نخزن الملفات اللي اخترناها من UploadImg
  const [files, setFiles] = useState<File[] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const { startUpload } = useUploadThing('imageUploader');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setOpenDialog(true);

    const data = form.getValues();

    let imageUrl = '';

    // 👈 رفع الصورة فقط عند Submit
    if (files && files.length > 0) {
      const res = await startUpload(files);
      if (res && res[0]?.ufsUrl) {
        imageUrl = res[0].ufsUrl;
        // لو بتحب تخزنها بالفورم كمان:
        form.setValue('img', imageUrl as ProductType['img']);
      }
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_PRODUCTS_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          img: imageUrl, // 👈 نرسل رابط الصورة مع البيانات
          slug: ArSlug(data.name),
        }),
      });

      if (!res.ok) {
        console.error('Error:', await res.text());
        toast('حدث خطأ أثناء الرفع');
        setOpenDialog(false);
        return;
      }

      await res.json();
      toast('تم الرفع بنجاح', {
        description: `تم إضافة المنتج ${data.name}`,
        action: {
          label: 'عرض المنتجات',
          onClick: () => {
            router.push('/products');
          },
        },
      });

      setTimeout(() => setOpenDialog(false), 700);
      setFiles(null);
      setFilePreview(undefined);
      form.reset();

      // catch errors
    } catch (error) {
      toast('حدث خطأ اثناء الرفع', { description: (error as Error).message });
      setOpenDialog(false);
    }
  };

  return (
    <div dir="rtl" className="w-full">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="flex flex-col items-center justify-center gap-4 py-10">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              .... جاري إضافة المنتج
            </DialogTitle>
          </DialogHeader>

          {/* spinner */}
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </DialogContent>
      </Dialog>

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
                    placeholder="أكتب وصف للمنتج..."
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
                      value={form.watch('category')}
                      onValueChange={(v) =>
                        form.setValue('category', v as ProductType['category'])
                      }
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
                      value={form.watch('weight')}
                      onValueChange={(v) =>
                        form.setValue('weight', v as ProductType['weight'])
                      }
                    >
                      <SelectTrigger className="h-12 w-60">
                        <SelectValue placeholder="اختر الوزن" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">500 جرام</SelectItem>
                        <SelectItem value="1000">1000 جرام</SelectItem>
                        <SelectItem value="250">250 جرام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* =================== RIGHT SIDE (IMAGE) =================== */}
          <UploadImg
            onUploaded={(files) => {
              setFiles(files);
            }}
            filePreview={filePreview}
            setFilePreview={setFilePreview}
          />
        </div>
      </form>
    </div>
  );
}
