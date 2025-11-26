import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';
import { productSchema } from '@/validations/product.schema';
import { NextResponse } from 'next/server';

// get all products fun
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);

  const skip = (page - 1) * limit;

  const total = await Product.countDocuments();

  const products = await Product.find().skip(skip).limit(limit);

  return Response.json({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    products,
  });
}

// create a product fun
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const data = productSchema.parse(body);

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
