'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import clsx from 'clsx';
import TestimonialCard from './TestimonialCard';

interface Testimonial {
  id: string;
  text: { en: string; ku: string };
  name: { en: string; ku: string };
  location: { en: string; ku: string };
  rating: number;
  date: string;
  image?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          index={index}
          variant={index === 0 ? 'featured' : 'default'}
        />
      ))}
    </div>
  );
}