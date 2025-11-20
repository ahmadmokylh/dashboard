'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useRouter } from 'next/navigation';

type ProductDailog = {
  slug: string;
};

export default function ProductDialog({ slug }: ProductDailog) {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>تفاصيل المنتج</DialogTitle>
        </DialogHeader>

        <p>Slug: {slug}</p>
      </DialogContent>
    </Dialog>
  );
}
