# 🍽️ Nature Village - Kurdish Restaurant Website

A modern, culturally-rich restaurant website built with **Next.js 15**, featuring authentic Kurdish content, full internationalization (English/Kurdish RTL), comprehensive SEO, WCAG 2.2 AA accessibility, and performance optimization.

## ✨ Features

- 🌍 **Full Internationalization** - English/Kurdish with RTL support
- ♿ **WCAG 2.2 AA Compliant** - Complete accessibility support
- 🚀 **Performance Optimized** - Lighthouse scores ≥95 mobile
- 🔍 **Rich SEO** - JSON-LD, meta tags, OG images
- 🎨 **Cultural Authenticity** - Kurdish heritage and traditions
- 🧪 **Comprehensive Testing** - Playwright E2E + Lighthouse CI
- 📱 **Mobile-First Design** - Responsive on all devices
- 🎭 **Accessible Animations** - Respects prefers-reduced-motion

## 🚀 Quick Start (< 5 minutes)

### Prerequisites
- **Node.js 18+** and **npm**
- **Git**

### 1. Clone and Install
```bash
git clone <repository-url>
cd nature-village
npm install
```

### 2. Environment Setup
```bash
# Copy the environment template
cp .env.example .env.local

# Edit with your values (see Environment Variables section)
```

### 3. Start Development
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site!

**🎯 That's it! You're running in under 5 minutes.**

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start dev server with Turbopack |
| **Build** | `npm run build` | Create production build |
| **Start** | `npm run start` | Run production server |
| **Lint** | `npm run lint` | Run ESLint checks |
| **Type Check** | `npm run typecheck` | Run TypeScript checks |
| **Test E2E** | `npm test` | Run Playwright tests |
| **Test UI** | `npm run test:ui` | Playwright tests with UI |
| **Test Report** | `npm run test:report` | View test reports |
| **Lighthouse** | `npm run lh` | Run Lighthouse CI |
| **All Tests** | `npm run test:all` | Run Playwright + Lighthouse |

## 🌍 Environment Variables

Create `.env.local` from `.env.example` and configure these variables:

### Required Variables
```env
# Database (if using)
DATABASE_URL="your_database_connection_string"

# Email Service (for contact forms)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Delivery Platforms (for order page)
DOORDASH_URL="https://doordash.com/your-restaurant"
UBEREATS_URL="https://ubereats.com/your-restaurant"

# Analytics (optional)
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Maps (for location)
GOOGLE_MAPS_API_KEY="your_google_maps_key"

# Newsletter Service (optional)
MAILCHIMP_API_KEY="your_mailchimp_key"
MAILCHIMP_LIST_ID="your_list_id"
```

### Development URLs
```env
# Base URL for production
NEXT_PUBLIC_BASE_URL="https://your-domain.com"

# For local development (auto-detected)
# NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## 🖼️ Image Replacement Guide

Replace placeholder images with your authentic restaurant photos:

### Image Structure
```
public/images/
├── hero-mountains.jpg        # Hero background (1920x1080)
├── dish-*.jpg               # Menu item photos (800x600)
├── restaurant-interior.jpg   # Interior shots (1200x800)
├── chef-portrait.jpg        # Staff photos (600x800)
└── patterns/
    ├── embroidery-*.svg     # Kurdish patterns
    └── sun-rays.svg         # Decorative elements
```

### Image Requirements
- **Hero Images**: 1920x1080px, WebP/AVIF preferred
- **Dish Photos**: 800x600px (4:3 ratio), consistent lighting
- **Interior Shots**: 1200x800px, high quality
- **Staff Photos**: 600x800px (3:4 ratio), professional
- **File Size**: < 1MB per image for optimal performance

### Replacement Steps
1. **Prepare your photos** following the size guidelines
2. **Convert to WebP/AVIF** for better performance:
   ```bash
   # Install sharp-cli globally
   npm install -g sharp-cli
   
   # Convert images
   sharp -i input.jpg -o output.webp -f webp -q 85
   ```
3. **Replace files** in `public/images/` with same filenames
4. **Update alt text** in components for better accessibility
5. **Test responsiveness** across different screen sizes

### Image Components Location
- Menu items: `data/menu.json` → `image` field
- Hero: `components/Hero.tsx`
- Gallery: `components/Gallery.tsx`
- About: `app/[locale]/about/page.tsx`

## 🚦 Internationalization (i18n)

### Language Support
- **English (en)**: Left-to-right, default
- **Kurdish (ku)**: Right-to-left, authentic translations

### Translation Files
- `messages/en.json` - English translations
- `messages/ku.json` - Kurdish translations (240+ strings)

### Adding New Languages
1. Create `messages/[locale].json`
2. Add locale to `i18n/config.ts`:
   ```typescript
   export const locales = ['en', 'ku', 'ar'] as const; // Add 'ar'
   
   export const localeConfig = {
     // ... existing
     ar: {
       label: 'العربية',
       dir: 'rtl' as const,
       flag: '🇸🇦',
     },
   };
   ```
3. Add RTL support in CSS if needed
4. Update navigation components

### Cultural Content
Kurdish translations include:
- **Traditional proverbs** and expressions
- **Regional references** (Zagros Mountains, Erbil, Sulaymaniyah)
- **Authentic culinary terms**
- **Cultural values** and hospitality concepts

## 🧪 Testing

### E2E Testing (Playwright)
```bash
# Run all tests
npm test

