import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'ku'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) notFound();

  const validLocale = locale as Locale;

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
    timeZone: 'America/New_York', // Adjust based on restaurant location
    now: new Date(),
  };
});

// Locale configuration
export const localeConfig = {
  en: {
    label: 'English',
    dir: 'ltr' as const,
    flag: '🇺🇸',
  },
  ku: {
    label: 'کوردی', // Kurdish in Kurdish script
    dir: 'rtl' as const,
    flag: '🏴', // Kurdish flag representation
  },
} as const;

export const defaultLocale: Locale = 'en';
