import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ku'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // / and /ku (no forced /en)
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
