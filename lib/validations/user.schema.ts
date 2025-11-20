import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'الاسم يجب أن يحتوي حرفين على الأقل')
    .max(50, 'الاسم طويل جدًا'),

  email: z.email('البريد الإلكتروني غير صالح'),

  avatar: z.url('الرابط غير صالح').optional(),

  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),

  role: z.enum(['admin']).default('admin'),

  sessions: z.array(z.string()).optional(),

  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),

  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type UserInput = z.infer<typeof userSchema>;
