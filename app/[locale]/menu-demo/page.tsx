'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useCurrentLocale } from '@/components/LanguageToggle';
import MenuItemCard, { CompactMenuItemCard, FeaturedMenuItemCard } from '@/components/MenuItemCard';
import Badge, { CategoryBadge } from '@/components/Badge';
import menuData from '@/data/menu.json';

interface MenuItem {
  id: string;
  name: {
    en: string;
    ku: string;
  };
  description: {
    en: string;
    ku: string;
  };
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

export default function MenuDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<MenuItem[]>([]);
  const locale = useLocale();
  const { isRTL } = useCurrentLocale();

  const menuItems = menuData.items as MenuItem[];
  const categories = menuData.categories;

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const featuredItems = menuItems.filter(item => item.featured);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => [...prev, item]);
    // You could add a toast notification here
    console.log('Added to cart:', item.name[locale as 'en' | 'ku']);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={`min-h-screen bg-nv-paper ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-nv-terracotta to-nv-saffron text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {locale === 'ku' ? 'نمایشی کارتی مینو' : 'Menu Card Demo'}
          </motion.h1>
          <motion.p
            className="font-body text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {locale === 'ku' 
              ? 'کارتی خواردنە کوردییەکان لەگەڵ وردەکاری تەواو'
              : 'Showcase of Kurdish menu items with full details and interactive badges'
            }
          </motion.p>
          
          {/* Cart Counter */}
          {cart.length > 0 && (
            <motion.div
              className="mt-6 inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl">🛒</span>
              <span className="font-semibold">
                {cart.length} {locale === 'ku' ? 'بابەت' : 'items'}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Featured Items Section */}
        <section className="mb-16">
          <motion.h2
            className="font-heading text-3xl font-bold text-nv-ink mb-8"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {locale === 'ku' ? 'خواردنە تایبەتەکان' : 'Featured Dishes'}
          </motion.h2>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredItems.slice(0, 3).map((item) => (
              <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <FeaturedMenuItemCard
                  item={item}
                  onClick={handleItemClick}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <motion.h2
            className="font-heading text-3xl font-bold text-nv-ink mb-6"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {locale === 'ku' ? 'هەموو خواردنەکان' : 'Full Menu'}
          </motion.h2>

          <div className={`flex flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <Badge
              variant={selectedCategory === 'all' ? 'featured' : 'tag'}
              onClick={() => setSelectedCategory('all')}
              interactive
              className="cursor-pointer"
            >
              {locale === 'ku' ? 'هەموو' : 'All'}
            </Badge>
            
            {categories.map((category) => (
              <CategoryBadge
                key={category.id}
                category={category.id}
                onClick={() => setSelectedCategory(category.id)}
                interactive
                className="cursor-pointer"
              >
                {category.name[locale as 'en' | 'ku']}
              </CategoryBadge>
            ))}
          </div>
        </section>

        {/* Menu Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory} // Re-animate when category changes
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id} 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              layout
            >
              <MenuItemCard
                item={item}
                onClick={handleItemClick}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Compact Cards Section */}
        <section className="mt-16">
          <motion.h2
            className="font-heading text-3xl font-bold text-nv-ink mb-8"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {locale === 'ku' ? 'کارتی کورت' : 'Compact Cards'}
          </motion.h2>
          
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {menuItems.slice(0, 4).map((item) => (
              <motion.div key={`compact-${item.id}`} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <CompactMenuItemCard
                  item={item}
                  onClick={handleItemClick}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Badge Showcase */}
        <section className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <motion.h2
            className="font-heading text-3xl font-bold text-nv-ink mb-8"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {locale === 'ku' ? 'نمایشی نیشانە' : 'Badge Showcase'}
          </motion.h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-nv-ink mb-3">
                {locale === 'ku' ? 'نیشانەی خواردن:' : 'Dietary Badges:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="vegetarian" icon="🌱">Vegetarian</Badge>
                <Badge variant="vegan" icon="🌿">Vegan</Badge>
                <Badge variant="halal" icon="☪️">Halal</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-nv-ink mb-3">
                {locale === 'ku' ? 'ئاستی تیژی:' : 'Spice Levels:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="spice-0" icon="○">Mild</Badge>
                <Badge variant="spice-1" icon="🌶️">Medium</Badge>
                <Badge variant="spice-2" icon="🌶️🌶️">Hot</Badge>
                <Badge variant="spice-3" icon="🌶️🌶️🌶️">Very Hot</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-nv-ink mb-3">
                {locale === 'ku' ? 'نیشانەی تایبەت:' : 'Special Badges:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="popular" icon="⭐">Popular</Badge>
                <Badge variant="chef-special" icon="👨‍🍳">Chef&apos;s Special</Badge>
                <Badge variant="seasonal" icon="🍂">Seasonal</Badge>
                <Badge variant="featured" icon="✨">Featured</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-nv-ink mb-3">
                {locale === 'ku' ? 'پۆلەکان:' : 'Categories:'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="appetizer">Appetizer</Badge>
                <Badge variant="main">Main Course</Badge>
                <Badge variant="dessert">Dessert</Badge>
                <Badge variant="beverage">Beverage</Badge>
                <Badge variant="soup">Soup</Badge>
                <Badge variant="salad">Salad</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: locale === 'ku' ? 'کۆی خواردن' : 'Total Items', value: menuItems.length },
            { label: locale === 'ku' ? 'تایبەت' : 'Featured', value: featuredItems.length },
            { label: locale === 'ku' ? 'گیاخۆر' : 'Vegetarian', value: menuItems.filter(i => i.vegetarian).length },
            { label: locale === 'ku' ? 'وەرزی' : 'Seasonal', value: menuItems.filter(i => i.seasonal).length },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-lg p-6 text-center shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="font-heading text-3xl font-bold text-nv-terracotta mb-2">
                {stat.value}
              </div>
              <div className="font-body text-nv-olive text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </section>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <MenuItemCard
              item={selectedItem}
              onAddToCart={handleAddToCart}
              showFullDetails={true}
              className="shadow-none"
            />
            <div className="p-6 border-t border-nv-sand">
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full bg-nv-olive hover:bg-nv-olive/90 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                {locale === 'ku' ? 'داخستن' : 'Close'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
