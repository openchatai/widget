import type { CSSProperties } from 'react';
import tc from 'tinycolor2';

export const WIDGET_CONTENT_MIN_WIDTH_PX = 400;
export const WIDGET_CONTENT_MAX_WIDTH_PX = 800;

export const WIDGET_CONTENT_MIN_HEIGHT_PX = 500;
export const WIDGET_CONTENT_MAX_HEIGHT_PX = 600;

export const DEFAULT_STYLES = {
  widgetMinWidth:
    'min-w-[400px]' satisfies `min-w-[${typeof WIDGET_CONTENT_MIN_WIDTH_PX}px]`,
  widgetMaxWidth:
    'max-w-[800px]' satisfies `max-w-[${typeof WIDGET_CONTENT_MAX_WIDTH_PX}px]`,
  widgetWidthMin:
    'w-[400px]' satisfies `w-[${typeof WIDGET_CONTENT_MIN_WIDTH_PX}px]`,
  widgetWidthMax:
    'w-[800px]' satisfies `w-[${typeof WIDGET_CONTENT_MAX_WIDTH_PX}px]`,

  widgetMinHeight:
    'min-h-[500px]' satisfies `min-h-[${typeof WIDGET_CONTENT_MIN_HEIGHT_PX}px]`,
  widgetMaxHeight:
    'max-h-[600px]' satisfies `max-h-[${typeof WIDGET_CONTENT_MAX_HEIGHT_PX}px]`,
  widgetHeightMin:
    'h-[500px]' satisfies `h-[${typeof WIDGET_CONTENT_MIN_HEIGHT_PX}px]`,
  widgetHeightMax:
    'h-[600px]' satisfies `h-[${typeof WIDGET_CONTENT_MAX_HEIGHT_PX}px]`,
} as const;

interface Colors {
  primary?: string;
}

export const cssVars = ({ primary = 'hsl(0, 0%, 0%)' }: Colors) => {
  const _primary = tc(primary).toHsl();
  const primaryForeground = tc(primary).isLight()
    ? '240 10% 3.9%'
    : '0 0% 100%';

  /**
   * Spread the primary color without the `hsl()` call so that we can use tailwind opacity classes on it
   */
  const primitivePrimary = `${_primary.h} ${_primary.s * 100}% ${_primary.l * 100}%`;

  return {
    '--opencx-primary': primitivePrimary,
    '--opencx-primary-foreground': primaryForeground,

    '--opencx-background': '0 0% 100%',
    '--opencx-foreground': '240 10% 3.9%',

    '--opencx-accent': '240 4.8% 95.9%',
    '--opencx-accent-foreground': '240 5.9% 10%',

    '--opencx-destructive': '0 84.2% 60.2%',
    '--opencx-destructive-foreground': '0 0% 98%',

    '--opencx-secondary': '240 4.8% 95.9%',
    '--opencx-secondary-foreground': '240 5.9% 10%',

    '--opencx-muted': '240 4.8% 95.9%',
    '--opencx-muted-foreground': '240 3.8% 46.1%',

    '--opencx-input': '240 5.9% 90%',
    '--opencx-border': '240 5.9% 90%',
    '--opencx-ring': '240 5.9% 10%',
  } as CSSProperties;
};
