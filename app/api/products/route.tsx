import { connectDB } from '@/lib/DB';
import { productSchema } from '@/lib/validations/product.schema';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();

  const products = await Product.find();

  return Response.json({
    total: products.length,

    products,
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    // 🔥 استلام البيانات
    const body = await req.json();

    // 🔥 التحقق من الفاليديشين
    const data = productSchema.parse(body);

    // 🔥 إنشاء المنتج
    const product = await Product.create({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        status: 'success',
        product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('CREATE PRODUCT ERROR:', error);

    // 🔥 خطأ Zod (Validation)
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          status: 'error',
          message: 'بيانات غير صالحة',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // 🔥 أخطاء أخرى
    return NextResponse.json(
      {
        status: 'error',
        message: 'فشل في إنشاء المنتج',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
