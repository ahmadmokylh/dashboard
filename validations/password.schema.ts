import z from 'zod';

export const passwordSchema = z
  .string()
  .min(8, { message: 'كلمة المرور يجب أن تكون على الأقل 8 أحرف' })
  .regex(/[a-z]/, {
    message: 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل',
  })
  .regex(/[0-9]/, {
    message: 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل',
  })
  .regex(/[^A-Za-z0-9]/, {
    message: 'كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل',
  });

export type PasswordType = z.infer<typeof passwordSchema>;
