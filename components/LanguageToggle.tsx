'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { locales, localeConfig, type Locale } from '@/i18n/config';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocaleConfig = localeConfig[locale as Locale];
  const otherLocales = locales.filter(l => l !== locale);

  const handleLocaleChange = (newLocale: Locale) => {
    startTransition(() => {
      // Replace the current locale in the pathname with the new one
      const segments = pathname.split('/');
      segments[1] = newLocale;
      const newPath = segments.join('/');
      
      router.replace(newPath);
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
          isPending 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-nv-sand/20 border-nv-sand hover:border-nv-terracotta'
        } ${
          locale === 'ku' ? 'flex-row-reverse space-x-reverse' : ''
        }`}
        aria-label={locale === 'en' ? t('switch_to_kurdish') : t('switch_to_english')}
        data-testid="language-toggle"
      >
        <span className="text-lg">{currentLocaleConfig?.flag}</span>
        <span className="font-body text-sm text-nv-ink font-medium">
          {currentLocaleConfig?.label}
        </span>
        <motion.span
          className="text-nv-olive"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 min-w-[160px] bg-nv-paper border border-nv-sand rounded-lg shadow-lg overflow-hidden z-50 ${
              locale === 'ku' ? 'left-0' : 'right-0'
            }`}
          >
            {otherLocales.map((targetLocale) => {
              const config = localeConfig[targetLocale];
              return (
                <button
                  key={targetLocale}
                  onClick={() => handleLocaleChange(targetLocale)}
                  disabled={isPending}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-nv-sand/30 transition-colors duration-200 ${
                    isPending ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    targetLocale === 'ku' ? 'flex-row-reverse space-x-reverse text-right' : ''
                  }`}
                >
                  <span className="text-lg">{config.flag}</span>
                  <div className="flex-1">
                    <div className="font-body text-sm font-medium text-nv-ink">
                      {config.label}
                    </div>
                    <div className="font-body text-xs text-nv-olive">
                      {targetLocale === 'ku' ? 'بگۆڕە بۆ کوردی' : 'Switch to English'}
                    </div>
                  </div>
                  {isPending && (
                    <div className="w-4 h-4 border-2 border-nv-terracotta border-t-transparent rounded-full animate-spin" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

// Hook for getting current locale information
export function useCurrentLocale() {
  const locale = useLocale();
  return {
    locale: locale as Locale,
    config: localeConfig[locale as Locale],
    isRTL: localeConfig[locale as Locale]?.dir === 'rtl',
  };
}
