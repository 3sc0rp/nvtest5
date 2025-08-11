module.exports = {
  ci: {
    collect: {
      // URLs to audit
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/menu',
        'http://localhost:3000/en/order',
        'http://localhost:3000/en/contact',
        'http://localhost:3000/ku',
      ],
      // Number of runs per URL for more stable results
      numberOfRuns: 3,
      settings: {
        // Throttling settings for mobile
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 150,
          throughputKbps: 1.6 * 1024, // 1.6 Mbps
          cpuSlowdownMultiplier: 4,
        },
        // Chrome flags for CI environment
        chromeFlags: [
          '--headless',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
        // Mobile simulation
        emulatedFormFactor: 'mobile',
        // Skip PWA audits if not needed
        skipAudits: ['uses-http2', 'redirects-http'],
      },
    },
    assert: {
      // Performance thresholds
      assertions: {
        // Core performance metrics
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }], // 1.8s
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // 2.5s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }], // CLS < 0.05
        'total-blocking-time': ['error', { maxNumericValue: 200 }], // 200ms
        'speed-index': ['error', { maxNumericValue: 3000 }], // 3s
        
        // Resource efficiency
        'unused-css-rules': ['warn', { maxLength: 5 }],
        'unused-javascript': ['warn', { maxLength: 5 }],
        'modern-image-formats': ['error', { minScore: 0.8 }],
        'uses-optimized-images': ['error', { minScore: 0.8 }],
        'uses-webp-images': ['error', { minScore: 0.8 }],
        
        // Accessibility requirements
        'color-contrast': ['error', { minScore: 1 }],
        'heading-order': ['error', { minScore: 1 }],
        'html-has-lang': ['error', { minScore: 1 }],
        'image-alt': ['error', { minScore: 1 }],
        'label': ['error', { minScore: 1 }],
        'link-name': ['error', { minScore: 1 }],
        'button-name': ['error', { minScore: 1 }],
        
        // SEO requirements
        'document-title': ['error', { minScore: 1 }],
        'meta-description': ['error', { minScore: 1 }],
        'http-status-code': ['error', { minScore: 1 }],
        'robots-txt': ['warn', { minScore: 0.8 }],
        
        // Best practices
        'uses-https': ['warn', { minScore: 1 }],
        'is-on-https': ['warn', { minScore: 1 }],
        'uses-http2': ['warn', { minScore: 0.8 }],
        'no-document-write': ['error', { minScore: 1 }],
        'external-anchors-use-rel-noopener': ['error', { minScore: 1 }],
      },
      // Preset configurations for different environments
      preset: 'lighthouse:no-pwa', // Skip PWA audits for non-PWA sites
    },
    upload: {
      // Optional: Upload results to Lighthouse CI server
      target: 'temporary-public-storage',
    },
    server: {
      // Start dev server for testing
      command: 'npm run dev',
      url: 'http://localhost:3000',
      timeout: 120000, // 2 minutes
    },
  },
  
  // Desktop configuration (optional)
  desktop: {
    collect: {
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/menu',
        'http://localhost:3000/en/order',
      ],
      numberOfRuns: 2,
      settings: {
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024, // 10 Mbps
          cpuSlowdownMultiplier: 1,
        },
        emulatedFormFactor: 'desktop',
        chromeFlags: [
          '--headless',
          '--no-sandbox',
          '--disable-dev-shm-usage',
        ],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.98 }], // Higher bar for desktop
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        
        // Stricter desktop thresholds
        'first-contentful-paint': ['error', { maxNumericValue: 1200 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05 }],
        'total-blocking-time': ['error', { maxNumericValue: 150 }],
      },
    },
  },
};
