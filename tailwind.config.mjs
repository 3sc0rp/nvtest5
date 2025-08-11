import { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Nature Village Brand Colors
        'nv-terracotta': 'var(--nv-terracotta)',
        'nv-saffron': 'var(--nv-saffron)',
        'nv-olive': 'var(--nv-olive)',
        'nv-sand': 'var(--nv-sand)',
        'nv-ink': 'var(--nv-ink)',
        'nv-paper': 'var(--nv-paper)',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
