'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { getImagePath, getPatternPath } from '@/lib/assets';
import { useCurrentLocale } from './LanguageToggle';
import { accessibleMotion, heroTextVariants, staggerContainerVariants, prefersReducedMotion } from '@/lib/motion';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations('hero');
  const locale = useLocale();
  const { isRTL } = useCurrentLocale();
  const { scrollY } = useScroll();
  
  // Parallax effects - respect reduced motion
  const shouldReduceMotion = prefersReducedMotion();
  const yBg = useTransform(scrollY, [0, 800], shouldReduceMotion ? [0, 0] : [0, 200]);
  const ySunRays = useTransform(scrollY, [0, 800], shouldReduceMotion ? [0, 0] : [0, -100]);
  const scale = useTransform(scrollY, [0, 400], shouldReduceMotion ? [1, 1] : [1, 1.1]);

  useEffect(() => {
    // Preload critical images
    const img = new window.Image();
    img.onload = () => setIsLoaded(true);
    img.src = getImagePath('heroMountains');
  }, []);

  const containerVariants = staggerContainerVariants;
  const itemVariants = heroTextVariants;
  
  const sunRaysVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    visible: { opacity: 0.6, scale: 1, transition: { duration: shouldReduceMotion ? 0 : 0.8 } },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
      role="banner"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: yBg, scale }}
      >
        <div className="relative w-full h-full">
          <Image
            src={getImagePath('heroMountains')}
            alt="Zagros Mountains - Kurdish Heritage"
            fill
            priority
            className={`object-cover transition-opacity duration-1000 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-nv-ink/40 via-transparent to-nv-ink/60" />
          <div className="absolute inset-0 bg-nv-terracotta/10" />
        </div>
      </motion.div>

      {/* Animated Sun Rays Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ y: ySunRays }}
        variants={sunRaysVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="relative w-96 h-96 md:w-[600px] md:h-[600px] opacity-30"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Image
            src={getPatternPath('sunRays')}
            alt=""
            fill
            className="object-contain"
            loading="lazy"
            quality={75}
          />
        </motion.div>
      </motion.div>

      {/* Decorative Floral Corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 md:w-24 md:h-24 opacity-60"
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          animate={{ opacity: 0.6, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Image
            src={getPatternPath('floralCorner')}
            alt=""
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Top Right Corner */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 md:w-24 md:h-24 opacity-60"
          initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
          animate={{ opacity: 0.6, scale: 1, rotate: 90 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Image
            src={getPatternPath('floralCorner')}
            alt=""
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Bottom Left Corner */}
        <motion.div
          className="absolute bottom-8 left-8 w-16 h-16 md:w-24 md:h-24 opacity-60"
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          animate={{ opacity: 0.6, scale: 1, rotate: -90 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <Image
            src={getPatternPath('floralCorner')}
            alt=""
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Bottom Right Corner */}
        <motion.div
          className="absolute bottom-8 right-8 w-16 h-16 md:w-24 md:h-24 opacity-60"
          initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
          animate={{ opacity: 0.6, scale: 1, rotate: 180 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <Image
            src={getPatternPath('floralCorner')}
            alt=""
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Hero Content */}
      <motion.div
        className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${
          isRTL ? 'text-right' : 'text-left'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-nv-paper mb-6 ${
              isRTL ? 'text-right' : 'text-left md:text-center'
            }`}
            variants={itemVariants}
          >
            <span className="block">
              {locale === 'ku' ? 'تامی کوردی لە زاگرۆسەوە' : 'Kurdish flavors'}
            </span>
            <span className="block text-nv-saffron">
              {locale === 'ku' ? '' : 'from the Zagros'}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className={`font-body text-lg sm:text-xl md:text-2xl text-nv-sand max-w-3xl mx-auto mb-8 leading-relaxed ${
              isRTL ? 'text-right' : 'text-left md:text-center'
            }`}
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center ${
              isRTL ? 'sm:flex-row-reverse' : ''
            }`}
            variants={itemVariants}
          >
            {/* Primary CTA - Reserve Table */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href={`/${locale}/reservations`}
                className="inline-flex items-center justify-center px-8 py-4 bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
                aria-label={`${t('cta_secondary')} - Make a table reservation`}
                prefetch={true}
              >
                <span className="mr-2" aria-hidden="true">🍽️</span>
                {t('cta_secondary')}
              </Link>
            </motion.div>

            {/* Secondary CTA - Order Online */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href={`/${locale}/order`}
                className="inline-flex items-center justify-center px-8 py-4 bg-nv-olive hover:bg-nv-olive/90 text-nv-paper font-body font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
                aria-label="Order food online for delivery or pickup"
                prefetch={true}
              >
                <span className="mr-2" aria-hidden="true">🛵</span>
                {locale === 'ku' ? 'ئۆنلاین داوا بکە' : 'Order Online'}
              </Link>
            </motion.div>

            {/* Tertiary CTA - View Menu */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href={`/${locale}/menu`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-nv-sand text-nv-sand hover:bg-nv-sand hover:text-nv-ink font-body font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
                aria-label={`${t('cta_primary')} - View our full menu with prices`}
                prefetch={true}
              >
                <span className="mr-2" aria-hidden="true">📖</span>
                {t('cta_primary')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-12 pt-8 border-t border-nv-sand/30"
            variants={itemVariants}
          >
            <p className="font-body text-nv-sand/80 text-sm md:text-base">
              {locale === 'ku' 
                ? 'لە دڵی گوند، چێژی خواردنی ڕەسەنی کوردی وەربگرە'
                : 'In the heart of the village, experience authentic Kurdish cuisine'
              }
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-nv-sand rounded-full flex justify-center"
          animate={{ 
            borderColor: ['rgba(232, 216, 181, 0.5)', 'rgba(232, 216, 181, 1)', 'rgba(232, 216, 181, 0.5)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-nv-sand rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Background Pattern Overlay for Mobile */}
      <div className="absolute inset-0 bg-[url('/patterns/pomegranate-border.svg')] opacity-5 pointer-events-none md:hidden" />
    </section>
  );
}
