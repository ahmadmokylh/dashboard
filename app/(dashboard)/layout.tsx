import Layout from '@/components/layout';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <Layout>{children}</Layout>;
}
