import z from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'اسم المنتج مطلوب'),
  description: z.string().min(5, 'الوصف مطلوب'),
  img: z.url('يجب أن يكون رابط صورة'),
  price: z.string().min(1, 'السعر مطلوب'),
  oldPrice: z.string().optional(),
  offer: z.string().optional(),
  weight: z.enum(['500 جرام', '1000 جرام', '250 جرام']),
  category: z.enum([
    'العروض',
    'العسل العضوي',
    'خلطات العسل',
    'منتجات الخلية',
    'منتجات المزرعة',
  ]),
});

export type ProdcctType = z.infer<typeof productSchema>;
