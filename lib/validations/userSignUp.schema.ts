import { userSchema } from './user.schema';

export const userSignUpSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
  avatar: true,
});
