import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://naturevillage.com';
  const currentDate = new Date().toISOString();
  
  // Define all pages with their priorities and change frequencies
  const pages = [
    { path: '', priority: '1.0', changefreq: 'weekly' }, // Home
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/menu', priority: '0.9', changefreq: 'weekly' },
    { path: '/order', priority: '0.7', changefreq: 'daily' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/gallery', priority: '0.5', changefreq: 'monthly' },
    { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  ];

  // Generate URLs for both locales
  const locales = ['en', 'ku'];
  const urls = locales.flatMap(locale => 
    pages.map(page => ({
      url: `${baseUrl}/${locale}${page.path}`,
      priority: page.priority,
      changefreq: page.changefreq,
      lastmod: currentDate,
    }))
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(({ url, priority, changefreq, lastmod }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${locales.map(locale => {
  const altUrl = url.replace(/\/(en|ku)\//, `/${locale}/`);
  return `    <xhtml:link rel="alternate" hreflang="${locale}" href="${altUrl}" />`;
}).join('\n')}
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400', // 24 hours
    },
  });
}
