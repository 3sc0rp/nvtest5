'use client';

import React from 'react';

export default function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = (e.currentTarget.getAttribute('href') || '').replace('#', '');
    if (!hash) return;
    const target = document.getElementById(hash);
    if (target) {
      // Make sure target is focusable then focus
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus();
    }
  };

  return (
    <a href="#main-content" className="skip-link" onClick={handleClick}>
      Skip to main content
    </a>
  );
}


