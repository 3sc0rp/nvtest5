'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryBadge } from './Badge';
import MenuItemCard from './MenuItemCard';
import { recommendByPrefs, trackView, type MenuItem as RecMenuItem } from '@/lib/recommend';
import clsx from 'clsx';

interface MenuItem {
  id: string;
  name: { en: string; ku: string };
  description: { en: string; ku: string };
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
  featured?: boolean;
}

interface Category {
  id: string;
  name: { en: string; ku: string };
}

interface MenuPageClientProps {
  items: MenuItem[];
  categories: Category[];
}

export default function MenuPageClient({ items, categories }: MenuPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPopular, setShowPopular] = useState(false);
  const [showSeasonal, setShowSeasonal] = useState(false);
  const [showVegetarian, setShowVegetarian] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'popularity'>('popularity');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Load filters from URL
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const popular = searchParams.get('popular') === 'true';
    const seasonal = searchParams.get('seasonal') === 'true';
    const vegetarian = searchParams.get('vegetarian') === 'true';
    const sort = searchParams.get('sort') as 'name' | 'price' | 'popularity' || 'popularity';

    setSelectedCategory(category);
    setSearchTerm(search);
    setShowPopular(popular);
    setShowSeasonal(seasonal);
    setShowVegetarian(vegetarian);
    setSortBy(sort);
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = (updates: Record<string, string | boolean>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === false || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const newURL = `${pathname}?${params.toString()}`;
    router.replace(newURL, { scroll: false });
  };

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    const filtered = items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && selectedCategory !== 'vegetarian') {
        if (item.category !== selectedCategory) return false;
      }
      
      // Special vegetarian category
      if (selectedCategory === 'vegetarian' && !item.vegetarian) return false;

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (
          !item.name.en.toLowerCase().includes(searchLower) &&
          !item.description.en.toLowerCase().includes(searchLower) &&
          !item.tags.some(tag => tag.toLowerCase().includes(searchLower))
        ) {
          return false;
        }
      }

      // Toggle filters
      if (showPopular && item.popularity < 8) return false;
      if (showSeasonal && !item.seasonal) return false;
      if (showVegetarian && !item.vegetarian) return false;

      return true;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.en.localeCompare(b.name.en);
        case 'price':
          return a.price - b.price;
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [items, selectedCategory, searchTerm, showPopular, showSeasonal, showVegetarian, sortBy]);

  // Track category views
  useEffect(() => {
    if (selectedCategory !== 'all') {
      // Track category interest for recommendations
      const categoryItems = items.filter(item => 
        selectedCategory === 'vegetarian' ? item.vegetarian : item.category === selectedCategory
      );
      
      categoryItems.slice(0, 3).forEach(item => {
        trackView({
          id: item.id,
          category: item.category,
          tags: item.tags,
          price: item.price,
          popularity: item.popularity
        } as RecMenuItem);
      });
    }
  }, [selectedCategory, items]);

  // Get recommended items
  const recommendedItems = useMemo(() => {
    const recItems: RecMenuItem[] = items.map(item => ({
      id: item.id,
      category: item.category,
      tags: item.tags,
      price: item.price,
      popularity: item.popularity
    } as RecMenuItem));
    
    return recommendByPrefs(recItems, new Date().getHours())
      .slice(0, 4)
      .map(rec => items.find(item => item.id === rec.id))
      .filter(Boolean) as MenuItem[];
  }, [items]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    updateURL({ category: categoryId });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    updateURL({ search: value });
  };

  const handleToggleChange = (toggle: string, value: boolean) => {
    const updates: Record<string, boolean> = {};
    updates[toggle] = value;
    
    if (toggle === 'popular') setShowPopular(value);
    if (toggle === 'seasonal') setShowSeasonal(value);
    if (toggle === 'vegetarian') setShowVegetarian(value);
    
    updateURL(updates);
  };

  const handleSortChange = (sort: 'name' | 'price' | 'popularity') => {
    setSortBy(sort);
    updateURL({ sort });
  };

  return (
    <div className="space-y-8">
      {/* Recommended Section - Time-based */}
      {recommendedItems.length > 0 && !searchTerm && selectedCategory === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-nv-gold/10 to-nv-saffron/10 rounded-2xl p-6 border border-nv-gold/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-nv-gold/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="font-heading text-xl font-bold text-nv-night">
              Recommended for You
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedItems.map((item, index) => (
              <div key={item.id} className="bg-nv-paper rounded-xl p-4 border border-nv-sand/50">
                <h3 className="font-heading font-semibold text-nv-night mb-1 text-sm line-clamp-1">
                  {item.name.en}
                </h3>
                <p className="text-xs text-nv-olive line-clamp-2 mb-2">
                  {item.description.en}
                </p>
                <div className="flex items-center justify-between">
                  <span className="price-badge text-xs">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-nv-olive">
                    {item.prepTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search dishes, ingredients, or flavors..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface border border-nv-sand rounded-xl focus:outline-none focus:ring-2 focus:ring-nv-terracotta focus:border-transparent transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-nv-olive/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              data-testid="category-filter"
              className={clsx(
                'px-6 py-3 rounded-xl font-medium transition-all duration-200',
                selectedCategory === category.id
                  ? 'bg-nv-terracotta text-nv-paper shadow-md'
                  : 'bg-surface border border-nv-sand hover:border-nv-terracotta/30 text-nv-night hover:bg-nv-terracotta/5'
              )}
            >
              {category.name.en}
            </button>
          ))}
        </div>

        {/* Filter Toggles and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface rounded-xl border border-nv-sand">
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPopular}
                onChange={(e) => handleToggleChange('popular', e.target.checked)}
                className="rounded border-nv-sand focus:ring-nv-terracotta"
              />
              <span className="text-sm font-medium text-nv-night">Popular</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showSeasonal}
                onChange={(e) => handleToggleChange('seasonal', e.target.checked)}
                className="rounded border-nv-sand focus:ring-nv-terracotta"
              />
              <span className="text-sm font-medium text-nv-night">Seasonal</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showVegetarian}
                onChange={(e) => handleToggleChange('vegetarian', e.target.checked)}
                className="rounded border-nv-sand focus:ring-nv-terracotta"
              />
              <span className="text-sm font-medium text-nv-night">Vegetarian Only</span>
            </label>
          </div>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as 'name' | 'price' | 'popularity')}
            className="px-3 py-2 bg-nv-paper border border-nv-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nv-terracotta"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-nv-olive">
          {filteredItems.length === 0 
            ? 'No dishes found'
            : filteredItems.length === 1
            ? '1 dish found'
            : `${filteredItems.length} dishes found`
          }
        </p>
        
        {(searchTerm || selectedCategory !== 'all' || showPopular || showSeasonal || showVegetarian) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setShowPopular(false);
              setShowSeasonal(false);
              setShowVegetarian(false);
              updateURL({ 
                search: '', 
                category: 'all', 
                popular: false, 
                seasonal: false, 
                vegetarian: false 
              });
            }}
            className="text-sm text-nv-terracotta hover:text-nv-saffron font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Menu Grid */}
      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-nv-sand/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-nv-olive/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-nv-night mb-2">
              No dishes found
            </h3>
            <p className="text-nv-olive">
              Try adjusting your filters or search for something else.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <MenuItemCard key={item.id} item={item} index={index} onClick={(it) => setSelectedItem(it)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simple Modal for item details */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedItem(null)} />
          <div role="dialog" aria-modal="true" data-testid="menu-item-modal" className="relative z-10 max-w-lg w-full bg-nv-paper rounded-2xl p-6 shadow-2xl border border-nv-sand">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-heading text-2xl font-bold text-nv-night">{selectedItem.name.en}</h3>
              <button aria-label="Close" className="text-nv-olive hover:text-nv-terracotta" onClick={() => setSelectedItem(null)}>
                ✕
              </button>
            </div>
            <p className="text-nv-olive mt-2">{selectedItem.description.en}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="price-badge">${selectedItem.price.toFixed(2)}</span>
              <span className="text-sm text-nv-olive">{selectedItem.prepTime}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}