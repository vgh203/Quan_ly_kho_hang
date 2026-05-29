import { cookies } from 'next/headers';
import ImportsListClient from './ImportsListClient';

/** SSR: mỗi request lấy danh sách phiếu nhập mới nhất từ API */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Phiếu nhập kho | WMS',
  description: 'Danh sách phiếu nhập — Server-Side Rendering',
};

async function loadImports(accessToken) {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
  const res = await fetch(`${base}/imports?page=1&limit=15`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ImportsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const initialData = accessToken ? await loadImports(accessToken) : null;

  return <ImportsListClient initialData={initialData} />;
}
