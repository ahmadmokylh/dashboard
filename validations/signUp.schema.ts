import z from 'zod';
import { passwordSchema } from './password.schema';

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'الرجاء ادخال الأسم' }),
  email: z.email({ message: 'البريد الالكتروني غير صحيح' }),
  password: passwordSchema,
});

export type SignUpType = z.infer<typeof signUpSchema>;
