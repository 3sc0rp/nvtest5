"use client";

import Image from 'next/image';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { getImagePath } from '@/lib/assets';

interface Photo {
  src: string;
  alt: string;
  w: number;
  h: number;
  id: string;
}

const photos: Photo[] = [
  {
    id: 'hero',
    src: getImagePath('heroMountains'),
    alt: 'Majestic Kurdish mountains near the Zagros region',
    w: 1920,
    h: 1080
  },
  {
    id: 'interior',
    src: getImagePath('interiorBooths'),
    alt: 'Cozy Kurdish restaurant interior with booth seating',
    w: 1200,
    h: 800
  },
  {
    id: 'portrait',
    src: getImagePath('portraitKurdishWoman'),
    alt: 'Portrait of a Kurdish woman in traditional attire',
    w: 600,
    h: 800
  }
];

export default function GalleryPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activePhoto = useMemo(() => photos.find((p) => p.id === activeId) || null, [activeId]);

  const close = useCallback(() => setActiveId(null), []);

  // ESC to close, arrow keys to navigate
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!activeId) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const idx = photos.findIndex((p) => p.id === activeId);
        const next = e.key === 'ArrowRight' ? (idx + 1) % photos.length : (idx - 1 + photos.length) % photos.length;
        setActiveId(photos[next].id);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId, close]);

  return (
    <div className="bg-nv-paper">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-nv-ink">Gallery</h1>
        <p className="font-body text-nv-olive mt-2">Scenes from our kitchen, dining room, and homeland.</p>
      </header>

      {/* Masonry grid using CSS columns */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {photos.map((p) => (
            <button
              key={p.id}
              className="relative mb-4 w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-nv-terracotta"
              onClick={() => setActiveId(p.id)}
              aria-label={`Open image: ${p.alt}`}
            >
              <div className="relative w-full" style={{ aspectRatio: `${p.w}/${p.h}` }}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 z-10 bg-white/10 text-white hover:bg-white/20 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={close}
            >
              ESC ×
            </button>
            <div className="relative w-full" style={{ aspectRatio: `${activePhoto.w}/${activePhoto.h}` }}>
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {/* Controls */}
            <div className="mt-3 flex items-center justify-between text-white">
              <button
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => {
                  const idx = photos.findIndex((p) => p.id === activePhoto.id);
                  const prev = (idx - 1 + photos.length) % photos.length;
                  setActiveId(photos[prev].id);
                }}
                aria-label="Previous image"
              >
                ← Prev
              </button>
              <span className="font-body text-sm opacity-80">{activePhoto.alt}</span>
              <button
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => {
                  const idx = photos.findIndex((p) => p.id === activePhoto.id);
                  const next = (idx + 1) % photos.length;
                  setActiveId(photos[next].id);
                }}
                aria-label="Next image"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
