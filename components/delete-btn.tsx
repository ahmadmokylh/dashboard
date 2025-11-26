'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import deleteProduct from '@/hooks/deleteProduct';
import { toast } from 'sonner';

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteProduct(id);
      toast.success('تم حذف المنتج بنجاح');
      setOpen(false);
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء الحذف');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-3 py-1.5 text-sm rounded-md bg-red-500/10 text-red-600 hover:bg-red-500/20 transition">
          حذف
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>تأكيد الحذف</DialogTitle>
          <DialogDescription>
            هل أنت متأكد أنك تريد حذف هذا المنتج؟ هذا الإجراء لا يمكن التراجع
            عنه.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'جارٍ الحذف...' : 'تأكيد'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
