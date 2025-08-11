import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import { restaurantJsonLd } from "@/lib/seo";
import "../styles/globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nvtest5.vercel.app'),
  title: "Nature Village - Kurdish Restaurant",
  description: "Authentic Kurdish cuisine in a warm, welcoming atmosphere. Fresh ingredients, traditional recipes, and genuine hospitality in the heart of the village.",
  keywords: ["Kurdish restaurant", "authentic cuisine", "traditional food", "Middle Eastern", "Mediterranean", "halal", "fresh ingredients", "family restaurant"],
  authors: [{ name: "Nature Village Restaurant" }],
  openGraph: {
    title: "Nature Village - Kurdish Restaurant",
    description: "Experience authentic Kurdish cuisine in a warm, welcoming atmosphere. Fresh ingredients, traditional recipes, and genuine hospitality.",
    url: "https://nvtest5.vercel.app",
    siteName: "Nature Village Restaurant",
    images: [
      {
        url: "/images/hero-mountains.jpg",
        width: 1920,
        height: 1080,
        alt: "Nature Village Kurdish Restaurant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature Village - Kurdish Restaurant",
    description: "Experience authentic Kurdish cuisine in a warm, welcoming atmosphere.",
    images: ["/images/hero-mountains.jpg"],
    creator: "@NatureVillageKRD",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({children}:{children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.vercel.app" />
        
        {/* Critical resource preloads */}
        <link 
          rel="preload" 
          href="/images/hero-mountains.jpg" 
          as="image"
          type="image/jpeg"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable} antialiased`}>
        <PerformanceOptimizer />
        
        {/* Skip to content link for keyboard navigation */}
        <a 
          href="#main-content" 
          className="skip-link"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        
        <div className="min-h-screen flex flex-col">
          {/* Navigation */}
          <NavBar />
          
          {/* Main Content */}
          <main 
            id="main-content" 
            className="flex-1 pt-16 md:pt-20"
            role="main"
            aria-label="Main content"
          >
            {children}
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}