'use client';

import { motion } from 'framer-motion';
// Removed i18n import
// Removed language toggle

interface Testimonial {
  id: string;
  name: {
    en: string;
    ku: string;
  };
  location: {
    en: string;
    ku: string;
  };
  text: {
    en: string;
    ku: string;
  };
  rating: number;
  avatar: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "sarah-j",
    name: {
      en: "Sarah Johnson",
      ku: "سارا جۆنسۆن"
    },
    location: {
      en: "Food Blogger, Seattle",
      ku: "نووسەری خواردن، سیاتڵ"
    },
    text: {
      en: "Nature Village transported me straight to the heart of Kurdistan! The Zagros Mountain Kofta was absolutely divine, and the traditional tea service was an authentic touch I'll never forget.",
      ku: "گوندی سروشت ڕاستەوخۆ منی گەیاندە دڵی کوردستان! کوفتەی چیای زاگرۆس زۆر خۆش بوو، خزمەتگوزاری چایی نەریتیش لامەریکێکی ڕاستەقینە بوو کە هەرگیز لەبیرم ناچێت."
    },
    rating: 5,
    avatar: "👩‍🦳",
    date: "2024-01-15"
  },
  {
    id: "ahmad-k",
    name: {
      en: "Ahmad Karimi",
      ku: "ئەحمەد کەریمی"
    },
    location: {
      en: "Chef, Portland",
      ku: "چێشتچی، پۆرتلاند"
    },
    text: {
      en: "As a fellow chef, I&apos;m incredibly impressed by the authenticity and skill displayed here. Every spice, every technique speaks to generations of Kurdish culinary tradition.",
      ku: "وەک چێشتچییەک، زۆر سەرسام بووم لە ڕاستگۆیی و لێهاتوویی کە لێرە نیشان درا. هەر بۆنخۆشێک، هەر تەکنیکێک قسە لە نەوەکانی نەریتی چێشتی کوردی دەکات."
    },
    rating: 5,
    avatar: "👨‍🍳",
    date: "2024-01-08"
  },
  {
    id: "maria-l",
    name: {
      en: "Maria Lopez",
      ku: "ماریا لۆپیز"
    },
    location: {
      en: "Family Traveler, Vancouver",
      ku: "گەشتیاری خێزانی، ڤانکوڤەر"
    },
    text: {
      en: "We brought our kids here for their first Kurdish dining experience, and the staff made it magical! The dolma was perfect for sharing, and the honey baklava was a hit with everyone.",
      ku: "منداڵەکانمان لەگەڵ خۆمان هێناین بۆ یەکەم ئەزموونی خواردنی کوردی، کارمەندەکانیش زۆر جوان کردیان! دۆڵمەکە تەواو بوو بۆ هاوبەشکردن، باقڵەوای هەنگوینیش لەلای هەموومان زۆر خۆش بوو."
    },
    rating: 5,
    avatar: "👩‍👧‍👦",
    date: "2024-01-20"
  },
  {
    id: "david-w",
    name: {
      en: "David Wilson",
      ku: "دەیڤد ویلسۆن"
    },
    location: {
      en: "Business Executive, San Francisco",
      ku: "بەڕێوەبەری بازرگانی، سان فرانسیسکۆ"
    },
    text: {
      en: "I've dined at Kurdish restaurants around the world, but Nature Village sets the gold standard. The Kurdish Fire Kebab was cooked to perfection, and the ambiance felt like visiting family.",
      ku: "لە چێشتخانەی کوردی لە هەموو جیهان خواردووم، بەڵام گوندی سروشت باشترین ستانداردی هەیە. کەبابی ئاگری کوردی تەواو باش چێشت کرابوو، کەشەکەشی وەک سەردانی خێزان وابوو."
    },
    rating: 5,
    avatar: "👨‍💼",
    date: "2024-01-12"
  },
  {
    id: "fatima-h",
    name: {
      en: "Fatima Hassan",
      ku: "فاتیمە حەسەن"
    },
    location: {
      en: "University Student, Toronto",
      ku: "خوێندکاری زانکۆ، تۆرۆنتۆ"
    },
    text: {
      en: "Being away from home, finding Nature Village was like discovering a piece of Kurdistan in the city. The saffron rice reminded me exactly of my grandmother's cooking!",
      ku: "لە دوور لە ماڵەوە، دۆزینەوەی گوندی سروشت وەک دۆزینەوەی پارچەیەک لە کوردستان لە شارەکە بوو. برنجی زەعفەرانی وای لێکردم یادی چێشتی دایک گەورەم بکەمەوە!"
    },
    rating: 5,
    avatar: "👩‍🎓",
    date: "2024-01-25"
  },
  {
    id: "james-r",
    name: {
      en: "James Rodriguez",
      ku: "جەیمز ڕۆدریگیز"
    },
    location: {
      en: "Food Enthusiast, Denver",
      ku: "حەزخوازی خواردن، دێنڤەر"
    },
    text: {
      en: "The attention to detail in every dish is remarkable. You can taste the quality of ingredients and the passion in every bite. This is how authentic cuisine should be presented.",
      ku: "گرنگیدان بە وردەکاری لە هەر خواردنێکدا سەرنجڕاکێشە. دەتوانیت تامی کوالیتی پێکهاتەکان و ئارەزوو لە هەر گازێکدا بچێژیت. ئەمە ئەو شێوەیە کە دەبێت خواردنی ڕاستەقینە پێشکەش بکرێت."
    },
    rating: 5,
    avatar: "🧔‍♂️",
    date: "2024-01-18"
  }
];

