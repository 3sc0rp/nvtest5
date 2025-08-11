'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function CultureStrip() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-nv-night">
            From Kurdistan&apos;s Heart to Your Table
          </h3>
          
          <p className="font-body text-lg text-nv-olive leading-relaxed">
            For generations, our family has preserved the authentic flavors of Kurdish cuisine. 
            Each dish tells a story of the Zagros Mountains, where aromatic herbs grow wild 
            and traditional cooking methods have been passed down through the ages.
          </p>
          
          <p className="font-body text-lg text-nv-olive leading-relaxed">
            Our chefs honor these time-tested recipes while creating a warm, modern atmosphere 
            where every guest feels like family. Experience the hospitality and rich flavors 
            that define Kurdish culture.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 gap-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-nv-terracotta/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-nv-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-nv-night">Family Recipes</h4>
              <p className="text-sm text-nv-olive">Passed down for generations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-nv-olive/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-nv-olive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-nv-night">Fire & Flavor</h4>
              <p className="text-sm text-nv-olive">Traditional charcoal grilling</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-nv-saffron/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-nv-saffron" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-nv-night">Halal Certified</h4>
              <p className="text-sm text-nv-olive">100% halal ingredients</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-nv-gold/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-nv-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-nv-night">Made with Love</h4>
              <p className="text-sm text-nv-olive">Kurdish hospitality</p>
            </div>
          </div>
        </div>

        <Button
          as={Link}
          href="/about"
          variant="secondary"
          size="lg"
          className="btn-hover-lift"
        >
          Our Story
        </Button>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative"
      >
        <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="/images/interior-booths.jpg"
            alt="Traditional Kurdish restaurant interior with warm lighting and mosaic details"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          
          {/* Decorative frame effect */}
          <div className="absolute inset-0 border-4 border-nv-gold/20 rounded-2xl" />
          
          {/* Corner patterns */}
          <div className="absolute top-4 left-4 w-16 h-16 opacity-30">
            <div className="w-full h-full bg-pattern-floral bg-contain bg-no-repeat" />
          </div>
          <div className="absolute bottom-4 right-4 w-16 h-16 opacity-30 rotate-180">
            <div className="w-full h-full bg-pattern-floral bg-contain bg-no-repeat" />
          </div>
        </div>

        {/* Floating quote */}
        <motion.div
          className="absolute -bottom-6 -left-6 bg-nv-paper card-elevated p-6 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-3">
            <svg className="w-8 h-8 text-nv-gold/50 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
            </svg>
            <div>
              <p className="text-nv-olive italic text-sm leading-relaxed mb-2">
                &ldquo;Every meal feels like coming home to family.&rdquo;
              </p>
              <p className="text-xs text-nv-olive/70 font-medium">— Sarah M.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
