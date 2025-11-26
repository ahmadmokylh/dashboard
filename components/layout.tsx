import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import SidebarHeader from './sidebar-header';
import BreadCarumbs from './bread-carumbs';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect('/login');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarHeader />

        <div className="ps-4 pt-2">
          <BreadCarumbs />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 ">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
