'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Reservations', href: '/reservations' },
  { name: 'Order', href: '/order' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isScrolled
            ? 'backdrop-blur-warm shadow-xl py-2 border-b border-nv-sand/10'
            : 'bg-transparent py-4'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 group relative"
              onClick={closeMobileMenu}
            >
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-nv-gold/20 to-nv-saffron/20 group-hover:from-nv-gold/30 group-hover:to-nv-saffron/30 transition-all duration-300">
                <div 
                  className="w-8 h-8 bg-pattern-sun bg-contain bg-no-repeat bg-center animate-sun-rays"
                  style={{ 
                    filter: 'hue-rotate(25deg) saturate(1.3) brightness(1.1)',
                  }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-nv-gold/10 to-nv-saffron/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </div>
              <div className="flex flex-col">
                <span className={clsx(
                  "font-heading text-xl font-bold transition-all duration-300",
                  isScrolled 
                    ? "text-nv-night group-hover:text-primary" 
                    : "text-nv-paper group-hover:text-nv-gold"
                )}>
                  Nature Village
                </span>
                <span className={clsx(
                  "text-xs tracking-wider uppercase font-medium transition-all duration-300",
                  isScrolled 
                    ? "text-text-muted" 
                    : "text-nv-sand/80"
                )}>
                  Kurdish Cuisine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={clsx(
                      'relative px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 group',
                      pathname === item.href
                        ? isScrolled
                          ? 'text-primary bg-primary/10 shadow-sm'
                          : 'text-nv-gold bg-nv-gold/20 shadow-glow'
                        : isScrolled
                        ? 'text-nv-night hover:text-primary hover:bg-primary/5'
                        : 'text-nv-paper/90 hover:text-nv-gold hover:bg-nv-gold/10'
                    )}
                  >
                    {item.name}
                    
                    {/* Active indicator */}
                    {pathname === item.href && (
                      <motion.div
                        className={clsx(
                          "absolute bottom-0 left-1/2 w-6 h-0.5 rounded-full",
                          isScrolled ? "bg-primary" : "bg-nv-gold"
                        )}
                        layoutId="activeTab"
                        style={{ x: "-50%" }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover indicator */}
                    <div className={clsx(
                      "absolute bottom-0 left-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-6",
                      pathname !== item.href && (isScrolled ? "bg-primary" : "bg-nv-gold"),
                      pathname === item.href && "w-0"
                    )} style={{ transform: "translateX(-50%)" }} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              type="button"
              className={clsx(
                "md:hidden p-3 rounded-xl transition-all duration-300 group",
                isScrolled
                  ? "text-nv-night hover:text-primary hover:bg-primary/10"
                  : "text-nv-paper hover:text-nv-gold hover:bg-nv-gold/20"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-6 h-6">
                <motion.span
                  className={clsx(
                    "absolute block h-0.5 w-6 rounded-full transition-all duration-300",
                    isScrolled ? "bg-nv-night group-hover:bg-primary" : "bg-nv-paper group-hover:bg-nv-gold"
                  )}
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  style={{ top: '4px' }}
                />
                <motion.span
                  className={clsx(
                    "absolute block h-0.5 w-6 rounded-full transition-all duration-300",
                    isScrolled ? "bg-nv-night group-hover:bg-primary" : "bg-nv-paper group-hover:bg-nv-gold"
                  )}
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  style={{ top: '11px' }}
                />
                <motion.span
                  className={clsx(
                    "absolute block h-0.5 w-6 rounded-full transition-all duration-300",
                    isScrolled ? "bg-nv-night group-hover:bg-primary" : "bg-nv-paper group-hover:bg-nv-gold"
                  )}
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  style={{ top: '18px' }}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-nv-night/20 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-20 left-4 right-4 z-40 md:hidden"
            >
              <div className="bg-surface-elevated rounded-3xl shadow-2xl border border-divider p-6 backdrop-blur-xl">
                <nav className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={clsx(
                          'group flex items-center justify-between px-5 py-4 text-base font-semibold rounded-2xl transition-all duration-300',
                          pathname === item.href
                            ? 'text-primary bg-primary/10 shadow-sm border border-primary/20'
                            : 'text-text-DEFAULT hover:text-primary hover:bg-primary/5 active:bg-primary/10'
                        )}
                      >
                        <span>{item.name}</span>
                        {pathname === item.href ? (
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-text-subtle group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-divider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="flex items-center justify-between p-4 bg-nv-gold/10 rounded-2xl">
                    <div>
                      <p className="text-sm font-semibold text-text-DEFAULT">Call for Reservations</p>
                      <a 
                        href="tel:+15551234567" 
                        className="text-lg font-bold text-primary hover:text-primary-hover transition-colors"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                    <div className="p-3 bg-nv-gold/20 rounded-xl">
                      <svg className="w-6 h-6 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}