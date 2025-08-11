import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

// Root page that redirects to default locale
export default function RootPage() {
  // Force redirect to default locale
  redirect(`/${defaultLocale}`);
}
