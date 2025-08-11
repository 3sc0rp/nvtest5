'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PerformanceOptimizerProps {
  criticalRoutes?: string[];
}

export default function PerformanceOptimizer({ 
  criticalRoutes = ['/menu', '/order', '/reservations'] 
}: PerformanceOptimizerProps) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch critical routes on idle
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        criticalRoutes.forEach(route => {
          router.prefetch(route);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        criticalRoutes.forEach(route => {
          router.prefetch(route);
        });
      }, 1000);
    }

    // Preload critical images on hover intent
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && criticalRoutes.some(route => link.href.includes(route))) {
        router.prefetch(link.href);
      }
    };

    // Add hover preloading
    document.addEventListener('mouseenter', handleMouseEnter, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
    };
  }, [router, criticalRoutes]);

  // Preconnect to critical third-party domains
  useEffect(() => {
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical resources
    const criticalResources = [
      { href: '/images/hero-mountains.jpg', as: 'image' },
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }, []);

  return null;
}

// Hook for intersection observer based lazy loading
export function useLazyLoad(threshold = 0.1) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            
            // Trigger lazy loading for data-src images
            const img = target.querySelector('img[data-src]') as HTMLImageElement;
            if (img && img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }

            // Load background images
            if (target.dataset.bg) {
              target.style.backgroundImage = `url(${target.dataset.bg})`;
              target.removeAttribute('data-bg');
            }

            observer.unobserve(target);
          }
        });
      },
      { threshold, rootMargin: '50px' }
    );

    // Observe all elements with lazy loading attributes
    const lazyElements = document.querySelectorAll('[data-src], [data-bg]');
    lazyElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}

// Component for optimized loading states
export function LoadingPlaceholder({ 
  aspectRatio = '16/9', 
  className = '' 
}: { 
  aspectRatio?: string; 
  className?: string; 
}) {
  return (
    <div 
      className={`bg-nv-sand/20 animate-pulse ${className}`}
      style={{ aspectRatio }}
    >
      <div className="w-full h-full bg-gradient-to-r from-nv-sand/10 via-nv-sand/20 to-nv-sand/10" />
    </div>
  );
}
