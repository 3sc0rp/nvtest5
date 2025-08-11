import { Variants } from 'framer-motion';

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Motion variants that respect reduced motion preference
export const fadeInVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.6,
      ease: 'easeOut'
    }
  }
};

export const slideUpVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 30
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.5,
      ease: 'easeOut'
    }
  }
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1
    }
  }
};

export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.95
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.4,
      ease: 'easeOut'
    }
  }
};

// Hover animations that respect reduced motion
export const hoverScale = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.2,
    ease: 'easeInOut'
  }
};

export const tapScale = {
  scale: prefersReducedMotion() ? 1 : 0.95,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.1,
    ease: 'easeInOut'
  }
};

// Utility function to create accessible motion props
export const accessibleMotion = (variants?: Variants) => ({
  initial: "hidden",
  animate: "visible",
  variants: variants || fadeInVariants,
  ...(prefersReducedMotion() && {
    initial: false,
    animate: false,
    transition: { duration: 0 }
  })
});

// Hero text reveal animation
export const heroTextVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 50
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.8,
      ease: 'easeOut',
      delay: prefersReducedMotion() ? 0 : 0.2
    }
  }
};

// Card hover animations
export const cardHoverVariants = {
  hover: {
    y: prefersReducedMotion() ? 0 : -8,
    scale: prefersReducedMotion() ? 1 : 1.02,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.3,
      ease: 'easeOut'
    }
  }
};
