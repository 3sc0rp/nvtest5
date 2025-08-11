'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// Removed i18n imports
// Removed language toggle
import menuData from '@/data/menu.json';

interface Dish {
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
  spiceLevel: number;
  popularity: number;
  seasonal: boolean;
  vegetarian: boolean;
  vegan: boolean;
  halal: boolean;
  prepTime: string;
  calories: number;
  featured: boolean;
}

export default function DishCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const locale = 'en';
  const isRTL = false;
  // const t = useTranslations('menu'); // Unused for now
  
  const featuredDishes = (menuData.items as Dish[]).filter(item => item.featured);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredDishes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredDishes.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredDishes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredDishes.length) % featuredDishes.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getSpiceIcons = (level: number) => {
    return '🌶️'.repeat(level) + '○'.repeat(3 - level);
  };

  const getDietaryIcons = (dish: Dish) => {
    const icons = [];
    if (dish.halal) icons.push('☪️');
    if (dish.vegetarian) icons.push('🌱');
    if (dish.vegan) icons.push('🌿');
    return icons.join(' ');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-nv-paper to-nv-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.h2
            className="font-heading text-3xl md:text-4xl font-bold text-nv-ink mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Featured Dishes
          </motion.h2>
          <motion.p
            className="font-body text-lg text-nv-olive max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Each dish tells a story of Kurdish tradition and culinary heritage
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 grid md:grid-cols-2 gap-0"
                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Image Side */}
                <div className="relative h-64 md:h-full">
                  <Image
                    src={featuredDishes[currentIndex].image}
                    alt={featuredDishes[currentIndex].name[locale as 'en' | 'ku']}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-nv-ink/20" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-nv-terracotta text-nv-paper text-sm font-semibold rounded-full">
                      {featuredDishes[currentIndex].category.charAt(0).toUpperCase() + featuredDishes[currentIndex].category.slice(1)}
                    </span>
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-2 bg-nv-paper/90 text-nv-ink text-lg font-bold rounded-lg shadow-lg">
                      ${featuredDishes[currentIndex].price.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`p-6 md:p-8 lg:p-12 bg-nv-paper flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}>
                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-nv-ink mb-4">
                    {featuredDishes[currentIndex].name[locale as 'en' | 'ku']}
                  </h3>
                  
                  <p className="font-body text-nv-olive text-base md:text-lg leading-relaxed mb-6">
                    {featuredDishes[currentIndex].description[locale as 'en' | 'ku']}
                  </p>

                  {/* Dish Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="font-body text-sm text-nv-olive block mb-1">
                        {locale === 'ku' ? 'تیژی:' : 'Spice Level:'}
                      </span>
                      <span className="text-lg">
                        {getSpiceIcons(featuredDishes[currentIndex].spiceLevel)}
                      </span>
                    </div>
                    <div>
                      <span className="font-body text-sm text-nv-olive block mb-1">
                        {locale === 'ku' ? 'کات:' : 'Prep Time:'}
                      </span>
                      <span className="font-body text-nv-ink font-semibold">
                        {featuredDishes[currentIndex].prepTime}
                      </span>
                    </div>
                  </div>

                  {/* Dietary Icons */}
                  <div className="mb-6">
                    <span className="font-body text-sm text-nv-olive block mb-2">
                      {locale === 'ku' ? 'تایبەتمەندییەکان:' : 'Dietary:'}
                    </span>
                    <span className="text-xl">
                      {getDietaryIcons(featuredDishes[currentIndex])}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/${locale}/menu#${featuredDishes[currentIndex].id}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold rounded-lg transition-colors duration-200"
                    >
                      <span className={`${isRTL ? 'ml-2' : 'mr-2'}`}>📖</span>
                      {locale === 'ku' ? 'زیاتر بزانە' : 'View Full Menu'}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} z-10 w-12 h-12 bg-nv-paper/90 hover:bg-nv-paper text-nv-ink rounded-full shadow-lg transition-all duration-200 flex items-center justify-center`}
            aria-label={locale === 'ku' ? 'خواردنی پێشوو' : 'Previous dish'}
          >
            <span className="text-xl">{isRTL ? '→' : '←'}</span>
          </button>

          <button
            onClick={nextSlide}
            className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} z-10 w-12 h-12 bg-nv-paper/90 hover:bg-nv-paper text-nv-ink rounded-full shadow-lg transition-all duration-200 flex items-center justify-center`}
            aria-label={locale === 'ku' ? 'خواردنی دواتر' : 'Next dish'}
          >
            <span className="text-xl">{isRTL ? '←' : '→'}</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuredDishes.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index 
                    ? 'bg-nv-terracotta scale-125' 
                    : 'bg-nv-sand hover:bg-nv-olive'
                }`}
                aria-label={`${locale === 'ku' ? 'بڕۆ بۆ خواردنی' : 'Go to dish'} ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 text-nv-olive hover:text-nv-ink transition-colors duration-200"
            >
              <span className="text-sm font-body">
                {isAutoPlaying 
                  ? (locale === 'ku' ? '⏸ ڕاگرتن' : '⏸ Pause') 
                  : (locale === 'ku' ? '▶ دەستپێکردن' : '▶ Play')
                }
              </span>
            </button>
          </div>
        </div>

        {/* Quick Menu Preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredDishes.map((dish, index) => (
            <motion.button
              key={dish.id}
              onClick={() => goToSlide(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                currentIndex === index 
                  ? 'ring-4 ring-nv-terracotta scale-105' 
                  : 'hover:scale-105 hover:shadow-lg'
              }`}
              style={{ aspectRatio: '1', minHeight: '80px' }}
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={dish.image}
                alt={dish.name[locale as 'en' | 'ku']}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                loading="lazy"
                quality={80}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
              <div className="absolute inset-0 bg-nv-ink/20 hover:bg-nv-ink/10 transition-colors duration-200" />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-nv-ink/80 to-transparent">
                <p className="text-nv-paper text-xs font-medium truncate">
                  {dish.name[locale as 'en' | 'ku']}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
