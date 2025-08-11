import type { Metadata } from 'next';
import { DefaultSeoProps } from 'next-seo';

// Default SEO configuration for the entire site
const defaultSEO: DefaultSeoProps = {
  title: 'Nature Village - Kurdish Restaurant',
  description: 'Experience authentic Kurdish cuisine in a warm, welcoming atmosphere. Fresh ingredients, traditional recipes, and genuine hospitality.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://naturevillage.com',
    siteName: 'Nature Village Restaurant',
    images: [
      {
        url: 'https://naturevillage.com/images/hero-mountains.jpg',
        width: 1920,
        height: 1080,
        alt: 'Nature Village Kurdish Restaurant',
      },
    ],
  },
  twitter: {
    handle: '@NatureVillageKRD',
    site: '@NatureVillageKRD',
    cardType: 'summary_large_image',
  },
  // ... other default SEO properties
};

export default defaultSEO;

// Restaurant JSON-LD schema
export const restaurantJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Nature Village',
  image: 'https://naturevillage.com/images/hero-mountains.jpg',
  url: 'https://naturevillage.com',
  telephone: '+1-555-123-4567',
  priceRange: '$$',
  servesCuisine: ['Kurdish', 'Middle Eastern', 'Mediterranean'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Kurdish Way',
    addressLocality: 'Village City',
    addressRegion: 'ST',
    postalCode: '12345',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '36.1914', // Example coordinates
    longitude: '44.0092',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '11:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '23:00',
    },
  ],
  menu: 'https://naturevillage.com/menu',
  acceptsReservations: 'True',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '250',
    bestRating: '5',
    worstRating: '1',
  },
};

// Website JSON-LD with SearchAction
export const websiteJsonLd = (baseUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nature Village',
  url: baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${baseUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
});

// FAQ JSON-LD builder
export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
});

// Menu JSON-LD schema helper
interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuSection {
  name: string;
  description: string;
  items?: MenuItem[];
}

export const createMenuJsonLd = (menuItems: MenuSection[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'Nature Village Menu',
  description: 'Authentic Kurdish cuisine featuring traditional recipes and fresh ingredients',
  hasMenuSection: menuItems.map((section) => ({
    '@type': 'MenuSection',
    name: section.name,
    description: section.description,
    hasMenuItem: section.items?.map((item: MenuItem) => ({
      '@type': 'MenuItem',
      name: item.name,
      description: item.description,
      offers: {
        '@type': 'Offer',
        price: item.price,
        priceCurrency: 'USD',
      },
    })),
  })),
});

// Event JSON-LD schema helper
export const createEventJsonLd = (event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: event.name,
  description: event.description,
  startDate: event.startDate,
  endDate: event.endDate,
  location: {
    '@type': 'Place',
    name: 'Nature Village Restaurant',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Village Street',
      addressLocality: 'Your City',
      addressRegion: 'Your State',
      postalCode: '12345',
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Nature Village Restaurant',
    url: 'https://naturevillage.com',
  },
});



// Metadata builder per page
export function buildMetadata({
  title,
  description,
  path,
  locale = 'en',
  baseUrl = 'https://naturevillage.com',
}: {
  title: string;
  description: string;
  path: string;
  locale?: string;
  baseUrl?: string;
}): Metadata {
  const ogUrl = `${baseUrl}/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Nature Village – Kurdish Restaurant')}`;
  const canonical = `${baseUrl}/${locale}${path.startsWith('/') ? path : `/${path}`}`;
  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Nature Village',
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
      locale: locale === 'en' ? 'en_US' : 'ckb_IQ',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