# Run specific test
npx playwright test home.spec.ts

# Debug mode
npm run test:headed

# Interactive UI
npm run test:ui
```

### Lighthouse Performance
```bash
# Run Lighthouse CI
npm run lh

# Manual Lighthouse (requires running server)
npm run build && npm start
# In another terminal:
npm run lh
```

### Test Coverage
- ✅ Home page rendering and hero section
- ✅ Menu filtering and search functionality
- ✅ Language toggle (English ↔ Kurdish)
- ✅ Contact form validation
- ✅ Order page with environment variables
- ✅ Accessibility (skip links, keyboard navigation)
- ✅ Performance thresholds (≥95 mobile, CLS <0.05)

## 🌐 SEO & Performance

### SEO Features
- **Per-page metadata** with `generateMetadata`
- **JSON-LD schemas**: LocalBusiness, WebSite, Menu, FAQ
- **Open Graph images** generated with `@vercel/og`
- **Sitemap** auto-generated for all routes
- **Rich snippets** ready for Google

### Performance Optimizations
- **Image optimization**: AVIF/WebP, lazy loading, priority hints
- **Route prefetching**: Critical routes pre-loaded
- **Bundle optimization**: Code splitting, tree shaking
- **Caching**: Static assets, API routes, OG images
- **CLS prevention**: Aspect ratios, size reservations

### Lighthouse Thresholds
- **Performance**: ≥95 (mobile)
- **Accessibility**: ≥95
- **Best Practices**: ≥90
- **SEO**: ≥95
- **CLS**: <0.05

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# vercel.com → Project → Settings → Environment Variables
```

### Other Platforms

#### Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
# Set in Netlify dashboard
```

#### Docker
```dockerfile
# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Environment Variables for Production
1. **Copy all variables** from `.env.example`
2. **Update URLs** to production domains
3. **Set secure values** for API keys and secrets
4. **Enable analytics** with real tracking IDs
5. **Configure email** service for contact forms

### Post-Deployment Checklist
- [ ] Test all pages load correctly
- [ ] Verify language switching works
- [ ] Check contact form submission
- [ ] Test order platform links
- [ ] Validate SEO meta tags
- [ ] Run Lighthouse audit
- [ ] Test mobile responsiveness
- [ ] Verify accessibility features

## 🎨 Customization

### Brand Colors
Update brand colors in `styles/globals.css`:
```css
:root {
  --nv-terracotta: #A04622;  /* Primary brand color */
  --nv-saffron: #C56900;     /* Secondary accent */
  --nv-olive: #4F6329;       /* Text and borders */
  --nv-sand: #E8D8B5;        /* Light backgrounds */
  --nv-ink: #0F1A14;         /* Dark text */
  --nv-paper: #FBF7ED;       /* Page backgrounds */
}
```

### Typography
Fonts are defined in `app/[locale]/layout.tsx`:
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Menu Data
Update menu items in `data/menu.json`:
```json
{
  "items": [
    {
      "id": "kebab-001",
      "name": {
        "en": "Grilled Lamb Kebab",
        "ku": "کەبابی بەرانی برژاو"
      },
      "description": {
        "en": "Tender lamb with traditional spices",
        "ku": "گۆشتی بەران بە بەهاراتی نەریتی"
      },
      "price": 18.99,
      "image": "/images/dishes/lamb-kebab.jpg",
      "category": "main",
      "tags": ["popular", "halal"],
      "spiceLevel": 2,
      "vegetarian": false,
      "vegan": false,
      "halal": true
    }
  ]
}
```

## 🛠️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **Testing**: Playwright + Lighthouse CI
- **Deployment**: Vercel-ready

### Project Structure
```
nature-village/
├── app/[locale]/              # App Router pages
│   ├── page.tsx              # Home page
│   ├── about/                # About page
│   ├── menu/                 # Menu page
│   ├── order/                # Order page
│   ├── contact/              # Contact page
│   └── layout.tsx            # Root layout
├── components/               # React components
├── lib/                      # Utilities and configs
├── messages/                 # Translation files
├── public/                   # Static assets
├── styles/                   # Global styles
├── tests/                    # Playwright tests
└── data/                     # Menu and content data
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Development Guidelines
- Follow **TypeScript** strict mode
- Use **semantic commit messages**
- Maintain **accessibility** standards
- Test **both languages** (English/Kurdish)
- Keep **Lighthouse scores** ≥95

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README first
- **Issues**: GitHub Issues for bug reports
- **Features**: Pull Requests for enhancements
- **Questions**: GitHub Discussions

---

**Built with ❤️ for authentic Kurdish hospitality**

*"میوان خوای ماڵەوەیە"* - *A guest is a blessing from God*