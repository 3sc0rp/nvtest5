'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// Removed i18n import
// Removed language toggle
import Badge, { DietaryBadge, SpiceBadge, CategoryBadge, TagBadge, PopularityBadge, PriceBadge } from './Badge';

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

interface MenuItemCardProps {
  item: MenuItem;
  onClick?: (item: MenuItem) => void;
  onAddToCart?: (item: MenuItem) => void;
  showFullDetails?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export default function MenuItemCard({
  item,
  onClick,
  onAddToCart,
  showFullDetails = true,
  variant = 'default',
  className = ''
}: MenuItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const locale = 'en';
  const isRTL = false;

  const cardVariants = {
    default: "bg-white rounded-xl shadow-lg hover:shadow-xl",
    compact: "bg-white rounded-lg shadow-md hover:shadow-lg",
    featured: "bg-gradient-to-br from-white to-nv-sand/20 rounded-xl shadow-xl hover:shadow-2xl border border-nv-saffron/20"
  };

  const handleClick = () => {
    if (onClick) {
      onClick(item);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <motion.div
      className={`${cardVariants[variant]} overflow-hidden transition-all duration-300 cursor-pointer group ${className}`}
      onClick={handleClick}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      {/* Image Section */}
      <div className="relative h-48 md:h-56 overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <div className={`absolute inset-0 bg-nv-sand/20 transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
        
        <Image
          src={item.image}
          alt={item.name[locale as 'en' | 'ku']}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.featured && (
            <Badge variant="featured" icon="⭐" size="sm" animate={false}>
              {locale === 'ku' ? 'تایبەت' : 'Featured'}
            </Badge>
          )}
          {item.seasonal && (
            <Badge variant="seasonal" icon="🍂" size="sm" animate={false}>
              {locale === 'ku' ? 'وەرزی' : 'Seasonal'}
            </Badge>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <PriceBadge price={item.price} animate={false} />
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <CategoryBadge category={item.category} size="sm" animate={false}>
            {locale === 'ku' ? 
              (item.category === 'main' ? 'سەرەکی' : 
               item.category === 'appetizer' ? 'پێشخوان' :
               item.category === 'dessert' ? 'شیرینی' :
               item.category === 'beverage' ? 'خواردنەوە' :
               item.category === 'soup' ? 'شۆربا' :
               item.category === 'salad' ? 'زەڵاتە' :
               item.category === 'side' ? 'لاوەکی' : item.category)
              : item.category.charAt(0).toUpperCase() + item.category.slice(1)
            }
          </CategoryBadge>
        </div>

        {/* Popularity Score */}
        {showFullDetails && (
          <div className="absolute bottom-3 right-3">
            <PopularityBadge score={item.popularity} size="sm" animate={false} />
          </div>
        )}

        {/* Quick Add Button */}
        {onAddToCart && (
          <motion.button
            onClick={handleAddToCart}
            className="absolute inset-0 bg-nv-terracotta/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <span className="text-2xl">🛒</span>
            </span>
          </motion.button>
        )}
      </div>

      {/* Content Section */}
      <div className={`p-4 md:p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="font-heading text-lg md:text-xl font-bold text-nv-ink mb-2 line-clamp-2 group-hover:text-nv-terracotta transition-colors duration-200">
            {item.name[locale as 'en' | 'ku']}
          </h3>
          
          <p className={`font-body text-nv-olive text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
            {item.description[locale as 'en' | 'ku']}
          </p>
          
          {item.description[locale as 'en' | 'ku'].length > 120 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-nv-terracotta text-xs font-semibold mt-1 hover:underline"
            >
              {isExpanded 
                ? (locale === 'ku' ? 'کەمتر' : 'Show less')
                : (locale === 'ku' ? 'زیاتر' : 'Read more')
              }
            </button>
          )}
        </div>

        {/* Dietary and Spice Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.halal && (
            <DietaryBadge type="halal" size="sm">
              {locale === 'ku' ? 'حەڵاڵ' : 'Halal'}
            </DietaryBadge>
          )}
          {item.vegetarian && (
            <DietaryBadge type="vegetarian" size="sm">
              {locale === 'ku' ? 'گیاخۆر' : 'Vegetarian'}
            </DietaryBadge>
          )}
          {item.vegan && (
            <DietaryBadge type="vegan" size="sm">
              {locale === 'ku' ? 'ڕاستە گیاخۆر' : 'Vegan'}
            </DietaryBadge>
          )}
          
          {item.spiceLevel > 0 && (
            <SpiceBadge level={item.spiceLevel} size="sm">
              {locale === 'ku' ? 'تیژی' : 'Spice'} {item.spiceLevel}/3
            </SpiceBadge>
          )}
        </div>

        {/* Tags */}
        {showFullDetails && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} size="sm">
                {locale === 'ku' ? 
                  (tag === 'traditional' ? 'نەریتی' :
                   tag === 'popular' ? 'بەناوبانگ' :
                   tag === 'healthy' ? 'تەندروست' :
                   tag === 'spicy' ? 'تیژ' :
                   tag === 'sweet' ? 'شیرین' : tag)
                  : tag.replace('-', ' ')
                }
              </TagBadge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="tag" size="sm">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && showFullDetails && (
            <motion.div
              className="border-t border-nv-sand pt-4 mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-nv-ink">
                    {locale === 'ku' ? 'کات:' : 'Prep Time:'}
                  </span>
                  <span className="text-nv-olive ml-2">{item.prepTime}</span>
                </div>
                <div>
                  <span className="font-semibold text-nv-ink">
                    {locale === 'ku' ? 'کالۆری:' : 'Calories:'}
                  </span>
                  <span className="text-nv-olive ml-2">{item.calories}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className={`flex items-center justify-between mt-4 pt-4 border-t border-nv-sand/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center space-x-2">
            <span className="font-heading text-xl font-bold text-nv-terracotta">
              {formatPrice(item.price)}
            </span>
          </div>

          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            {onAddToCart && (
              <motion.button
                onClick={handleAddToCart}
                className="bg-nv-terracotta hover:bg-nv-terracotta/90 text-white px-4 py-2 rounded-lg font-body font-semibold text-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center space-x-1">
                  <span>🛒</span>
                  <span>{locale === 'ku' ? 'زیادکردن' : 'Add'}</span>
                </span>
              </motion.button>
            )}

            <motion.button
              onClick={handleClick}
              className="border-2 border-nv-olive text-nv-olive hover:bg-nv-olive hover:text-white px-3 py-2 rounded-lg font-body font-semibold text-sm transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {locale === 'ku' ? 'وردەکاری' : 'Details'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Compact variant for lists
export function CompactMenuItemCard({ item, ...props }: Omit<MenuItemCardProps, 'variant'>) {
  return (
    <MenuItemCard 
      {...props} 
      item={item} 
      variant="compact" 
      showFullDetails={false}
    />
  );
}

// Featured variant for highlighting
export function FeaturedMenuItemCard({ item, ...props }: Omit<MenuItemCardProps, 'variant'>) {
  return (
    <MenuItemCard 
      {...props} 
      item={item} 
      variant="featured" 
      showFullDetails={true}
    />
  );
}
