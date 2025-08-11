import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import DishCarousel from '@/components/DishCarousel';
import CultureStrip from '@/components/CultureStrip';
import Testimonials from '@/components/Testimonials';
import VisitUsStrip from '@/components/VisitUsStrip';
import NewsletterSignup from '@/components/NewsletterSignup';
import menuData from '@/data/menu.json';

// Sample testimonials data
const testimonials = [
  {
    id: 'test1',
    text: { 
      en: "The most authentic Kurdish food I've had outside of Kurdistan. Every bite takes me back to my grandmother's kitchen.", 
      ku: "" 
    },
    name: { en: "Amara Hassan", ku: "" },
    location: { en: "Erbil, Kurdistan", ku: "" },
    rating: 5,
    date: "2024-01-15",
    image: "/images/portrait-kurdish-woman.jpg"
  },
  {
    id: 'test2',
    text: { 
      en: "The kebabs are perfectly seasoned and grilled to perfection. The service makes you feel like family.", 
      ku: "" 
    },
    name: { en: "Michael Chen", ku: "" },
    location: { en: "San Francisco, CA", ku: "" },
    rating: 5,
    date: "2024-01-20"
  },
  {
    id: 'test3',
    text: { 
      en: "Outstanding vegetarian options! The dolma and fresh bread are incredible. Highly recommend!", 
      ku: "" 
    },
    name: { en: "Sarah Rodriguez", ku: "" },
    location: { en: "Los Angeles, CA", ku: "" },
    rating: 5,
    date: "2024-01-25"
  },
  {
    id: 'test4',
    text: { 
      en: "A hidden gem! The atmosphere is warm and inviting, and the flavors are absolutely divine.", 
      ku: "" 
    },
    name: { en: "David Park", ku: "" },
    location: { en: "Seattle, WA", ku: "" },
    rating: 5,
    date: "2024-02-01"
  },
  {
    id: 'test5',
    text: { 
      en: "This place captures the essence of Kurdish hospitality. The mountain honey baklava is out of this world!", 
      ku: "" 
    },
    name: { en: "Elena Kowalski", ku: "" },
    location: { en: "Portland, OR", ku: "" },
    rating: 5,
    date: "2024-02-05"
  },
  {
    id: 'test6',
    text: { 
      en: "Fresh ingredients, bold flavors, and genuine care in every dish. This is what authentic cuisine should be.", 
      ku: "" 
    },
    name: { en: "James Thompson", ku: "" },
    location: { en: "Denver, CO", ku: "" },
    rating: 5,
    date: "2024-02-10"
  }
];

export const metadata: Metadata = {
  title: 'Nature Village - Authentic Kurdish Cuisine | Traditional Flavors from the Zagros',
  description: 'Experience authentic Kurdish cuisine at Nature Village. Traditional recipes, fire-grilled meats, and Kurdish hospitality in the heart of the city. Fresh ingredients from the Zagros Mountains.',
  keywords: 'Kurdish restaurant, authentic Kurdish food, Zagros mountains, halal restaurant, traditional cuisine, kebab, dolma, baklava, Middle Eastern food',
  openGraph: {
    title: 'Nature Village - Authentic Kurdish Cuisine',
    description: 'Traditional Kurdish flavors from the Zagros Mountains. Fire-grilled meats, fresh herbs, and family recipes passed down for generations.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/hero-mountains.jpg',
        width: 1200,
        height: 630,
        alt: 'Nature Village Kurdish Restaurant - Zagros Mountains'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nature Village - Authentic Kurdish Cuisine',
    description: 'Traditional Kurdish flavors from the Zagros Mountains',
    images: ['/images/hero-mountains.jpg']
  }
};

export default function HomePage() {
  const menuItems = menuData.items.map(item => ({
    ...item,
    spiceLevel: (item.spiceLevel || 0) as 0 | 1 | 2 | 3
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Dishes Carousel */}
      <Section
        id="featured-dishes"
        title="Signature Dishes"
        description="Discover our most beloved recipes, each dish crafted with traditional methods and the finest ingredients from the Zagros highlands."
        className="bg-surface"
        showDivider={true}
        dividerVariant="pomegranate"
      >
        <DishCarousel items={menuItems} />
      </Section>

      {/* Culture & Story Section */}
      <Section
        id="our-story"
        title="Flavors Born in the Mountains"
        description="Every recipe tells a story of tradition, family, and the rich culinary heritage of Kurdistan."
        background="texture"
        showDivider={true}
        dividerVariant="floral"
      >
        <CultureStrip />
      </Section>

      {/* Testimonials Section */}
      <Section
        id="testimonials"
        title="What Our Guests Say"
        description="Hear from the families and food lovers who have made Nature Village part of their culinary journey."
        className="bg-surface"
        showDivider={true}
        dividerVariant="minimal"
      >
        <Testimonials testimonials={testimonials} />
      </Section>

      {/* Visit Us Section */}
      <Section
        id="visit-us"
        title="Visit Nature Village"
        description="We&apos;re located in the heart of the city, ready to welcome you with Kurdish hospitality."
        showDivider={true}
        dividerVariant="pomegranate"
      >
        <VisitUsStrip />
      </Section>

      {/* Newsletter Section */}
      <Section
        id="newsletter"
        title="Stay Connected"
        description="Be the first to know about new dishes, special events, and exclusive offers."
        className="bg-surface"
        showDivider={false}
      >
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </Section>
    </main>
  );
}