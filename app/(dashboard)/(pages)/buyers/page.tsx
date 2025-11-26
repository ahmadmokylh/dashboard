import { authClient } from '@/lib/auth-client';
import DataBuyerTable from './components/data-buyer-table';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { forbidden } from 'next/navigation';

export default async function BuyersPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const role = session?.user.role;

  if (role !== 'admin') return forbidden();

  return (
    <div>
      <DataBuyerTable />
    </div>
  );
}
