import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 rounded-xl font-body font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-nv-paper hover:bg-primary-hover active:bg-primary-pressed focus:ring-primary/30 shadow-warm hover:shadow-xl transform hover:-translate-y-0.5',
        secondary: 'bg-secondary text-nv-paper hover:bg-secondary-hover active:bg-secondary-pressed focus:ring-secondary/30 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        accent: 'bg-accent text-nv-paper hover:bg-accent-hover active:bg-accent-pressed focus:ring-accent/30 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-nv-paper focus:ring-primary/30 shadow-sm hover:shadow-md',
        ghost: 'text-primary bg-transparent hover:bg-primary/10 active:bg-primary/20 focus:ring-primary/30',
        soft: 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30 focus:ring-primary/30',
        gold: 'bg-gradient-to-r from-nv-gold to-nv-gold-light text-nv-night hover:from-nv-gold-light hover:to-nv-gold shadow-glow hover:shadow-xl transform hover:-translate-y-0.5',
        danger: 'bg-nv-rust text-nv-paper hover:bg-nv-rust/90 focus:ring-nv-rust/30 shadow-md hover:shadow-lg',
      },
      size: {
        xs: 'text-xs px-2.5 py-1.5 rounded-lg',
        sm: 'text-sm px-3.5 py-2 rounded-lg',
        md: 'text-sm px-5 py-2.5 rounded-xl',
        lg: 'text-base px-6 py-3 rounded-xl',
        xl: 'text-lg px-8 py-4 rounded-2xl',
      },
      fullWidth: {
        true: 'w-full',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false
    }
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'as'>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    as: Component = 'button',
    className, 
    variant, 
    size, 
    fullWidth, 
    leftIcon, 
    rightIcon, 
    children, 
    loading, 
    loadingText = "Loading...",
    disabled,
    'aria-label': ariaLabel,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    return (
      <Component
        ref={ref}
        className={clsx(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={Component === 'button' ? isDisabled : undefined}
        aria-label={ariaLabel || (loading ? loadingText : undefined)}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <svg 
              className="w-4 h-4 animate-spin" 
              fill="none" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle 
                className="opacity-20" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="3"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">{loadingText}</span>
            <span aria-hidden="true" className="animate-pulse">{loadingText}</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:scale-110">
                {leftIcon}
              </span>
            )}
            <span className="relative">
              {children}
            </span>
            {rightIcon && (
              <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:scale-110 group-hover:translate-x-0.5">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export default Button;
