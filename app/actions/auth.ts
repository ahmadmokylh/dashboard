'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export interface AuthType {
  email: string;
  password: string;
}

export interface SingUpType extends AuthType {
  name: string;
}

export const singUp = async (data: SingUpType) => {
  const result = await auth.api.signUpEmail({
    body: {
      email: data.email,
      password: data.password,
      name: data.name,
      callbackURL: '/',
    },
  });
  return result;
};

export const signIn = async (data: AuthType) => {
  const result = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
      callbackURL: '/',
    },
  });

  return result;
};

export const signOut = async () => {
  await auth.api.signOut({ headers: await headers() });

  redirect('/login');
};
