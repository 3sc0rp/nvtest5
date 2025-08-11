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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'backdrop-blur-warm shadow-lg py-3'
            : 'bg-transparent py-4'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <div className="relative">
                <div 
                  className="w-8 h-8 bg-pattern-sun bg-contain bg-no-repeat bg-center animate-sun-rays"
                  style={{ 
                    filter: 'hue-rotate(25deg) saturate(1.2)',
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-nv-night group-hover:text-nv-terracotta transition-colors">
                  Nature Village
                </span>
                <span className="text-xs text-nv-olive tracking-wide uppercase">
                  Kurdish Cuisine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'nav-link px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    pathname === item.href
                      ? 'text-nv-terracotta bg-nv-terracotta/10 active'
                      : 'text-nv-night hover:text-nv-terracotta hover:bg-nv-terracotta/5'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-nv-night hover:text-nv-terracotta hover:bg-nv-terracotta/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
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
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 z-40 md:hidden"
            >
              <div className="bg-nv-paper rounded-2xl shadow-xl border border-nv-sand p-6">
                <nav className="space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={clsx(
                        'block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200',
                        pathname === item.href
                          ? 'text-nv-terracotta bg-nv-terracotta/10 border border-nv-terracotta/20'
                          : 'text-nv-night hover:text-nv-terracotta hover:bg-nv-terracotta/5'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Contact Info */}
                <div className="mt-6 pt-6 border-t border-nv-sand">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-nv-night">Call for Reservations</p>
                    <a 
                      href="tel:+15551234567" 
                      className="text-lg font-bold text-nv-terracotta hover:text-nv-saffron transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>
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