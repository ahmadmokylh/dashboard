export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';

export default async function getBuyer() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const res = await fetch(process.env.NEXT_PUBLIC_API_BUYERS_URL!, {
    cache: 'no-store',
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.error || 'حدث خطأ أثناء جلب بيانات المشترين');
  }

  return res.json();
}
