'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
// Removed language toggle
import { fadeInVariants, staggerContainerVariants, prefersReducedMotion } from '@/lib/motion';

export default function CulturalBlurbs() {
  const t = useTranslations('home');
  const locale = useLocale();
  const { isRTL } = useCurrentLocale();
  const shouldReduceMotion = prefersReducedMotion();

  const features = [
    {
      title: t('authentic_flavors'),
      description: t('authentic_description'),
      icon: '🍛',
      gradient: 'from-nv-terracotta/10 to-nv-saffron/10',
    },
    {
      title: t('warm_hospitality'),
      description: t('hospitality_description'),
      icon: '🤝',
      gradient: 'from-nv-olive/10 to-nv-terracotta/10',
    },
    {
      title: t('cultural_experience'),
      description: t('cultural_experience_description'),
      icon: '🎭',
      gradient: 'from-nv-saffron/10 to-nv-olive/10',
    },
    {
      title: t('fresh_ingredients'),
      description: t('ingredients_description'),
      icon: '🌿',
      gradient: 'from-nv-olive/10 to-nv-sand/20',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-nv-paper to-nv-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
          {...(shouldReduceMotion ? {} : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.3 },
            variants: fadeInVariants
          })}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-nv-ink mb-4">
            {t('welcome_title')}
          </h2>
          <p className="font-body text-lg text-nv-olive max-w-3xl mx-auto leading-relaxed">
            {t('cultural_introduction')}
          </p>
        </motion.div>

        {/* Cultural Features Grid */}
        <motion.div
          className="mb-16"
          {...(shouldReduceMotion ? {} : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.2 },
            variants: staggerContainerVariants
          })}
        >
          <h3 className={`font-heading text-2xl font-semibold text-nv-ink mb-8 ${isRTL ? 'text-right' : 'text-center'}`}>
            {t('featured_section')}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`bg-gradient-to-br ${feature.gradient} border border-nv-sand/50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300`}
                {...(shouldReduceMotion ? {} : {
                  variants: fadeInVariants,
                  whileHover: { y: -4 },
                  transition: { duration: 0.2 }
                })}
              >
                <div className="text-4xl mb-4" role="img" aria-label={feature.title}>
                  {feature.icon}
                </div>
                <h4 className="font-heading text-lg font-semibold text-nv-ink mb-3">
                  {feature.title}
                </h4>
                <p className="font-body text-sm text-nv-olive leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Kurdish Heritage Quote */}
        <motion.div
          className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-nv-sand shadow-lg ${isRTL ? 'text-right' : 'text-center'}`}
          {...(shouldReduceMotion ? {} : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: 0.3 },
            variants: fadeInVariants
          })}
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="font-heading text-xl md:text-2xl font-medium text-nv-ink mb-4 italic">
              {locale === 'ku' 
                ? '"میوان خوای ماڵەوەیە، میوان بەخت و بەرەکەتە"'
                : '"A guest is a blessing from God, bringing good fortune to the home"'
              }
            </blockquote>
            <cite className="font-body text-nv-olive">
              {locale === 'ku' ? '— پەندی کوردی' : '— Kurdish Proverb'}
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced About page cultural content component
export function AboutCulturalContent() {
  const t = useTranslations('about');
  const locale = useLocale();
  const { isRTL } = useCurrentLocale();
  const shouldReduceMotion = prefersReducedMotion();

  const sections = [
    {
      title: t('heritage_title'),
      content: t('heritage_text'),
      icon: '🏔️',
      image: '/images/kurdish-heritage.jpg'
    },
    {
      title: t('tradition_title'),
      content: t('tradition_text'),
      icon: '👨‍🍳',
      image: '/images/traditional-cooking.jpg'
    },
    {
      title: t('ingredients_title'),
      content: t('ingredients_text'),
      icon: '🌾',
      image: '/images/fresh-ingredients.jpg'
    },
    {
      title: t('community_title'),
      content: t('community_text'),
      icon: '🤝',
      image: '/images/community-gathering.jpg'
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className={`mb-12 ${isRTL ? 'text-right' : 'text-center'}`}
          {...(shouldReduceMotion ? {} : {
            initial: "hidden",
            animate: "visible",
            variants: fadeInVariants
          })}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink mb-4">
            {t('title')}
          </h1>
          <p className="font-heading text-xl text-nv-olive font-medium">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cultural Sections */}
        <motion.div
          className="space-y-16"
          {...(shouldReduceMotion ? {} : {
            initial: "hidden",
            animate: "visible",
            variants: staggerContainerVariants
          })}
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className={`flex flex-col lg:flex-row gap-8 items-center ${
                index % 2 === 1 && !isRTL ? 'lg:flex-row-reverse' : ''
              } ${isRTL ? 'lg:flex-row-reverse' : ''}`}
              {...(shouldReduceMotion ? {} : {
                variants: fadeInVariants
              })}
            >
              {/* Content */}
              <div className="lg:w-1/2">
                <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-3xl" role="img" aria-label={section.title}>
                    {section.icon}
                  </span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-nv-ink">
                    {section.title}
                  </h2>
                </div>
                <p className="font-body text-lg text-nv-olive leading-relaxed">
                  {section.content}
                </p>
              </div>

              {/* Visual Element (placeholder) */}
              <div className="lg:w-1/2">
                <div className="aspect-video bg-gradient-to-br from-nv-sand/30 to-nv-terracotta/20 rounded-xl border border-nv-sand flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4" role="img" aria-label={section.title}>
                      {section.icon}
                    </div>
                    <p className="font-body text-nv-olive">
                      {locale === 'ku' ? 'وێنەی کولتووری' : 'Cultural Image'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cultural Quote Section */}
        <motion.div
          className={`mt-16 bg-gradient-to-r from-nv-terracotta/10 to-nv-saffron/10 rounded-2xl p-8 border border-nv-sand ${isRTL ? 'text-right' : 'text-center'}`}
          {...(shouldReduceMotion ? {} : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            variants: fadeInVariants
          })}
        >
          <blockquote className="font-heading text-xl md:text-2xl font-medium text-nv-ink mb-4 italic">
            {locale === 'ku' 
              ? '"خواردن تەنها بۆ تێربوون نییە، بەڵکوو بۆ کۆبوونەوە و یەکبوونە"'
              : '"Food is not just for sustenance, but for coming together and unity"'
            }
          </blockquote>
          <cite className="font-body text-nv-olive">
            {locale === 'ku' ? '— فەلسەفەی خواردنی کوردی' : '— Kurdish Food Philosophy'}
          </cite>
        </motion.div>
      </div>
    </div>
  );
}
