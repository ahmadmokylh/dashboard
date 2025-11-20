'use client';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import Link from 'next/link';
import { useState } from 'react';
import { AuthType, signIn } from '@/app/actions/auth';
import { userSignInSchema } from '@/lib/validations/userSignIn.schema';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  //
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(userSignInSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const onSubmit = async (data: AuthType) => {
    setIsLoading(true);
    try {
      const result = await signIn(data);

      if (result.user) {
        toast('Welcome back', { description: 'Login successful' });
      }
    } catch (err: any) {
      setAuthError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
      redirect('/');
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  required
                />
                {authError && <p className="text-red-600">{authError}</p>}
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading || isSubmitting}>
                  {isLoading || isSubmitting ? 'Loading...' : 'Login'}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
