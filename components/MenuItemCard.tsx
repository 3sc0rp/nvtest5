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

  // Enhanced dietary badges with better styling
  const dietaryBadges = [
    item.vegetarian ? { 
      label: 'V', 
      title: 'Vegetarian', 
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: '🌱'
    } : null,
    item.vegan ? { 
      label: 'VG', 
      title: 'Vegan', 
      color: 'bg-green-100 text-green-700 border-green-200',
      icon: '🌿'
    } : null,
    item.halal ? { 
      label: 'H', 
      title: 'Halal', 
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: '☪️'
    } : null,
  ].filter((badge): badge is { label: string; title: string; color: string; icon: string } => badge !== null);

  // Enhanced spice level indicators
  const spiceChilis = Array.from({ length: 3 }, (_, i) => (
    <motion.svg
      key={i}
      className={clsx(
        'w-4 h-4 transition-all duration-300',
        i < item.spiceLevel 
          ? 'text-red-500 drop-shadow-sm' 
          : 'text-gray-300'
      )}
      fill="currentColor"
      viewBox="0 0 20 20"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.1 + i * 0.1 }}
      whileHover={{ 
        scale: i < item.spiceLevel ? 1.2 : 1,
        transition: { duration: 0.2 }
      }}
    >
      <path d="M10 2C8.5 2 7.3 3.2 7.3 4.7c0 .8.3 1.5.8 2L5.5 9.3c-.5.5-.8 1.2-.8 2 0 1.5 1.2 2.7 2.7 2.7.8 0 1.5-.3 2-.8l2.6-2.6c.5.5 1.2.8 2 .8 1.5 0 2.7-1.2 2.7-2.7 0-.8-.3-1.5-.8-2L12.7 6.7c.5-.5.8-1.2.8-2C13.5 3.2 12.3 2 10.8 2H10z" />
    </motion.svg>
  ));

  return (
    <motion.article
      className="group relative bg-surface-elevated rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border/50 hover:border-primary/30"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Most Popular Ribbon */}
      {isMostPopular && (
        <motion.div 
          className="absolute -top-2 -right-2 z-20"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-nv-gold to-nv-saffron text-nv-night text-xs font-bold px-4 py-2 rounded-full shadow-glow border border-nv-gold-light/30">
            ⭐ Most Popular
          </div>
        </motion.div>
      )}

      {/* Seasonal Badge */}
      {item.seasonal && (
        <motion.div 
          className="absolute top-4 left-4 z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="bg-accent/90 text-nv-paper text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-accent-hover/20">
            🍂 Seasonal
          </div>
        </motion.div>
      )}

      {/* Image Container */}
      <div className="relative h-52 overflow-hidden rounded-t-3xl group-hover:scale-105 transition-transform duration-700">
        <Image
          src={item.image}
          alt={item.name.en}
          fill
          className="object-cover transition-all duration-700 group-hover:brightness-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-nv-night/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Price Badge */}
        <motion.div 
          className="absolute bottom-4 right-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-nv-gold to-nv-gold-light text-nv-night font-bold text-lg px-4 py-2 rounded-2xl shadow-glow border border-nv-gold/30 backdrop-blur-sm">
            ${item.price.toFixed(2)}
          </div>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="p-6 space-y-4">
        {/* Title and Tags Row */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <motion.h3 
              className="font-heading text-xl font-bold text-text-DEFAULT line-clamp-2 group-hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {item.name.en}
            </motion.h3>
            
            {/* Spice Level */}
            {item.spiceLevel > 0 && (
              <div className="flex items-center gap-1 p-2 bg-red-50 rounded-xl border border-red-200/50">
                <span className="text-xs font-medium text-red-700 mr-1">Heat:</span>
                {spiceChilis}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-text-muted text-sm leading-relaxed line-clamp-2 group-hover:text-text-DEFAULT transition-colors duration-300">
            {item.description.en}
          </p>
        </div>

        {/* Badges Row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Dietary Badges */}
          {dietaryBadges.map((badge) => (
            <motion.span
              key={badge.label}
              className={clsx(
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border",
                badge.color
              )}
              title={badge.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs">{badge.icon}</span>
              {badge.label}
            </motion.span>
          ))}

          {/* Popular Badge */}
          {isPopular && !isMostPopular && (
            <motion.span
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-nv-saffron/10 text-nv-saffron-dark border border-nv-saffron/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              🔥 Popular
            </motion.span>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-4 text-xs text-text-subtle">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.prepTime}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {item.calories} cal
            </span>
          </div>

          {/* Popularity Stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <motion.svg
                key={i}
                className={clsx(
                  'w-3 h-3 transition-colors duration-300',
                  i < Math.floor(item.popularity / 2) 
                    ? 'text-nv-gold' 
                    : 'text-gray-300'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.article>
  );
}