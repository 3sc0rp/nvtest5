'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { getPatternPath } from '@/lib/assets';
import { useCurrentLocale } from './LanguageToggle';

interface EmbroideryDividerProps {
  title?: string;
  subtitle?: string;
  showContent?: boolean;
}

export default function EmbroideryDivider({ 
  title, 
  subtitle, 
  showContent = false 
}: EmbroideryDividerProps) {
  const locale = useLocale();
  const { isRTL } = useCurrentLocale();
  // const t = useTranslations('culture'); // Unused for now

  const defaultTitle = locale === 'ku' 
    ? 'کولتووری کوردی لە هەر تامێکدا'
    : 'Kurdish Culture in Every Flavor';
    
  const defaultSubtitle = locale === 'ku'
    ? 'نەریت و کولتووری چیاکانی زاگرۆس لە هەر خواردنێکماندا دەبینرێت'
    : 'The traditions and culture of the Zagros Mountains are reflected in every dish we serve';

  return (
    <section className="relative py-16 bg-gradient-to-r from-nv-terracotta/5 via-nv-saffron/5 to-nv-olive/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Repeating pomegranate pattern */}
          <div className="flex flex-wrap justify-center items-center h-full gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="relative w-16 h-16 md:w-20 md:h-20"
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                whileInView={{ 
                  opacity: 0.6, 
                  scale: 1, 
                  rotate: 360 
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <Image
                  src={getPatternPath('pomegranate')}
                  alt=""
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Border Design */}
      <div className="relative">
        {/* Top Border */}
        <motion.div
          className="w-full h-20 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Image
            src={getPatternPath('pomegranate')}
            alt=""
            width={400}
            height={80}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Content Section (if showContent is true) */}
        {showContent && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className={`font-heading text-3xl md:text-4xl font-bold text-nv-ink mb-6 ${isRTL ? 'text-right' : 'text-left md:text-center'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {title || defaultTitle}
            </motion.h2>

            <motion.p
              className={`font-body text-lg md:text-xl text-nv-olive leading-relaxed mb-8 max-w-2xl mx-auto ${isRTL ? 'text-right' : 'text-left md:text-center'}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {subtitle || defaultSubtitle}
            </motion.p>

            {/* Cultural Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 bg-nv-terracotta rounded-full flex items-center justify-center text-2xl">
                    🏔️
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
                  {locale === 'ku' ? 'چیاکانی زاگرۆس' : 'Zagros Mountains'}
                </h3>
                <p className="font-body text-nv-olive text-sm">
                  {locale === 'ku' 
                    ? 'سەرچاوەی سروشتی بۆنخۆشی و چێشت'
                    : 'Natural source of our aromatic spices and flavors'
                  }
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 bg-nv-saffron rounded-full flex items-center justify-center text-2xl">
                    👵
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
                  {locale === 'ku' ? 'ڕێچکەی نەریتی' : 'Traditional Recipes'}
                </h3>
                <p className="font-body text-nv-olive text-sm">
                  {locale === 'ku'
                    ? 'لە نەوەوە بۆ نەوە هاتووەتە خوارەوە'
                    : 'Passed down through generations of Kurdish families'
                  }
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 bg-nv-olive rounded-full flex items-center justify-center text-2xl">
                    🤝
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">
                  {locale === 'ku' ? 'میوانداری' : 'Hospitality'}
                </h3>
                <p className="font-body text-nv-olive text-sm">
                  {locale === 'ku'
                    ? 'دڵگەرمی و میوانداری لە کولتووری کوردی'
                    : 'Warmth and generosity rooted in Kurdish culture'
                  }
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Bottom Border */}
        <motion.div
          className="w-full h-20 mt-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Image
            src={getPatternPath('pomegranate')}
            alt=""
            width={400}
            height={80}
            className="w-full h-full object-cover object-center scale-y-[-1]" // Flip vertically
          />
        </motion.div>
      </div>

      {/* Corner Floral Elements */}
      <motion.div
        className="absolute top-8 left-8 w-12 h-12 md:w-16 md:h-16 opacity-20"
        initial={{ opacity: 0, rotate: -90 }}
        whileInView={{ opacity: 0.3, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Image
          src={getPatternPath('floralCorner')}
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16 opacity-20"
        initial={{ opacity: 0, rotate: 90 }}
        whileInView={{ opacity: 0.3, rotate: 90 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Image
          src={getPatternPath('floralCorner')}
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 w-12 h-12 md:w-16 md:h-16 opacity-20"
        initial={{ opacity: 0, rotate: -90 }}
        whileInView={{ opacity: 0.3, rotate: -90 }}
        transition={{ duration: 1, delay: 0.7 }}
        viewport={{ once: true }}
      >
        <Image
          src={getPatternPath('floralCorner')}
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 w-12 h-12 md:w-16 md:h-16 opacity-20"
        initial={{ opacity: 0, rotate: 180 }}
        whileInView={{ opacity: 0.3, rotate: 180 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <Image
          src={getPatternPath('floralCorner')}
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
    </section>
  );
}
