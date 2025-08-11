'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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

interface MenuItemCardProps {
  item: MenuItem;
  index?: number;
}

export default function MenuItemCard({ item, index = 0 }: MenuItemCardProps) {
  const isPopular = item.popularity >= 8;
  const isMostPopular = item.popularity >= 9;

  // Dietary badges
  const dietaryBadges = [
    item.vegetarian ? { label: 'V', title: 'Vegetarian', color: 'bg-green-100 text-green-800' } : null,
    item.vegan ? { label: 'VG', title: 'Vegan', color: 'bg-green-100 text-green-800' } : null,
    item.halal ? { label: 'H', title: 'Halal', color: 'bg-blue-100 text-blue-800' } : null,
  ].filter((badge): badge is { label: string; title: string; color: string } => badge !== null);

  // Spice level indicators
  const spiceChilis = Array.from({ length: 3 }, (_, i) => (
    <svg
      key={i}
      className={clsx(
        'w-3 h-3',
        i < item.spiceLevel ? 'text-red-500' : 'text-gray-300'
      )}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 6a3 3 0 11-6 0 3 3 0 016 0zM3 6a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ));

  return (
    <motion.div
      className="menu-card card-elevated group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
    >
      {/* Most Popular Ribbon */}
      {isMostPopular && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-nv-gold text-nv-night text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 translate-y-2 shadow-md">
            Most Popular
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name.en}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nv-night/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-nv-terracotta text-nv-paper text-xs font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="price-badge">
            ${item.price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-heading text-xl font-semibold text-nv-night mb-1 line-clamp-1">
            {item.name.en}
          </h3>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-nv-olive">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {item.prepTime}
            </span>
            
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.popularity.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-nv-olive text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description.en}
        </p>

        {/* Tags and Badges */}
        <div className="flex items-center justify-between">
          {/* Dietary Badges */}
          <div className="flex items-center gap-2">
            {dietaryBadges.map((badge, i) => (
              <span
                key={i}
                className={clsx(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  badge.color
                )}
                title={badge.title}
              >
                {badge.label}
              </span>
            ))}
          </div>

          {/* Spice Level */}
          {item.spiceLevel > 0 && (
            <div className="flex items-center gap-1" title={`Spice level: ${item.spiceLevel}/3`}>
              {spiceChilis}
            </div>
          )}
        </div>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-nv-sand/50">
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-nv-sand/50 text-nv-olive text-xs px-2 py-1 rounded-md capitalize"
                >
                  {tag.replace('-', ' ')}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-nv-olive/70">
                  +{item.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}