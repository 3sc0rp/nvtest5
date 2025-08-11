'use client';

import { useMemo, useState, useEffect } from 'react';
// Removed i18n import
// Removed language toggle
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { CategoryBadge } from './Badge';
import MenuItemCard from './MenuItemCard';
import { recommendByPrefs, trackView, type MenuItem as RecMenuItem } from '@/lib/recommend';

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

interface MenuPageClientProps {
  items: MenuItem[];
  categories: Category[];
}

export default function MenuPageClient({ items, categories }: MenuPageClientProps) {
  const locale = 'en';
  const isRTL = false;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial state from URL
  const initialCategory = searchParams.get('category') ?? 'all';
  const initialQuery = searchParams.get('q') ?? '';
  const initialPopular = searchParams.get('popular') === '1';
  const initialSeasonal = searchParams.get('seasonal') === '1';
  const initialVeg = searchParams.get('veg') === '1';

  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState<string>(initialQuery);
  const [popularOnly, setPopularOnly] = useState<boolean>(initialPopular);
  const [seasonalOnly, setSeasonalOnly] = useState<boolean>(initialSeasonal);
  const [vegOnly, setVegOnly] = useState<boolean>(initialVeg);

  // Sync state->URL without full reload
  useEffect(() => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (query.trim().length > 0) params.set('q', query.trim());
    if (popularOnly) params.set('popular', '1');
    if (seasonalOnly) params.set('seasonal', '1');
    if (vegOnly) params.set('veg', '1');

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [category, query, popularOnly, seasonalOnly, vegOnly, pathname, router]);

  // Recompute filtered items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((item) => {
      // Category filter
      if (category !== 'all' && item.category !== category) return false;

      // Text search across name and description in current locale and English as fallback
      if (q.length > 0) {
        const nameText = (item.name[locale as 'en' | 'ku'] || item.name.en || '').toLowerCase();
        const descText = (item.description[locale as 'en' | 'ku'] || item.description.en || '').toLowerCase();
        if (!nameText.includes(q) && !descText.includes(q)) return false;
      }

      // Popular toggle: popularity >= 8.5 or has 'popular' tag
      if (popularOnly && !(item.popularity >= 8.5 || item.tags.includes('popular'))) return false;

      // Seasonal toggle
      if (seasonalOnly && !item.seasonal) return false;

      // Vegetarian toggle: include vegetarian OR vegan items when enabled
      if (vegOnly && !(item.vegetarian || item.vegan)) return false;

      return true;
    });
  }, [items, category, query, popularOnly, seasonalOnly, vegOnly, locale]);

  // Track views for recommendations whenever the filtered set changes meaningfully
  useEffect(() => {
    // Track up to top 3 currently visible items to bias prefs
    filteredItems.slice(0, 3).forEach((it) => trackView(it as unknown as RecMenuItem));
  }, [filteredItems]);

  // Compute recommendations respecting current filters and time-of-day
  const recommended = useMemo(() => {
    // Exclude items not matching veg or category filters to keep rail relevant
    const basePool = items.filter((item) => {
      if (vegOnly && !(item.vegan || item.vegetarian)) return false;
      if (category !== 'all' && item.category !== category) return false;
      return true;
    });
    const recs = recommendByPrefs(basePool as unknown as RecMenuItem[], 10);
    // Remove anything already in top of current filtered list to diversify
    const usedIds = new Set(filteredItems.slice(0, 6).map((i) => i.id));
    return recs.filter((r) => !usedIds.has(r.id)).slice(0, 6) as unknown as MenuItem[];
  }, [items, filteredItems, category, vegOnly]);

  // UI helpers
  const categoryList = useMemo(() => [{ id: 'all', name: { en: 'All', ku: 'هەموو' } }, ...categories], [categories]);

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="font-heading text-4xl font-bold text-nv-ink">
          {locale === 'ku' ? 'مینو' : 'Menu'}
        </h1>
        <p className="font-body text-nv-olive mt-2">
          {locale === 'ku' ? 'خواردنەکان بەپێی پۆل، گەرم، و هەڵبژاردەکان بڵاو بکەرەوە' : 'Browse dishes by category, popularity, and preferences'}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-md space-y-4">
        {/* Category Tabs */}
        <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
          {categoryList.map((cat) => (
            <CategoryBadge
              key={cat.id}
              category={cat.id === 'all' ? 'side' : cat.id} // use neutral variant for "All"
              onClick={() => setCategory(cat.id)}
              interactive
              className={`${category === cat.id ? 'ring-2 ring-nv-terracotta' : ''}`}
              data-testid="category-filter"
            >
              {cat.name[locale as 'en' | 'ku']}
            </CategoryBadge>
          ))}
        </div>

        {/* Search + Toggles */}
        <div className={`flex flex-col md:flex-row gap-3 items-stretch ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={locale === 'ku' ? 'گەڕان...' : 'Search...'}
              className="w-full px-4 py-3 border-2 rounded-lg font-body border-nv-sand focus:border-nv-terracotta focus:outline-none"
            />
          </div>
          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => setPopularOnly((v) => !v)}
              className={`px-4 py-2 rounded-lg font-body text-sm border-2 transition-colors ${
                popularOnly ? 'bg-nv-terracotta text-white border-nv-terracotta' : 'border-nv-sand text-nv-ink hover:border-nv-olive'
              }`}
            >
              ⭐ {locale === 'ku' ? 'بەناوبانگ' : 'Popular'}
            </button>
            <button
              onClick={() => setSeasonalOnly((v) => !v)}
              className={`px-4 py-2 rounded-lg font-body text-sm border-2 transition-colors ${
                seasonalOnly ? 'bg-nv-terracotta text-white border-nv-terracotta' : 'border-nv-sand text-nv-ink hover:border-nv-olive'
              }`}
            >
              🍂 {locale === 'ku' ? 'وەرزی' : 'Seasonal'}
            </button>
            <button
              onClick={() => setVegOnly((v) => !v)}
              className={`px-4 py-2 rounded-lg font-body text-sm border-2 transition-colors ${
                vegOnly ? 'bg-nv-terracotta text-white border-nv-terracotta' : 'border-nv-sand text-nv-ink hover:border-nv-olive'
              }`}
            >
              🌱 {locale === 'ku' ? 'گیاخۆر' : 'Veg'}
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Rail */}
      {recommended.length > 0 && (
        <section>
          <div className={`flex items-baseline justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="font-heading text-2xl font-bold text-nv-ink">
              {locale === 'ku' ? 'پێشنیارکراو بۆ تۆ' : 'Recommended for you'}
            </h2>
            <span className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? 'لەسەر بنەمای هەڵبژاردەوە و کات' : 'Based on your preferences and time'}
            </span>
          </div>
          <div className="overflow-x-auto">
            <div className={`grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-4 pb-2 ${isRTL ? 'direction-rtl' : ''}`}>
              {recommended.map((item) => (
                <MenuItemCard key={`rec-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Count */}
      <div className={`text-sm font-body text-nv-olive ${isRTL ? 'text-right' : ''}`}>
        {filteredItems.length} {locale === 'ku' ? 'خواردن' : 'items'}
      </div>

      {/* Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} data-testid="menu-item" />
        ))}
      </motion.div>
    </div>
  );
}
