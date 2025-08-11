'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';
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

interface DishCarouselProps {
  items: MenuItem[];
}

export default function DishCarousel({ items }: DishCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter featured items
  const featuredItems = items.filter(item => item.featured);
  const displayItems = featuredItems.length > 0 ? featuredItems : items.slice(0, 6);

  useEffect(() => {
    if (!isAutoPlaying || displayItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === displayItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayItems.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === displayItems.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayItems.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!displayItems.length) return null;

  const currentItem = displayItems[currentIndex];

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden bg-nv-sand/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={currentItem.image}
                alt={currentItem.name.en}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-nv-night/80 via-nv-night/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="w-full max-w-lg px-8 md:px-12">
                {/* Featured Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <span className="inline-flex items-center gap-2 bg-nv-gold/20 text-nv-gold px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured Dish
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-heading text-3xl md:text-4xl font-bold text-nv-paper mb-3"
                >
                  {currentItem.name.en}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-body text-nv-sand/90 text-lg leading-relaxed mb-6 line-clamp-3"
                >
                  {currentItem.description.en}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-6 mb-6"
                >
                  <div className="price-badge text-lg">
                    ${currentItem.price.toFixed(2)}
                  </div>
                  
                  <div className="flex items-center gap-1 text-nv-sand/80">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{currentItem.prepTime}</span>
                  </div>

                  {/* Spice Level */}
                  {currentItem.spiceLevel > 0 && (
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 3 }, (_, i) => (
                        <svg
                          key={i}
                          className={clsx(
                            'w-3 h-3',
                            i < currentItem.spiceLevel ? 'text-red-400' : 'text-gray-500'
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 6a3 3 0 11-6 0 3 3 0 016 0zM3 6a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    as={Link}
                    href="/menu"
                    variant="primary"
                    size="lg"
                    className="btn-hover-lift"
                  >
                    View Full Menu
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {displayItems.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-nv-paper/20 backdrop-blur-sm rounded-full text-nv-paper hover:bg-nv-paper/30 transition-all duration-200 hover:scale-110"
              aria-label="Previous dish"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-nv-paper/20 backdrop-blur-sm rounded-full text-nv-paper hover:bg-nv-paper/30 transition-all duration-200 hover:scale-110"
              aria-label="Next dish"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {displayItems.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {displayItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={clsx(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentIndex 
                  ? 'bg-nv-terracotta scale-125' 
                  : 'bg-nv-olive/30 hover:bg-nv-olive/50'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {isAutoPlaying && displayItems.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-nv-paper/20">
          <motion.div
            className="h-full bg-nv-gold"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
}