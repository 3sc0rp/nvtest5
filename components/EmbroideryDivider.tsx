'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface EmbroideryDividerProps {
  title?: string;
  variant?: 'pomegranate' | 'floral' | 'minimal';
  className?: string;
}

export default function EmbroideryDivider({ 
  title, 
  variant = 'pomegranate',
  className 
}: EmbroideryDividerProps) {
  const getPatternSrc = () => {
    switch (variant) {
      case 'floral':
        return '/patterns/floral-corner.svg';
      case 'minimal':
        return '/patterns/sun-rays.svg';
      default:
        return '/patterns/pomegranate-border.svg';
    }
  };

  return (
    <motion.div 
      className={clsx('flex items-center justify-center gap-4 my-8', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Left Pattern */}
      <motion.div
        className="flex-1 max-w-32"
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Image
          src={getPatternSrc()}
          alt=""
          width={120}
          height={16}
          className="w-full h-4 object-contain opacity-60"
          priority={false}
        />
      </motion.div>

      {/* Title */}
      {title && (
        <motion.div
          className="px-6"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="font-heading text-lg font-medium text-nv-olive tracking-wide uppercase text-center whitespace-nowrap">
            {title}
          </span>
        </motion.div>
      )}

      {/* Right Pattern */}
      <motion.div
        className="flex-1 max-w-32"
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Image
          src={getPatternSrc()}
          alt=""
          width={120}
          height={16}
          className="w-full h-4 object-contain opacity-60 scale-x-[-1]"
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}