import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import '../styles/globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import SkipLink from '@/components/SkipLink';

// Font configurations
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#B4532A',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://naturevillage.com'),
  title: {
    default: 'Nature Village - Authentic Kurdish Cuisine | Traditional Flavors from the Zagros',
    template: '%s | Nature Village Kurdish Restaurant'
  },
  description: 'Experience authentic Kurdish cuisine at Nature Village. Traditional recipes, fire-grilled meats, and Kurdish hospitality in the heart of the city. Fresh ingredients from the Zagros Mountains.',
  keywords: [
    'Kurdish restaurant',
    'authentic Kurdish food',
    'Zagros mountains',
    'halal restaurant',
    'traditional cuisine',
    'kebab',
    'dolma',
    'baklava',
    'Middle Eastern food',
    'fire grilled',
    'vegetarian options'
  ],
  authors: [{ name: 'Nature Village Restaurant' }],
  creator: 'Nature Village',
  publisher: 'Nature Village Restaurant',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://naturevillage.com',
    siteName: 'Nature Village Kurdish Restaurant',
    title: 'Nature Village - Authentic Kurdish Cuisine',
    description: 'Traditional Kurdish flavors from the Zagros Mountains. Fire-grilled meats, fresh herbs, and family recipes passed down for generations.',
    images: [
      {
        url: '/images/hero-mountains.jpg',
        width: 1200,
        height: 630,
        alt: 'Nature Village Kurdish Restaurant - Zagros Mountains landscape with traditional Kurdish patterns',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nature Village - Authentic Kurdish Cuisine',
    description: 'Traditional Kurdish flavors from the Zagros Mountains',
    images: ['/images/hero-mountains.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-site-verification',
    // yandex: 'your-yandex-verification',
    // yahoo: 'your-yahoo-verification',
  },
  category: 'restaurant',
  classification: 'business',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      dir="ltr" 
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <head>
        {/* Preconnect to font origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-body text-nv-night bg-nv-paper antialiased">
        <SkipLink />

        {/* Performance optimization component */}
        <PerformanceOptimizer />

        {/* Navigation */}
        <NavBar />

        {/* Main content */}
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Nature Village',
              description: 'Authentic Kurdish restaurant featuring traditional recipes and fire-grilled specialties from the Zagros Mountains.',
              url: 'https://naturevillage.com',
              telephone: '+1-555-123-4567',
              email: 'info@naturevillage.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Village Street',
                addressLocality: 'City',
                addressRegion: 'State',
                postalCode: '12345',
                addressCountry: 'US'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '37.7749',
                longitude: '-122.4194'
              },
              openingHours: [
                'Mo-Th 11:00-22:00',
                'Fr-Sa 11:00-23:00',
                'Su 12:00-21:00'
              ],
              priceRange: '$$',
              servesCuisine: ['Kurdish', 'Middle Eastern', 'Mediterranean'],
              paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
              currenciesAccepted: 'USD',
              hasMenu: 'https://naturevillage.com/menu',
              acceptsReservations: true,
              image: 'https://naturevillage.com/images/hero-mountains.jpg',
              logo: 'https://naturevillage.com/favicon.ico',
              sameAs: [
                // Add social media URLs when available
                // 'https://facebook.com/naturevillage',
                // 'https://instagram.com/naturevillage',
                // 'https://twitter.com/naturevillage'
              ]
            })
          }}
        />
      </body>
    </html>
  );
}