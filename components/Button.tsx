import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-body font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-nv-terracotta text-nv-paper hover:bg-nv-terracotta/90 focus:ring-nv-terracotta',
        secondary: 'bg-nv-olive text-nv-paper hover:bg-nv-olive/90 focus:ring-nv-olive',
        ghost: 'border-2 border-nv-olive text-nv-olive hover:bg-nv-olive hover:text-nv-paper focus:ring-nv-olive',
      },
      size: {
        sm: 'text-sm px-3 py-2',
        md: 'text-sm px-4 py-2.5',
        lg: 'text-base px-6 py-3'
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
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
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
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
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">{loadingText}</span>
            <span aria-hidden="true">{loadingText}</span>
          </>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
