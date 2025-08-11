'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        // Dietary badges
        vegetarian: "bg-green-100 text-green-800 border border-green-200",
        vegan: "bg-emerald-100 text-emerald-800 border border-emerald-200",
        halal: "bg-blue-100 text-blue-800 border border-blue-200",
        
        // Spice level badges
        "spice-0": "bg-gray-100 text-gray-600 border border-gray-200",
        "spice-1": "bg-yellow-100 text-yellow-800 border border-yellow-200",
        "spice-2": "bg-orange-100 text-orange-800 border border-orange-200",
        "spice-3": "bg-red-100 text-red-800 border border-red-200",
        
        // Special badges
        popular: "bg-nv-saffron/10 text-nv-saffron border border-nv-saffron/20",
        "chef-special": "bg-nv-terracotta/10 text-nv-terracotta border border-nv-terracotta/20",
        seasonal: "bg-nv-olive/10 text-nv-olive border border-nv-olive/20",
        featured: "bg-gradient-to-r from-nv-terracotta/10 to-nv-saffron/10 text-nv-ink border border-nv-terracotta/20",
        
        // Category badges
        appetizer: "bg-purple-100 text-purple-800 border border-purple-200",
        main: "bg-indigo-100 text-indigo-800 border border-indigo-200",
        dessert: "bg-pink-100 text-pink-800 border border-pink-200",
        beverage: "bg-cyan-100 text-cyan-800 border border-cyan-200",
        soup: "bg-amber-100 text-amber-800 border border-amber-200",
        salad: "bg-lime-100 text-lime-800 border border-lime-200",
        side: "bg-slate-100 text-slate-800 border border-slate-200",
        
        // Tag badges (neutral)
        tag: "bg-nv-sand/50 text-nv-ink border border-nv-sand",
        
        // Default
        default: "bg-gray-100 text-gray-800 border border-gray-200"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm"
      },
      interactive: {
        true: "hover:scale-105 cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false
    }
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  icon?: string;
  onClick?: () => void;
  className?: string;
  animate?: boolean;
}

export default function Badge({ 
  children, 
  icon, 
  variant, 
  size, 
  interactive, 
  onClick, 
  className = "",
  animate = true,
  ...props 
}: BadgeProps) {
  const Component = onClick ? motion.button : motion.span;
  
  return (
    <Component
      className={`${badgeVariants({ variant, size, interactive })} ${className}`}
      onClick={onClick}
      whileHover={animate && interactive ? { scale: 1.05 } : undefined}
      whileTap={animate && interactive ? { scale: 0.95 } : undefined}
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={animate ? { duration: 0.2 } : undefined}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Component>
  );
}

// Specialized badge components for common use cases
export function DietaryBadge({ type, children, ...props }: { type: 'vegetarian' | 'vegan' | 'halal' } & Omit<BadgeProps, 'variant' | 'icon'>) {
  const icons = {
    vegetarian: '🌱',
    vegan: '🌿',
    halal: '☪️'
  };

  return (
    <Badge variant={type} icon={icons[type]} {...props}>
      {children}
    </Badge>
  );
}

export function SpiceBadge({ level, children, ...props }: { level: 0 | 1 | 2 | 3 } & Omit<BadgeProps, 'variant' | 'icon'>) {
  const icons = {
    0: '○',
    1: '🌶️',
    2: '🌶️🌶️',
    3: '🌶️🌶️🌶️'
  };

  const variants = {
    0: 'spice-0' as const,
    1: 'spice-1' as const,
    2: 'spice-2' as const,
    3: 'spice-3' as const
  };

  return (
    <Badge variant={variants[level]} icon={icons[level]} {...props}>
      {children}
    </Badge>
  );
}

export function CategoryBadge({ category, children, ...props }: { category: string } & Omit<BadgeProps, 'variant'>) {
  const validCategories = ['appetizer', 'main', 'dessert', 'beverage', 'soup', 'salad', 'side'];
  const variant = validCategories.includes(category) ? (category as 'appetizer' | 'main' | 'dessert' | 'beverage' | 'soup' | 'salad' | 'side') : 'tag';
  
  return (
    <Badge variant={variant} {...props}>
      {children}
    </Badge>
  );
}

export function TagBadge({ tag, children, ...props }: { tag: string } & Omit<BadgeProps, 'variant'>) {
  // Special handling for important tags
  const specialTags = {
    'popular': 'popular',
    'chef-special': 'chef-special', 
    'seasonal': 'seasonal',
    'featured': 'featured'
  } as const;

  const variant = specialTags[tag as keyof typeof specialTags] || 'tag';
  
  return (
    <Badge variant={variant} {...props}>
      {children}
    </Badge>
  );
}

export function PopularityBadge({ score, ...props }: { score: number } & Omit<BadgeProps, 'variant' | 'icon' | 'children'>) {
  const getVariantAndIcon = (score: number) => {
    if (score >= 9.0) return { variant: 'popular' as const, icon: '⭐', text: 'Excellent' };
    if (score >= 8.0) return { variant: 'featured' as const, icon: '✨', text: 'Great' };
    if (score >= 7.0) return { variant: 'tag' as const, icon: '👍', text: 'Good' };
    return { variant: 'default' as const, icon: '○', text: 'New' };
  };

  const { variant, icon, text } = getVariantAndIcon(score);

  return (
    <Badge variant={variant} icon={icon} {...props}>
      {text} ({score.toFixed(1)})
    </Badge>
  );
}

export function PriceBadge({ price, currency = '$', ...props }: { price: number; currency?: string } & Omit<BadgeProps, 'variant' | 'children'>) {
  const getVariant = (price: number) => {
    if (price >= 20) return 'chef-special' as const; // Premium
    if (price >= 15) return 'popular' as const; // Mid-range
    return 'tag' as const; // Affordable
  };

  return (
    <Badge variant={getVariant(price)} {...props}>
      {currency}{price.toFixed(2)}
    </Badge>
  );
}
