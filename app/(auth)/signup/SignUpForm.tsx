'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import PasswordInput from '@/components/ui/password-input';
import { signUpSchema, SignUpType } from '@/validations/signUp.schema';

import { authClient } from '@/lib/auth-client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authErorr, setAuthErorr] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({ name, email, password }: SignUpType) => {
    setIsLoading(true);
    setAuthErorr(null);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: '/',
    });

    if (error) {
      setAuthErorr(error.message || 'Something went wrong');
      toast.error(error.message || 'Something went wrong', {
        action: { label: 'Try again', onClick: () => window.location.reload() },
      });
    } else {
      toast.success('Signed up successfully');
      router.push('/');
    }

    setIsLoading(false);
    setAuthErorr(null);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                {...register('name')}
                id="name"
                name="name"
                type="text"
                placeholder="Ahmad Test"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput {...register('password')} id="password" />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              {authErorr && (
                <div role="alert" className="text-red-600">
                  {authErorr}
                </div>
              )}
              <Field>
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  Create Account
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
