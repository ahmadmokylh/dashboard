'use client';

import { useState } from 'react';
import { Input } from './input';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PasswordInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        required
        name="password"
        className={cn('pr-10', className)}
      />

      <button
        type="button"
        className="absolute inset-y-0 right-2 flex items-center text-gray-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
