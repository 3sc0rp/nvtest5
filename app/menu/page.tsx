import { Suspense } from 'react';
import { Metadata } from 'next';
import MenuPageClient from '@/components/MenuPageClient';
import menuData from '@/data/menu.json';

export const metadata: Metadata = {
  title: 'Menu - Nature Village | Authentic Kurdish Dishes & Traditional Recipes',
  description: 'Explore our authentic Kurdish menu featuring traditional recipes from the Zagros Mountains. Fresh ingredients, halal options, and vegetarian dishes available.',
  keywords: 'Kurdish menu, traditional Kurdish food, halal menu, vegetarian Kurdish dishes, authentic Middle Eastern food, kebab menu, dolma, baklava',
  openGraph: {
    title: 'Menu - Nature Village Kurdish Restaurant',
    description: 'Traditional Kurdish menu with authentic flavors from the Zagros Mountains',
    type: 'website',
    images: ['/images/hero-mountains.jpg']
  }
};

// Transform menu data for the client component
const items = menuData.items.map(item => ({
  ...item,
  // Ensure all required fields are present
  id: item.id,
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.image,
  category: item.category,
  tags: item.tags || [],
  spiceLevel: (item.spiceLevel || 0) as 0 | 1 | 2 | 3,
  popularity: item.popularity || 0,
  seasonal: item.seasonal || false,
  vegetarian: item.vegetarian || false,
  vegan: item.vegan || false,
  halal: item.halal || true,
  prepTime: item.prepTime || "15 mins",
  calories: item.calories || 0,
  featured: item.featured || false
}));

// Create categories based on menu items
const categories = [
  { id: 'all', name: { en: 'All', ku: 'هەموو' } },
  { id: 'appetizer', name: { en: 'Appetizers', ku: 'خواردنی سەرەتایی' } },
  { id: 'main', name: { en: 'Main Courses', ku: 'خواردنی سەرەکی' } },
  { id: 'vegetarian', name: { en: 'Vegetarian', ku: 'ڕووەکی' } },
  { id: 'dessert', name: { en: 'Desserts', ku: 'شیرینی' } },
  { id: 'beverage', name: { en: 'Beverages', ku: 'خواردنەوە' } }
];

export default function MenuPage() {
  return (
    <div className="bg-nv-paper min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-nv-sand to-nv-paper py-16 border-b border-nv-sand/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-nv-night mb-4">
            Menu
          </h1>
          <p className="font-body text-xl text-nv-olive max-w-3xl mx-auto leading-relaxed">
            Discover authentic Kurdish cuisine crafted with traditional recipes and the finest ingredients from the Zagros Mountains.
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center items-center gap-8 mt-8 text-nv-olive">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">100% Halal</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M5.293 13.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 11.414l-1.293 1.293a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Vegetarian Options</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Fire Grilled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 bg-nv-terracotta/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-nv-terracotta animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </div>
              <p className="text-nv-olive font-medium">Loading our delicious menu...</p>
            </div>
          </div>
        }>
          <MenuPageClient items={items} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}