export default function Testimonials() {
  const locale = 'en';
  const isRTL = false;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const getStars = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <section className="py-16 bg-nv-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.h2
            className="font-heading text-3xl md:text-4xl font-bold text-nv-ink mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {locale === 'ku' ? 'قسەی میوانەکانمان' : 'What Our Guests Say'}
          </motion.h2>
          <motion.p
            className="font-body text-lg text-nv-olive max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {locale === 'ku' 
              ? 'چیرۆکی میوانەکانمان کە کولتووری کوردیان تاقی کردووە'
              : 'Stories from guests who have experienced Kurdish culture through our cuisine'
            }
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-nv-saffron/10 to-transparent rounded-bl-full" />
              
              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg">
                  {getStars(testimonial.rating)}
                </div>
                <div className="text-3xl">
                  {testimonial.avatar}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className={`font-body text-nv-ink leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="text-nv-terracotta text-2xl leading-none">&ldquo;</span>
                {testimonial.text[locale as 'en' | 'ku']}
                <span className="text-nv-terracotta text-2xl leading-none">&rdquo;</span>
              </blockquote>

              {/* Author Info */}
              <div className={`border-t border-nv-sand pt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h4 className="font-heading text-lg font-semibold text-nv-ink">
                  {testimonial.name[locale as 'en' | 'ku']}
                </h4>
                <p className="font-body text-sm text-nv-olive">
                  {testimonial.location[locale as 'en' | 'ku']}
                </p>
                <p className="font-body text-xs text-nv-olive/70 mt-1">
                  {new Date(testimonial.date).toLocaleDateString(
                    locale === 'ku' ? 'ckb' : 'en-US',
                    { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }
                  )}
                </p>
              </div>

              {/* Accent Border */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-nv-terracotta via-nv-saffron to-nv-olive" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="font-body text-nv-olive mb-6">
            {locale === 'ku' 
              ? 'شانی خۆتان بکەن بە کۆمەڵگای میوانەکانی دڵخۆشمان'
              : 'Join our community of satisfied guests'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              className="bg-nv-terracotta hover:bg-nv-terracotta/90 text-nv-paper font-body font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">✍️</span>
              {locale === 'ku' ? 'بەهای خۆت بنووسە' : 'Write a Review'}
            </motion.button>
            
            <motion.button
              className="border-2 border-nv-olive text-nv-olive hover:bg-nv-olive hover:text-nv-paper font-body font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">📱</span>
              {locale === 'ku' ? 'لە کۆمەڵایەتی پەیوەندی' : 'Follow Us'}
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-nv-sand"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-nv-terracotta mb-2">500+</div>
            <div className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? 'میوانی دڵخۆش' : 'Happy Guests'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-nv-saffron mb-2">4.9</div>
            <div className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? 'نرخاندن لە ⭐⭐⭐⭐⭐' : 'Average Rating'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-nv-olive mb-2">15+</div>
            <div className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? 'خواردنی تایبەت' : 'Signature Dishes'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-nv-ink mb-2">2024</div>
            <div className="font-body text-sm text-nv-olive">
              {locale === 'ku' ? 'ساڵی کراوەوە' : 'Established'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
