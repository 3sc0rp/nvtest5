import menuData from '@/data/menu.json';
import MenuPageClient from '@/components/MenuPageClient';
import type { Metadata } from 'next';
import { buildMetadata, createMenuJsonLd, websiteJsonLd } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: 'Menu - Nature Village',
    description: 'Explore our authentic Kurdish dishes, from smoky kebabs to hand‑rolled dolma.',
    path: '/menu',
    locale,
  });
}

interface LocalizedText { en: string; ku: string }

interface MenuItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image: string;
  category: string;
  tags: string[];
  spiceLevel: 0 | 1 | 2 | 3;
  popularity: number;
  seasonal: boolean;
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  prepTime: string;
  calories: number;
  featured: boolean;
}

interface Category {
  id: string;
  name: LocalizedText;
}

interface MenuData {
  items: MenuItem[];
  categories: Category[];
}

export default function MenuPage() {
  const data = menuData as MenuData;
  const items = data.items ?? [];
  const categories = data.categories ?? [];
  const jsonLd = createMenuJsonLd(
    categories.map((c) => ({
      name: c.name.en,
      description: c.name.en,
      items: items
        .filter((i) => i.category === c.id)
        .slice(0, 6)
        .map((i) => ({ name: i.name.en, description: i.description.en, price: `$${i.price.toFixed(2)}` })),
    }))
  );

  const siteLd = websiteJsonLd('https://naturevillage.com');

  return (
    <div className="bg-nv-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MenuPageClient items={items} categories={categories} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
      </div>
    </div>
  );
}
