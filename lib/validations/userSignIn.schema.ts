import { userSchema } from './user.schema';

export const userSignInSchema = userSchema.pick({
  email: true,
  password: true,
});
