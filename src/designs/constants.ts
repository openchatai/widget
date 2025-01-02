import type { CSSProperties } from 'react';
import tc from 'tinycolor2';

interface Colors {
  primary: string;
}

export const cssVars = (colors: Colors, _: { triggerOffset: string }) => {
  const primary = tc(colors.primary).toHsl();
  const primaryForeground = tc(colors.primary).isLight()
    ? '240 10% 3.9%'
    : '0 0% 100%';

  return {
    /**
     * Spread the primary color without the `hsl()` call so that we can use tailwind opacity classes on it
     */
    '--opencx-primary': `${primary.h} ${primary.s}% ${primary.l}%`,
    '--opencx-primary-foreground': primaryForeground,

    '--opencx-background': '0 0% 100%',
    '--opencx-foreground': '240 10% 3.9%',

    '--opencx-accent': '240 4.8% 95.9%',
    '--opencx-accent-foreground': '240 5.9% 10%',

    '--opencx-destructive': '0 84.2% 60.2%',
    '--opencx-destructive-foreground': '0 0% 98%',

    '--opencx-secondary': '240 4.8% 95.9%',
    '--opencx-secondary-foreground': '240 5.9% 10%',

    '--opencx-input': '240 5.9% 90%',
    '--opencx-border': '240 5.9% 90%',
    '--opencx-ring': '240 5.9% 10%',

    '--opencx-trigger-offset': _.triggerOffset
  } as CSSProperties;
};
