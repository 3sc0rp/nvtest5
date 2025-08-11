/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Cormorant Garamond', 'serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      colors: {
        // Brand Colors
        'nv-terracotta': {
          DEFAULT: 'var(--nv-terracotta)',
          light: 'var(--nv-terracotta-light)',
          dark: 'var(--nv-terracotta-dark)',
        },
        'nv-saffron': {
          DEFAULT: 'var(--nv-saffron)',
          light: 'var(--nv-saffron-light)',
          dark: 'var(--nv-saffron-dark)',
        },
        'nv-olive': {
          DEFAULT: 'var(--nv-olive)',
          light: 'var(--nv-olive-light)',
          dark: 'var(--nv-olive-dark)',
        },
        'nv-night': 'var(--nv-night)',
        'nv-sand': {
          DEFAULT: 'var(--nv-sand)',
          light: 'var(--nv-sand-light)',
        },
        'nv-paper': {
          DEFAULT: 'var(--nv-paper)',
          warm: 'var(--nv-paper-warm)',
        },
        'nv-gold': {
          DEFAULT: 'var(--nv-gold)',
          light: 'var(--nv-gold-light)',
          dark: 'var(--nv-gold-dark)',
        },
        'nv-cream': 'var(--nv-cream)',
        'nv-rust': 'var(--nv-rust)',
        'nv-forest': 'var(--nv-forest)',
        
        // Semantic colors
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          pressed: 'var(--color-primary-pressed)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          pressed: 'var(--color-secondary-pressed)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          pressed: 'var(--color-accent-pressed)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
        divider: 'var(--color-divider)',
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          warm: 'var(--color-background-warm)',
        },
      },
      spacing: {
        'section': 'var(--space-section)',
        'component': 'var(--space-component)',
        'element': 'var(--space-element)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'inner': 'var(--shadow-inner)',
        'glow': 'var(--shadow-glow)',
        'warm': 'var(--shadow-warm)',
        'none': 'none',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '88rem',
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, var(--nv-night) 0%, var(--nv-terracotta) 50%, var(--nv-saffron) 100%)',
        'gradient-golden': 'linear-gradient(135deg, var(--nv-gold), #D4AF37)',
        'pattern-floral': "url('/patterns/floral-corner.svg')",
        'pattern-pomegranate': "url('/patterns/pomegranate-border.svg')",
        'pattern-sun': "url('/patterns/sun-rays.svg')",
      },
      animation: {
        'sun-rays': 'sun-rays 14s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        'warm': '12px',
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-muted)',
            lineHeight: '1.7',
            h1: {
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text)',
              fontWeight: '600',
            },
            h2: {
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text)',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text)',
              fontWeight: '600',
            },
            a: {
              color: 'var(--nv-terracotta)',
              '&:hover': {
                color: 'var(--nv-saffron)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};