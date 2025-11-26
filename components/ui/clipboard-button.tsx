'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ClipboardButtonProps extends React.ComponentProps<'button'> {
  value: string;
  label?: string;
}

export function ClipboardButton({ value, ...props }: ClipboardButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);

    setCopied(true);
    toast.success('تم النسخ');

    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <Button
      {...props}
      onClick={handleCopy}
      type="button"
      variant="ghost"
      size="icon-sm"
    >
      {copied ? <Check /> : <Copy />}
    </Button>
  );
}
