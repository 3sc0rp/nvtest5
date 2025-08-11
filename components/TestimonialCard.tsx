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
  image?: string;
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
    <motion.div
      className={clsx(
        'card-elevated p-6 relative overflow-hidden',
        isFeatured ? 'border-2 border-nv-gold/20' : ''
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Decorative Pattern */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <div 
          className="w-full h-full bg-pattern-floral bg-contain bg-no-repeat bg-top-right"
          style={{ filter: 'hue-rotate(25deg)' }}
        />
      </div>

      {/* Quote Icon */}
      <div className="relative">
        <svg
          className="w-8 h-8 text-nv-gold/30 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={clsx(
                'w-4 h-4',
                i < testimonial.rating ? 'text-nv-gold' : 'text-gray-300'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="font-body text-nv-olive italic leading-relaxed mb-6 relative z-10">
          &ldquo;{testimonial.text.en}&rdquo;
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-nv-sand">
            {testimonial.image ? (
              <Image
                src={testimonial.image}
                alt={testimonial.name.en}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-nv-terracotta to-nv-saffron">
                <span className="text-nv-paper font-semibold text-lg">
                  {testimonial.name.en.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Author Details */}
          <div className="flex-1">
            <h4 className="font-heading text-nv-night font-semibold">
              {testimonial.name.en}
            </h4>
            <p className="text-sm text-nv-olive">
              {testimonial.location.en}
            </p>
            <p className="text-xs text-nv-olive/70 mt-1">
              {new Date(testimonial.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute -top-2 -right-2">
            <div className="bg-nv-gold text-nv-night text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Featured Review
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
