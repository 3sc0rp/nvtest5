'use client';

import { motion } from 'framer-motion';
import { staggerContainerVariants, heroTextVariants } from '@/lib/motion';
import Image from 'next/image';
import { getImagePath } from '@/lib/assets';

// Home Page Cultural Blurbs
export function HomeCulturalBlurbs() {
  const features = [
    {
      icon: '🍲',
      title: 'Authentic Flavors',
      description: 'Traditional recipes passed down through generations, prepared with love and respect for Kurdish culinary heritage.',
    },
    {
      icon: '🤝',
      title: 'Warm Hospitality',
      description: 'Experience the legendary Kurdish hospitality where every guest is treated as family in our welcoming atmosphere.',
    },
    {
      icon: '🎶',
      title: 'Cultural Experience',
      description: 'Immerse yourself in Kurdish culture through our decor, music, and dining traditions that tell the story of our people.',
    },
    {
      icon: '🌿',
      title: 'Fresh Ingredients',
      description: 'We use only the finest halal-certified ingredients, traditional spices, and fresh local produce for every dish.',
    },
  ];

  return (
    <section className="bg-nv-paper py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h2
          className="font-heading text-4xl md:text-5xl font-bold text-nv-ink mb-4"
          variants={heroTextVariants}
        >
          Welcome to Nature Village
        </motion.h2>
        <motion.p
          className="font-body text-nv-olive text-lg max-w-3xl mx-auto mb-12"
          variants={heroTextVariants}
        >
          Experience the warmth of Kurdish hospitality in the heart of the city. Our restaurant brings you authentic flavors from the Zagros Mountains, where every meal is a celebration of culture, family, and tradition.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          variants={staggerContainerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center"
              variants={heroTextVariants}
            >
              <span className="text-5xl mb-4" aria-hidden="true">{feature.icon}</span>
              <h3 className="font-heading text-xl font-semibold text-nv-ink mb-2">{feature.title}</h3>
              <p className="font-body text-nv-olive text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Page Cultural Content
export function AboutCulturalContent() {
  const sections = [
    {
      title: 'Kurdish Heritage',
      text: 'Nature Village was born from a deep love for Kurdish cuisine and culture. Our founders, originally from the fertile valleys of the Zagros Mountains, brought centuries-old family recipes and cooking traditions to create an authentic dining experience that honors our heritage while embracing modern culinary techniques.',
      image: 'heroMountains',
      alt: 'Interior of Nature Village restaurant with traditional booths'
    },
    {
      title: 'Time-Honored Traditions',
      text: 'Every dish at Nature Village tells a story of Kurdish hospitality, where guests are treated as family. We use traditional clay ovens, hand-selected spices from Kurdistan\'s highlands, and cooking methods passed down through generations. Our chefs trained in the kitchens of Erbil and Sulaymaniyah, bringing authentic flavors to every plate.',
      image: 'portraitKurdishWoman',
      alt: 'Portrait of a Kurdish woman in traditional attire'
    },
    {
      title: 'Fresh, Local Ingredients',
      text: 'We source the finest ingredients, combining traditional Kurdish elements with fresh, local produce. Our spice blends are crafted in-house, our bread is baked daily in traditional tandoor ovens, and our meat is halal-certified from trusted suppliers who share our commitment to quality.',
      image: 'heroMountains',
      alt: 'Zagros Mountains landscape'
    },
    {
      title: 'Building Community',
      text: 'More than just a restaurant, Nature Village is a gathering place where Kurdish culture comes alive. We host cultural events, celebrate traditional holidays, and provide a home away from home for our Kurdish community while welcoming all guests to experience our rich heritage.',
      image: 'heroMountains',
      alt: 'Community gathering at Nature Village restaurant'
    },
  ];

  return (
    <section className="bg-nv-paper py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink text-center mb-4">
          Our Story
        </h1>
        <p className="font-body text-nv-olive text-lg max-w-3xl mx-auto text-center mb-12">
          From the Zagros Mountains to Your Table
        </p>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:grid-flow-col-dense md:flex-row-reverse' : ''
              }`}
            >
              <div className={`relative w-full aspect-video md:aspect-square rounded-xl overflow-hidden shadow-lg`}>
                <Image
                  src={getImagePath(section.image as 'heroMountains' | 'interiorBooths' | 'portraitKurdishWoman')}
                  alt={section.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="space-y-4 text-left">
                <h2 className="font-heading text-3xl font-bold text-nv-ink">{section.title}</h2>
                <p className="font-body text-nv-olive">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CulturalBlurbs() {
  return (
    <>
      <HomeCulturalBlurbs />
    </>
  );
}