'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

interface Testimonial {
  id: string;
  text: { en: string; ku: string };
  name: { en: string; ku: string };
  location: { en: string; ku: string };
  rating: number;
  date: string;
  avatar?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  variant?: 'default' | 'featured';
}

export default function TestimonialCard({ 
  testimonial, 
  index = 0, 
  variant = 'default' 
}: TestimonialCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <motion.article
      className={clsx(
        'relative overflow-hidden transition-all duration-500 group',
        isFeatured 
          ? 'bg-gradient-to-br from-nv-gold/10 via-surface-elevated to-nv-saffron/5 rounded-3xl shadow-glow border-2 border-nv-gold/30' 
          : 'bg-surface-elevated rounded-3xl shadow-md hover:shadow-xl border border-border/50 hover:border-primary/20'
      )}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ 
        y: isFeatured ? -12 : -6, 
        scale: isFeatured ? 1.03 : 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Decorative Pattern Background */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div 
          className="w-full h-full bg-pattern-floral bg-contain bg-no-repeat bg-top-right transform rotate-12 group-hover:rotate-0 transition-transform duration-700"
          style={{ filter: 'hue-rotate(25deg)' }}
        />
      </div>

      {/* Featured Badge */}
      {isFeatured && (
        <motion.div 
          className="absolute -top-3 -left-3 z-10"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-nv-gold to-nv-saffron text-nv-night text-xs font-bold px-4 py-2 rounded-full shadow-glow border border-nv-gold-light/30">
            ⭐ Featured Review
          </div>
        </motion.div>
      )}

      <div className="relative p-6 lg:p-8 space-y-6">
        {/* Quote Icon */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className={clsx(
            "w-12 h-12 rounded-2xl flex items-center justify-center",
            isFeatured 
              ? "bg-gradient-to-br from-nv-gold/20 to-nv-saffron/20 border border-nv-gold/30" 
              : "bg-primary/10 border border-primary/20"
          )}>
            <svg 
              className={clsx(
                "w-6 h-6",
                isFeatured ? "text-nv-gold" : "text-primary"
              )} 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.438c0-4.338 6.326-11.847 14.057-11.847.789 0 1.434.672 1.434 1.5s-.646 1.438-1.434 1.438c-4.458 0-8.057 4.59-8.057 8.409 0 .566.058 1.082.146 1.543.29-.087.677-.146 1.146-.146 2.41 0 4.375 1.965 4.375 4.375S12.752 22.5 10.342 22.5c-2.41 0-4.375-1.965-4.375-4.375 0-.554.113-1.082.313-1.563l-1.697-.241z"/>
            </svg>
          </div>
        </motion.div>

        {/* Testimonial Text */}
        <motion.blockquote 
          className={clsx(
            "relative text-text-muted leading-relaxed",
            isFeatured ? "text-lg font-medium" : "text-base"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="italic">&ldquo;{testimonial.text.en}&rdquo;</p>
        </motion.blockquote>

        {/* Rating Stars */}
        <motion.div 
          className="flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <motion.svg
              key={i}
              className={clsx(
                'w-5 h-5 transition-all duration-300',
                i < testimonial.rating 
                  ? isFeatured ? 'text-nv-gold drop-shadow-sm' : 'text-nv-saffron'
                  : 'text-gray-300'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
              whileHover={{ 
                scale: i < testimonial.rating ? 1.2 : 1,
                transition: { duration: 0.2 }
              }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
          <span className={clsx(
            "ml-2 text-sm font-semibold",
            isFeatured ? "text-nv-gold" : "text-text-subtle"
          )}>
            {testimonial.rating}/5
          </span>
        </motion.div>

        {/* Customer Info */}
        <motion.div 
          className="flex items-center gap-4 pt-4 border-t border-divider/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Avatar */}
          <div className={clsx(
            "relative flex-shrink-0 rounded-full overflow-hidden border-2",
            isFeatured ? "border-nv-gold/30 w-14 h-14" : "border-primary/20 w-12 h-12"
          )}>
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name.en}
                fill
                className="object-cover"
              />
            ) : (
              <div className={clsx(
                "w-full h-full flex items-center justify-center text-white font-bold text-lg",
                isFeatured ? "bg-gradient-to-br from-nv-gold to-nv-saffron" : "bg-gradient-to-br from-primary to-primary-hover"
              )}>
                {testimonial.name.en.charAt(0)}
              </div>
            )}
          </div>

          {/* Name and Details */}
          <div className="flex-1 min-w-0">
            <motion.h4 
              className={clsx(
                "font-semibold truncate",
                isFeatured ? "text-text-DEFAULT text-lg" : "text-text-DEFAULT"
              )}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {testimonial.name.en}
            </motion.h4>
            <div className="flex items-center gap-2 text-sm text-text-subtle">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{testimonial.location.en}</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex-shrink-0 text-xs text-text-subtle">
            <time dateTime={testimonial.date}>
              {new Date(testimonial.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
        </motion.div>

        {/* Verified Badge */}
        <motion.div 
          className="flex items-center justify-center pt-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        >
          <div className={clsx(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border",
            isFeatured 
              ? "bg-nv-gold/10 text-nv-gold-dark border-nv-gold/30" 
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          )}>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified Customer
          </div>
        </motion.div>
      </div>

      {/* Hover Glow Effect */}
      <div className={clsx(
        "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
        isFeatured 
          ? "bg-gradient-to-t from-nv-gold/5 via-transparent to-transparent" 
          : "bg-gradient-to-t from-primary/5 via-transparent to-transparent"
      )} />
    </motion.article>
  );
}