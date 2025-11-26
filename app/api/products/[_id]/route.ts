import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ _id: string }> }
) {
  try {
    await connectDB();

    const { _id } = await params;

    // 🔥 جلب المنتج
    const product = await Product.findById(_id);

    if (!product) {
      return NextResponse.json(
        { message: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'تم جلب المنتج بنجاح', product },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);

    return NextResponse.json(
      {
        message: 'حدث خطأ أثناء جلب المنتج',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ _id: string }> }
) {
  try {
    await connectDB();
    const { _id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(_id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'تم حذف المنتج بنجاح', product: deletedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء حذف المنتج' },
      { status: 500 }
    );
  }
}
