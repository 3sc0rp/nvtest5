'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './Button';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollY, [0, 800], [0, 200]);
  const contentY = useTransform(scrollY, [0, 800], [0, 100]);

  useEffect(() => {
    // Preload hero image
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.onload = () => setIsLoaded(true);
      img.src = '/images/hero-mountains.jpg';
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="/images/hero-mountains.jpg"
          alt="Zagros Mountains landscape"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-overlay" />
      </motion.div>

      {/* Animated Sun Rays */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 opacity-30"
        style={{ y: contentY }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div 
          className="w-full h-full bg-pattern-sun bg-contain bg-no-repeat bg-center animate-sun-rays"
          style={{ 
            filter: 'brightness(2) contrast(1.5) hue-rotate(25deg)',
          }}
        />
      </motion.div>

      {/* Floral Corner Decorations */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 opacity-20"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 0.2, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div 
          className="w-full h-full bg-pattern-floral bg-contain bg-no-repeat"
          style={{ 
            filter: 'brightness(1.5) contrast(1.2)',
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 opacity-20"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 0.2, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ transform: 'rotate(180deg)' }}
      >
        <div 
          className="w-full h-full bg-pattern-floral bg-contain bg-no-repeat"
          style={{ 
            filter: 'brightness(1.5) contrast(1.2)',
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Main Heading */}
        <motion.h1 
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-nv-paper mb-6 text-balance leading-tight tracking-tight"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block">Kurdish flavors</span>
          <span className="block">from the{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-nv-gold via-nv-saffron to-nv-gold bg-clip-text text-transparent font-extrabold">
                Zagros
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-nv-gold to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          className="font-body text-lg sm:text-xl lg:text-2xl text-nv-sand/95 mb-10 max-w-4xl mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block sm:inline">Fire-grilled meats, village breads,</span>{' '}
          <span className="block sm:inline font-semibold text-nv-sand">and family recipes passed down for generations.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <Button
              as={Link}
              href="/reservations"
              variant="gold"
              size="xl"
              className="font-bold text-lg shadow-2xl"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Reserve a Table
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Button
              as={Link}
              href="/order"
              variant="outline"
              size="lg"
              className="border-nv-paper text-nv-paper hover:bg-nv-paper hover:text-nv-night font-semibold"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
            >
              Order Delivery
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <Button
              as={Link}
              href="/menu"
              variant="ghost"
              size="lg"
              className="text-nv-sand hover:text-nv-night hover:bg-nv-sand/90 font-semibold backdrop-blur-sm"
              rightIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            >
              View Menu
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Info Strip */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 text-nv-sand/90 bg-nv-night/20 backdrop-blur-sm rounded-2xl p-6 border border-nv-sand/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.div 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-nv-gold/20 rounded-lg group-hover:bg-nv-gold/30 transition-colors">
              <svg className="w-5 h-5 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-nv-paper">Open Daily</p>
              <p className="text-xs text-nv-sand/80">11am - 10pm</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-nv-gold/20 rounded-lg group-hover:bg-nv-gold/30 transition-colors">
              <svg className="w-5 h-5 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <a 
                href="tel:+15551234567" 
                className="text-sm font-semibold text-nv-paper hover:text-nv-gold transition-colors block"
              >
                (555) 123-4567
              </a>
              <p className="text-xs text-nv-sand/80">Call for reservations</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-nv-gold/20 rounded-lg group-hover:bg-nv-gold/30 transition-colors">
              <svg className="w-5 h-5 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-nv-paper">Location</p>
              <p className="text-xs text-nv-sand/80">Downtown Village District</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-nv-paper/50 rounded-full flex justify-center"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-1 h-3 bg-nv-paper/70 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}