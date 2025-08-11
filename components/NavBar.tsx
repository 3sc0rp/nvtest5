'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-nv-paper/95 backdrop-blur-md shadow-lg border-b border-nv-sand'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 bg-nv-terracotta rounded-full flex items-center justify-center">
                <span className="text-nv-paper font-bold text-lg">N</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-nv-saffron rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold text-nv-ink">
                Nature Village
              </span>
              <span className="font-body text-xs text-nv-olive -mt-1">
                Kurdish Restaurant
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/reservations"
              className="bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              prefetch={true}
            >
              Reserve Table
            </Link>
            <Link
              href="/order"
              className="border-2 border-nv-olive text-nv-olive hover:bg-nv-olive hover:text-nv-paper font-body font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              prefetch={true}
            >
              Order Online
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
            <span
              className={`absolute left-0 top-1 w-6 h-0.5 bg-nv-ink transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 w-6 h-0.5 bg-nv-ink transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-4 w-6 h-0.5 bg-nv-ink transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
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
              
              <div className="pt-4 space-y-3">
                <Link
                  href="/reservations"
                  className="block w-full text-center bg-nv-terracotta text-nv-paper font-body font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  prefetch={true}
                >
                  Reserve Table
                </Link>
                <Link
                  href="/order"
                  className="block w-full text-center border-2 border-nv-olive text-nv-olive font-body font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  prefetch={true}
                >
                  Order Online
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}