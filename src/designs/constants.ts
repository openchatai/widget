import type { CSSProperties } from 'react';
import tc from 'tinycolor2';

interface Colors {
  primary: string;
}

export const cssVars = (colors: Colors, _: { triggerOffset: string }) => {
  const primary = tc(colors.primary).toHslString();
  return {
    '--opencx-primary': primary,

    '--opencx-background': '0 0% 100%',
    '--opencx-foreground': '210 40% 98%',

    '--opencx-accent': '210 40% 96.1%',
    '--opencx-accent-foreground': '222.2 47.4% 11.2%',

    '--opencx-destructive': '0 84.2% 60.2%',
    '--opencx-destructive-foreground': '210 40% 98%',

    '--opencx-secondary': '0 0% 96%',
    '--opencx-secondary-foreground': '222.2 47.4% 11.2%',

    '--opencx-input': '214.3 31.8% 91.4%',
    '--opencx-border': '214.3 31.8% 91.4%',

    '--opencx-trigger-offset': _.triggerOffset
  } as CSSProperties;
};
