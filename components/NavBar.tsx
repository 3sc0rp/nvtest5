'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageToggle, { useCurrentLocale } from './LanguageToggle';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const brandT = useTranslations('brand');
  const locale = useLocale();
  const { isRTL } = useCurrentLocale();

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/menu`, label: t('menu') },
    { href: `/${locale}/reservations`, label: t('reservations') },
    { href: `/${locale}/order`, label: t('order') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-nv-paper/95 backdrop-blur-md shadow-lg border-b border-nv-sand'
          : 'bg-nv-paper/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="w-10 h-10 bg-nv-terracotta rounded-full flex items-center justify-center">
              <span className="text-nv-paper font-heading font-bold text-lg">NV</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold text-nv-ink">
                {brandT('name')}
              </span>
              <span className="font-body text-xs text-nv-olive -mt-1">
                {brandT('tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-nv-ink hover:text-nv-terracotta transition-colors duration-200 relative group"
                prefetch={true}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nv-terracotta transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button & Language Toggle */}
          <div className={`hidden md:flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <LanguageToggle />
            <Link
              href={`/${locale}/reservations`}
              className="bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              prefetch={true}
            >
              {t('reserve_table')}
            </Link>
            <Link
              href={`/${locale}/order`}
              className="border-2 border-nv-olive text-nv-olive hover:bg-nv-olive hover:text-nv-paper font-body font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              prefetch={true}
            >
              {t('order_online')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative w-6 h-6 focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className={`absolute left-0 w-6 h-0.5 bg-nv-ink transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
              }`}
            />
            <motion.span
              className={`absolute left-0 top-3 w-6 h-0.5 bg-nv-ink transition-opacity duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <motion.span
              className={`absolute left-0 w-6 h-0.5 bg-nv-ink transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden bg-nv-paper/98 backdrop-blur-md border-t border-nv-sand"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block font-body text-lg text-nv-ink hover:text-nv-terracotta transition-colors duration-200 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    role="menuitem"
                    tabIndex={0}
                    prefetch={true}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Language Toggle & CTA Buttons */}
              <div className="pt-4 space-y-3 border-t border-nv-sand">
                <div className="flex justify-center mb-4">
                  <LanguageToggle />
                </div>
                <Link
                  href={`/${locale}/reservations`}
                  className="block w-full bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold px-6 py-3 rounded-lg text-center transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('reserve_table')}
                </Link>
                <Link
                  href={`/${locale}/order`}
                  className="block w-full border-2 border-nv-olive text-nv-olive hover:bg-nv-olive hover:text-nv-paper font-body font-semibold px-6 py-3 rounded-lg text-center transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('order_online')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
