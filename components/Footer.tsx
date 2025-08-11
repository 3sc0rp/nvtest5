"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { getPatternPath } from '@/lib/assets';
import Button, { buttonVariants } from './Button';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const locale = useLocale();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setTimeout(() => {
      setSubscribeMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsSubscribing(false);
      setTimeout(() => setSubscribeMessage(''), 3000);
    }, 1000);
  };

  const businessHours = [
    { days: 'Monday - Thursday', hours: '11:00 AM - 10:00 PM' },
    { days: 'Friday - Saturday', hours: '11:00 AM - 11:00 PM' },
    { days: 'Sunday', hours: '12:00 PM - 9:00 PM' },
  ];

  const base = `/${locale}`;
  const quickLinks = [
    { href: `${base}/menu`, label: 'Our Menu' },
    { href: `${base}/reservations`, label: 'Make Reservation' },
    { href: `${base}/order`, label: 'Order Online' },
    { href: `${base}/about`, label: 'About Us' },
    { href: `${base}/gallery`, label: 'Gallery' },
    { href: `${base}/contact`, label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com/naturevillage', label: 'Facebook', icon: '📘' },
    { href: 'https://instagram.com/naturevillage', label: 'Instagram', icon: '📷' },
    { href: 'https://twitter.com/naturevillage', label: 'Twitter', icon: '🐦' },
    { href: 'https://yelp.com/biz/nature-village', label: 'Yelp', icon: '🌟' },
  ];

  return (
    <footer className="bg-nv-ink text-nv-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <Image src={getPatternPath('sunRays')} alt="" fill className="object-cover" />
      </div>

      <div className="relative">
        <Image src={getPatternPath('pomegranate')} alt="" width={400} height={80} className="w-full h-6 object-cover opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand + Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-nv-terracotta rounded-full flex items-center justify-center">
                <span className="text-nv-paper font-heading font-bold text-xl">NV</span>
              </div>
              <div>
                <div className="font-heading text-xl font-bold">Nature Village</div>
                <div className="font-body text-sm text-nv-sand -mt-1">Kurdish Restaurant</div>
              </div>
            </div>
            <p className="font-body text-sm text-nv-sand leading-relaxed">
              Experience authentic Kurdish cuisine in a warm, welcoming atmosphere.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span aria-hidden className="text-nv-saffron text-lg">📍</span>
                <div className="font-body text-sm">
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="underline text-nv-sand">
                    123 Kurdish Way, Village City, ST 12345
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden className="text-nv-saffron text-lg">📞</span>
                <a href="tel:+15551234567" className="font-body text-sm text-nv-sand hover:text-nv-saffron">+1 (555) 123‑4567</a>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden className="text-nv-saffron text-lg">✉️</span>
                <a href="mailto:info@naturevillage.com" className="font-body text-sm text-nv-sand hover:text-nv-saffron">info@naturevillage.com</a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-nv-saffron">Business Hours</h3>
            <ul className="space-y-2">
              {businessHours.map((h) => (
                <li key={h.days} className="font-body text-sm">
                  <div className="text-nv-paper font-semibold">{h.days}</div>
                  <div className="text-nv-sand">{h.hours}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Links + Social */}
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold text-nv-saffron">Quick Links</h3>
            <nav className="grid grid-cols-2 lg:grid-cols-1 gap-3" aria-label="Footer links">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="font-body text-sm text-nv-sand hover:text-nv-saffron flex items-center gap-2">
                  <span className="text-nv-terracotta" aria-hidden>→</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            <div>
              <h4 className="font-heading text-sm font-semibold text-nv-saffron mb-3">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                    <span aria-hidden>{s.icon}</span>
                    <span className="sr-only">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-nv-saffron">Stay Updated</h3>
            <p className="font-body text-sm text-nv-sand">Subscribe for offers, events, and menu updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-nv-paper/10 border border-nv-sand/30 rounded-lg font-body text-sm text-nv-paper placeholder-nv-sand/70 focus:outline-none focus:border-nv-saffron focus:ring-1 focus:ring-nv-saffron"
              />
              <Button type="submit" disabled={isSubscribing} fullWidth>
                {isSubscribing ? 'Subscribing…' : 'Subscribe'}
              </Button>
            </form>
            {subscribeMessage && (
              <p className="font-body text-sm text-nv-saffron">{subscribeMessage}</p>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-nv-sand/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-body text-sm text-nv-sand">© {new Date().getFullYear()} Nature Village Restaurant. All rights reserved.</div>
            <div className="flex flex-wrap gap-4">
              <Link href={`${base}/privacy`} className="font-body text-sm text-nv-sand hover:text-nv-saffron">Privacy Policy</Link>
              <Link href={`${base}/terms`} className="font-body text-sm text-nv-sand hover:text-nv-saffron">Terms of Service</Link>
              <Link href={`${base}/accessibility`} className="font-body text-sm text-nv-sand hover:text-nv-saffron">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
