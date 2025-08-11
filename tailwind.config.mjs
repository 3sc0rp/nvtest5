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
        'nv-terracotta': 'var(--nv-terracotta)',
        'nv-saffron': 'var(--nv-saffron)',
        'nv-olive': 'var(--nv-olive)',
        'nv-night': 'var(--nv-night)',
        'nv-sand': 'var(--nv-sand)',
        'nv-paper': 'var(--nv-paper)',
        'nv-gold': 'var(--nv-gold)',
        
        // Semantic colors
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
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
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'warm': '0 10px 25px -5px rgba(180, 83, 42, 0.1), 0 4px 6px -2px rgba(180, 83, 42, 0.05)',
        'gold': '0 4px 14px 0 rgba(193, 163, 91, 0.3)',
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