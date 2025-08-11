import type { Metadata } from 'next';
import Section from '@/components/Section';
import Button from '@/components/Button';
import Image from 'next/image';
// import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gallery - Nature Village | Photos of Kurdish Cuisine & Restaurant',
  description: 'Browse photos of our authentic Kurdish dishes, warm restaurant atmosphere, and traditional cooking methods. See why Nature Village is the premier Kurdish dining destination.',
  keywords: 'Kurdish food photos, restaurant gallery, authentic cuisine images, Nature Village photos, Kurdish dishes',
  openGraph: {
    title: 'Gallery - Nature Village Kurdish Restaurant',
    description: 'Browse photos of our authentic Kurdish dishes and warm atmosphere',
    images: ['/images/hero-mountains.jpg']
  }
};

// Gallery data - in a real app, this would come from a CMS
const galleryImages = [
  {
    id: 1,
    src: '/images/hero-mountains.jpg',
    alt: 'Zagros Mountains landscape with traditional Kurdish patterns',
    category: 'atmosphere',
    title: 'Inspired by the Zagros'
  },
  {
    id: 2,
    src: '/images/interior-booths.jpg',
    alt: 'Warm restaurant interior with traditional Kurdish decorations',
    category: 'interior',
    title: 'Cozy Dining Space'
  },
  {
    id: 3,
    src: '/images/portrait-kurdish-woman.jpg',
    alt: 'Traditional Kurdish cultural portrait',
    category: 'culture',
    title: 'Kurdish Heritage'
  },
  // Additional placeholder images using the same 3 images
  {
    id: 4,
    src: '/images/hero-mountains.jpg',
    alt: 'Fresh Kurdish kebabs on the grill',
    category: 'food',
    title: 'Fire-Grilled Perfection'
  },
  {
    id: 5,
    src: '/images/interior-booths.jpg',
    alt: 'Traditional dolma with fresh herbs',
    category: 'food',
    title: 'Handmade Dolma'
  },
  {
    id: 6,
    src: '/images/portrait-kurdish-woman.jpg',
    alt: 'Golden baklava with honey and nuts',
    category: 'food',
    title: 'Sweet Endings'
  },
  {
    id: 7,
    src: '/images/hero-mountains.jpg',
    alt: 'Chef preparing traditional Kurdish bread',
    category: 'kitchen',
    title: 'Artisan Bread Making'
  },
  {
    id: 8,
    src: '/images/interior-booths.jpg',
    alt: 'Spices and herbs used in Kurdish cooking',
    category: 'ingredients',
    title: 'Mountain Herbs & Spices'
  },
  {
    id: 9,
    src: '/images/portrait-kurdish-woman.jpg',
    alt: 'Family dining together at Nature Village',
    category: 'atmosphere',
    title: 'Family Gathering'
  }
];

const categories = [
  { id: 'all', name: 'All Photos' },
  { id: 'food', name: 'Our Dishes' },
  { id: 'interior', name: 'Restaurant' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'culture', name: 'Heritage' },
  { id: 'atmosphere', name: 'Atmosphere' }
];

export default function GalleryPage() {
  return (
    <div className="bg-nv-paper min-h-screen">
      {/* Hero Section */}
      <Section
        title="Gallery"
        description="Experience the sights, flavors, and warmth of Nature Village through our photo collection."
        className="bg-gradient-to-br from-nv-sand to-nv-paper border-b border-nv-sand/50"
      >
        <div className="text-center max-w-3xl mx-auto">
          <p className="font-body text-lg text-nv-olive leading-relaxed">
            From the vibrant colors of our traditional dishes to the warm ambiance of our dining space, 
            these images capture the essence of authentic Kurdish cuisine and hospitality.
          </p>
        </div>
      </Section>

      {/* Gallery Grid */}
      <Section>
        <div className="space-y-8">
          {/* Category Filters - Simple for now */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-200 bg-surface border border-nv-sand hover:border-nv-terracotta/30 text-nv-night hover:bg-nv-terracotta/5"
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="break-inside-avoid mb-6"
              >
                <div className="card-elevated overflow-hidden group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-nv-night/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-nv-paper font-heading font-semibold text-lg">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More (placeholder) */}
          <div className="text-center">
            <button className="px-8 py-3 bg-nv-terracotta text-nv-paper rounded-xl font-medium hover:bg-nv-terracotta/90 transition-colors btn-hover-lift">
              Load More Photos
            </button>
          </div>
        </div>
      </Section>

      {/* Visit Us CTA */}
      <Section
        title="Experience It in Person"
        description="Photos can only capture so much. Come taste the authentic flavors and feel the warm hospitality yourself."
        className="bg-surface"
      >
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as="a"
              href="/reservations"
              variant="primary"
              size="lg"
              className="btn-hover-lift"
            >
              Make a Reservation
            </Button>
            
            <Button
              as="a"
              href="/menu"
              variant="secondary"
              size="lg"
              className="btn-hover-lift"
            >
              View Our Menu
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}