import { notFound } from 'next/navigation';
import { applications, getApplicationBySlug } from '@/lib/applications';
import ApplicationDetailClient from './ApplicationDetailClient';

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }));
}

export default async function ApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApplicationBySlug(slug);
  if (!app) return notFound();

  const appForClient = {
    ...app,
    products: app.products ?? [],
  };

  return <ApplicationDetailClient app={appForClient} />;
}