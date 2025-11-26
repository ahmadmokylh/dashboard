import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/DB';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    if (!category)
      return NextResponse.json(
        { error: 'You must provide category' },
        { status: 400 }
      );

    const products = await Product.find({ category });

    return NextResponse.json({
      total: products.length,
      category,
      products,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch products', details: err },
      { status: 500 }
    );
  }
}
