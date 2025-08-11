'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import EmbroideryDivider from './EmbroideryDivider';

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  showDivider?: boolean;
  dividerVariant?: 'pomegranate' | 'floral' | 'minimal';
  background?: 'default' | 'surface' | 'texture';
}

export default function Section({ 
  id, 
  title, 
  description, 
  className, 
  containerClassName,
  children, 
  showDivider = true,
  dividerVariant = 'pomegranate',
  background = 'default'
}: SectionProps) {
  const backgroundClasses = {
    default: '',
    surface: 'bg-surface',
    texture: 'texture-paper'
  };

  return (
    <section 
      id={id} 
      className={clsx(
        'relative py-section',
        backgroundClasses[background],
        className
      )}
    >
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        {/* Section Header */}
        {(title || description) && (
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {title && (
              <motion.h2 
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-nv-night mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {title}
              </motion.h2>
            )}
            
            {description && (
              <motion.p 
                className="font-body text-lg text-nv-olive max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {description}
              </motion.p>
            )}

            {/* Embroidery Divider */}
            {showDivider && (title || description) && (
              <EmbroideryDivider 
                variant={dividerVariant}
                className="mt-8"
              />
            )}
          </motion.div>
        )}

        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: title || description ? 0.6 : 0 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}