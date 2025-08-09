import { useEffect, useState } from 'react';
import type { StringOrLiteral } from '@opencx/widget-core';

const useDocumentDir = () => {
  const [dir, setDir] = useState<StringOrLiteral<'ltr' | 'rtl'>>('ltr');

  useEffect(() => {
    const updateDir = () => {
      if (typeof document === 'undefined') return;
      setDir(window.getComputedStyle(document.body).direction);
    };

    // Set initial direction
    updateDir();

    // Watch for direction changes on both document and documentElement
    const observer = new MutationObserver(updateDir);

    // Observe both document and documentElement
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['dir'],
    });

    // Add event listener for dynamic changes
    window.addEventListener('languagechange', updateDir);

    return () => {
      observer.disconnect();
      window.removeEventListener('languagechange', updateDir);
    };
  }, []);

  return dir;
};

export { useDocumentDir };
