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
  background?: 'default' | 'surface' | 'texture' | 'featured';
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
  background = 'default',
  size = 'lg'
}: SectionProps) {
  const backgroundClasses = {
    default: '',
    surface: 'bg-surface-elevated',
    texture: 'texture-paper bg-background-warm',
    featured: 'bg-gradient-to-b from-background-warm via-background-DEFAULT to-background-warm'
  };

  const paddingClasses = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-24 lg:py-28',
    xl: 'py-24 md:py-28 lg:py-32'
  };

  const titleSizeClasses = {
    sm: 'text-2xl md:text-3xl lg:text-4xl',
    md: 'text-3xl md:text-4xl lg:text-5xl',
    lg: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    xl: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
  };

  return (
    <section 
      id={id} 
      className={clsx(
        'relative',
        paddingClasses[size],
        backgroundClasses[background],
        className
      )}
    >
      {/* Background Pattern for Featured Sections */}
      {background === 'featured' && (
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full bg-pattern-floral bg-repeat opacity-30"
            style={{ backgroundSize: '200px 200px' }}
          />
        </div>
      )}

      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10', containerClassName)}>
        {/* Section Header */}
        {(title || description) && (
          <motion.div 
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {title && (
              <motion.h2 
                className={clsx(
                  'font-heading font-bold text-text-DEFAULT mb-6 text-balance',
                  titleSizeClasses[size]
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
              >
                {background === 'featured' ? (
                  <span className="relative inline-block">
                    {title}
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </span>
                ) : title}
              </motion.h2>
            )}
            
            {description && (
              <motion.p 
                className={clsx(
                  'font-body text-text-muted mx-auto leading-relaxed',
                  size === 'xl' ? 'text-xl md:text-2xl max-w-5xl' :
                  size === 'lg' ? 'text-lg md:text-xl max-w-4xl' :
                  size === 'md' ? 'text-base md:text-lg max-w-3xl' :
                  'text-sm md:text-base max-w-2xl'
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}
              >
                {description}
              </motion.p>
            )}

            {/* Enhanced Embroidery Divider */}
            {showDivider && (title || description) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <EmbroideryDivider 
                  variant={background === 'featured' ? 'floral' : dividerVariant}
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: title || description ? 0.3 : 0, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {children}
        </motion.div>
      </div>

      {/* Decorative Elements for Featured Sections */}
      {background === 'featured' && (
        <>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </>
      )}
    </section>
  );
}