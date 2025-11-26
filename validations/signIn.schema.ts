import z from 'zod';
import { passwordSchema } from './password.schema';

export const SignInSchema = z.object({
  email: z.email({ message: 'البريد الالكتروني غير صحيح' }),
  password: passwordSchema,
});

export type SignInType = z.infer<typeof SignInSchema>;
