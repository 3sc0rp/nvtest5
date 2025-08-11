'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getImagePath, getPatternPath } from '@/lib/assets';
import { heroTextVariants, staggerContainerVariants, prefersReducedMotion } from '@/lib/motion';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
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

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Text */}
        <motion.p
          className="font-body text-nv-sand/90 text-lg md:text-xl mb-4 tracking-wide"
          variants={itemVariants}
        >
          Welcome to Nature Village
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-nv-paper mb-6 leading-tight"
          variants={itemVariants}
        >
          Kurdish flavors from the Zagros
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body text-nv-sand text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Experience authentic Kurdish cuisine in a warm, welcoming atmosphere. Our restaurant brings you the rich flavors and traditions of Kurdish cooking passed down through generations in the heart of the Zagros Mountains.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          variants={itemVariants}
        >
          {/* Primary CTA - Reserve Table */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/reservations"
              className="inline-flex items-center justify-center px-8 py-4 bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              aria-label="Make a table reservation"
              prefetch={true}
            >
              <span className="mr-2" aria-hidden="true">🍽️</span>
              Reserve Table
            </Link>
          </motion.div>

          {/* Secondary CTA - Order Online */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/order"
              className="inline-flex items-center justify-center px-8 py-4 bg-nv-olive hover:bg-nv-olive/90 text-nv-paper font-body font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              aria-label="Order food online for delivery or pickup"
              prefetch={true}
            >
              <span className="mr-2" aria-hidden="true">🛵</span>
              Order Online
            </Link>
          </motion.div>

          {/* Tertiary CTA - View Menu */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-nv-sand text-nv-sand hover:bg-nv-sand hover:text-nv-ink font-body font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              aria-label="View our full menu with prices"
              prefetch={true}
            >
              <span className="mr-2" aria-hidden="true">📖</span>
              View Menu
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="font-body text-nv-sand/80 text-sm mb-2">
            In the heart of the village, experience authentic Kurdish cuisine
          </p>
          <div className="w-6 h-10 border-2 border-nv-sand/60 rounded-full mx-auto relative">
            <motion.div
              className="w-1 h-3 bg-nv-sand/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}