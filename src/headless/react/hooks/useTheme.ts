import type { CSSProperties } from 'react';
import type { WidgetConfig } from '../../core';
import { useWidget } from '../WidgetProvider';
import tc from 'tinycolor2';

type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<T[K]>;
};

/**
 * @returns The widget config theme with fallback default value
 */
export function useTheme() {
  const { theme } = useWidget();

  const themeWithFallbacks = {
    primaryColor: theme?.primaryColor || 'hsl(0, 0%, 0%)',
    widgetTrigger: {
      offset: {
        bottom: theme?.widgetTrigger?.offset?.bottom || '20px',
        right: theme?.widgetTrigger?.offset?.right || '20px',
      },
      size: {
        button: theme?.widgetTrigger?.size?.button || '48px',
        icon: theme?.widgetTrigger?.size?.icon || '24px',
      },
    },
    widgetContentContainer: {
      offset: theme?.widgetContentContainer?.offset || 10,
    },
    screens: {
      welcome: {
        width: theme?.screens?.welcome?.width || '375px',
        // By setting minHeight to 1px, a nice animation will play from 1px to the dynamic height of the content of the screen
        minHeight: theme?.screens?.welcome?.minHeight || '1px',
      },
      sessions: {
        width: theme?.screens?.sessions?.width || '450px',
        height: theme?.screens?.sessions?.height || '600px',
      },
      chat: {
        width: theme?.screens?.chat?.width || '525px',
        height: theme?.screens?.chat?.height || '700px',
      },
    },
  } satisfies NonNullable<DeepRequired<WidgetConfig['theme']>>;

  const computed = {
    // Subtract the offset.bottom twice so that it adds a bit of padding to the top
    // Subtract the distance between the trigger and the widget content container
    // Subtract the invisible padding of the trigger (for the wobble effect) (2px + 2px)
    maxHeight: `
    calc(100vh - ${themeWithFallbacks.widgetTrigger.offset.bottom} 
    - ${themeWithFallbacks.widgetTrigger.offset.bottom} 
    - ${themeWithFallbacks.widgetContentContainer.offset}px
    - ${themeWithFallbacks.widgetTrigger.size.button}
    - 4px)
    `,
    // Subtract the offset.right twice so that it adds a bit of padding to the left
    maxWidth: `calc(100vw - ${themeWithFallbacks.widgetTrigger.offset.right} - ${themeWithFallbacks.widgetTrigger.offset.right})`,

    minHeight: `min(${themeWithFallbacks.screens.welcome.minHeight}, ${themeWithFallbacks.screens.sessions.height}, ${themeWithFallbacks.screens.chat.height})`,
    minWidth: `min(${themeWithFallbacks.screens.welcome.width}, ${themeWithFallbacks.screens.sessions.width}, ${themeWithFallbacks.screens.chat.width})`,
  };

  return {
    theme: themeWithFallbacks,
    computed,
    cssVars: cssVars({ primary: themeWithFallbacks.primaryColor }),
  };
}

interface Colors {
  primary: string;
}

function cssVars({ primary }: Colors) {
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
}
