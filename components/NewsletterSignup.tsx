'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { useCurrentLocale } from './LanguageToggle';

// Zod schema for form validation
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  preferences: z.array(z.string()),
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, 'You must agree to the terms'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export default function NewsletterSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const locale = useLocale();
  const { isRTL } = useCurrentLocale();
  // const t = useTranslations('newsletter'); // Unused for now

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: 'onChange',
    defaultValues: {
      preferences: [],
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Newsletter signup data:', data);
      
      setIsSuccess(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
      
    } catch (error) {
      console.error('Newsletter signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const preferenceOptions = [
    {
      id: 'new-dishes',
      label: locale === 'ku' ? 'خواردنە نوێیەکان' : 'New Dishes',
      icon: '🍽️'
    },
    {
      id: 'events',
      label: locale === 'ku' ? 'بۆنە تایبەتەکان' : 'Special Events',
      icon: '🎉'
    },
    {
      id: 'promotions',
      label: locale === 'ku' ? 'داشکاندنەکان' : 'Promotions',
      icon: '🎊'
    },
    {
      id: 'cooking-tips',
      label: locale === 'ku' ? 'ڕاوێژی چێشت' : 'Cooking Tips',
      icon: '👨‍🍳'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-nv-sand/20 to-nv-paper relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/floral-corner.svg')] bg-repeat" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            // Success State
            <motion.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-nv-ink mb-4">
                {locale === 'ku' ? 'سوپاس!' : 'Thank You!'}
              </h2>
              <p className="font-body text-lg text-nv-olive mb-6">
                {locale === 'ku' 
                  ? 'بە سەرکەوتوویی ئابونەی نووسراوەکانمان بوویت. زۆر بە زووی یەکەم نووسراوەکەت وەردەگریت!'
                  : 'You\'ve successfully subscribed to our newsletter. You\'ll receive your first update soon!'
                }
              </p>
              <motion.button
                onClick={() => setIsSuccess(false)}
                className="bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {locale === 'ku' ? 'گەڕانەوە' : 'Subscribe Another'}
              </motion.button>
            </motion.div>
          ) : (
            // Form State
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className={`text-center mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <motion.h2
                  className="font-heading text-3xl md:text-4xl font-bold text-nv-ink mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {locale === 'ku' ? 'لەگەڵمان بمێنەرەوە' : 'Stay Connected'}
                </motion.h2>
                <motion.p
                  className="font-body text-lg text-nv-olive max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {locale === 'ku' 
                    ? 'یەکەم کەس بە کە کە زانیاری لەسەر خواردنە نوێیەکان، بۆنە تایبەتەکان و کۆمەڵگای گوندی سروشت وەردەگریت'
                    : 'Be the first to know about new dishes, special events, and the latest from our Nature Village community'
                  }
                </motion.p>
              </div>

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Email Field */}
                  <div className="md:col-span-1">
                    <label 
                      htmlFor="email"
                      className={`block font-body text-sm font-semibold text-nv-ink mb-2 ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      {locale === 'ku' ? 'ئیمەیڵ *' : 'Email Address *'}
                    </label>
                    <div className="relative">
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 border-2 rounded-lg font-body transition-colors duration-200 ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-nv-sand focus:border-nv-terracotta'
                        } focus:outline-none focus:ring-0 ${isRTL ? 'text-right' : 'text-left'}`}
                        placeholder={locale === 'ku' ? 'ئیمەیڵەکەت بنووسە' : 'Enter your email'}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-nv-olive">✉️</span>
                      </div>
                    </div>
                    {errors.email && (
                      <motion.p
                        className="mt-1 text-sm text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {locale === 'ku' ? 'ئیمەیڵێکی دروست بنووسە' : errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  {/* First Name Field */}
                  <div className="md:col-span-1">
                    <label 
                      htmlFor="firstName"
                      className={`block font-body text-sm font-semibold text-nv-ink mb-2 ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      {locale === 'ku' ? 'ناوی یەکەم *' : 'First Name *'}
                    </label>
                    <div className="relative">
                      <input
                        {...register('firstName')}
                        type="text"
                        id="firstName"
                        className={`w-full px-4 py-3 border-2 rounded-lg font-body transition-colors duration-200 ${
                          errors.firstName 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-nv-sand focus:border-nv-terracotta'
                        } focus:outline-none focus:ring-0 ${isRTL ? 'text-right' : 'text-left'}`}
                        placeholder={locale === 'ku' ? 'ناوەکەت بنووسە' : 'Enter your name'}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-nv-olive">👤</span>
                      </div>
                    </div>
                    {errors.firstName && (
                      <motion.p
                        className="mt-1 text-sm text-red-600"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {locale === 'ku' ? 'ناو پێویستە' : errors.firstName.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Preferences Toggle */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPreferences(!showPreferences)}
                    className={`flex items-center space-x-2 text-nv-olive hover:text-nv-terracotta transition-colors duration-200 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <span className="font-body text-sm font-semibold">
                      {locale === 'ku' ? 'هەڵبژاردەکانی نووسراوە' : 'Newsletter Preferences'}
                    </span>
                    <motion.span
                      animate={{ rotate: showPreferences ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {showPreferences && (
                      <motion.div
                        className="mt-4 p-4 bg-nv-sand/10 rounded-lg"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className={`font-body text-sm text-nv-olive mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                          {locale === 'ku' ? 'چی دەتەوێت لێمان بزانیت:' : 'What would you like to hear about:'}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {preferenceOptions.map((option) => (
                            <label
                              key={option.id}
                              className={`flex items-center space-x-2 cursor-pointer ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}
                            >
                              <input
                                {...register('preferences')}
                                type="checkbox"
                                value={option.id}
                                className="rounded border-nv-sand text-nv-terracotta focus:ring-nv-terracotta focus:ring-2"
                              />
                              <span className="text-lg">{option.icon}</span>
                              <span className="font-body text-sm text-nv-ink">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Terms Agreement */}
                <div className="mt-6">
                  <label className={`flex items-start space-x-3 cursor-pointer ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <input
                      {...register('agreeToTerms')}
                      type="checkbox"
                      className="mt-1 rounded border-nv-sand text-nv-terracotta focus:ring-nv-terracotta focus:ring-2"
                    />
                    <span className={`font-body text-sm text-nv-olive ${isRTL ? 'text-right' : 'text-left'}`}>
                      {locale === 'ku' 
                        ? 'ڕازی دەبم بە وەرگرتنی نووسراوەکان و مەرجەکانی خزمەتگوزاری'
                        : 'I agree to receive newsletters and accept the terms of service'
                      }
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <motion.p
                      className="mt-1 text-sm text-red-600"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {locale === 'ku' ? 'پێویستە ڕازی بیت' : errors.agreeToTerms.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-8">
                  <motion.button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`w-full py-4 rounded-lg font-body font-semibold text-lg transition-all duration-200 ${
                      isValid && !isSubmitting
                        ? 'bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper shadow-lg hover:shadow-xl'
                        : 'bg-nv-sand text-nv-olive cursor-not-allowed'
                    }`}
                    whileHover={isValid && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-nv-paper border-t-transparent rounded-full animate-spin" />
                        <span>{locale === 'ku' ? 'تۆمارکردن...' : 'Subscribing...'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>📧</span>
                        <span>{locale === 'ku' ? 'ئابونە ببە' : 'Subscribe Now'}</span>
                      </div>
                    )}
                  </motion.button>
                </div>

                {/* Privacy Note */}
                <p className="mt-4 text-center font-body text-xs text-nv-olive">
                  {locale === 'ku' 
                    ? 'زانیارییەکانت پارێزراو دەمێنن. هەرگیز نافرۆشرێن.'
                    : 'Your information is secure and will never be shared.'
                  }
                </p>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits */}
        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl mb-3">🎁</div>
            <h3 className="font-heading text-lg font-semibold text-nv-ink mb-2">
              {locale === 'ku' ? 'دیاری بەخێرهاتن' : 'Welcome Gift'}
            </h3>
            <p className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? '١٠٪ داشکاندن بۆ یەکەم سەردان' : '10% off your first visit'}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-heading text-lg font-semibold text-nv-ink mb-2">
              {locale === 'ku' ? 'بۆنە تایبەتەکان' : 'Exclusive Events'}
            </h3>
            <p className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? 'یەکەم بزانە لە ئەداکاری نهێنی' : 'First to know about secret dinners'}
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">👨‍🍳</div>
            <h3 className="font-heading text-lg font-semibold text-nv-ink mb-2">
              {locale === 'ku' ? 'ڕێچکەی چێشت' : 'Recipe Secrets'}
            </h3>
            <p className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? 'فێربوونی چێشتی کوردی لە ماڵەوە' : 'Learn Kurdish cooking at home'}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
