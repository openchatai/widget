import type { CSSProperties } from 'react';
import tc from 'tinycolor2';
import type { WidgetConfig } from '../../../headless/core';
import { useConfig } from '../../../headless/react';
import { WOBBLE_MAX_MOVEMENT_PIXELS } from '../components/lib/wobble';
import { useIsSmallScreen } from './useIsSmallScreen';

type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<T[K]>;
};

/**
 * @returns The widget config theme with fallback default value
 */
export function useTheme() {
  const { isSmallScreen } = useIsSmallScreen();
  const { theme } = useConfig();

  const withSmallScreenDefault = (target: 'w' | 'h', v: string) => {
    return isSmallScreen ? `100dv${target}` : v;
  };

  const widgetTrigger = {
    zIndex: theme?.widgetTrigger?.zIndex ?? 10000000,
    offset: {
      bottom: theme?.widgetTrigger?.offset?.bottom ?? 20,
      right: theme?.widgetTrigger?.offset?.right ?? 20,
    },
    size: {
      button: theme?.widgetTrigger?.size?.button ?? 48,
      icon: theme?.widgetTrigger?.size?.icon ?? 24,
    },
  } satisfies NonNullable<DeepRequired<WidgetConfig['theme']>>['widgetTrigger'];

  const themeWithFallbacks = {
    primaryColor: theme?.primaryColor ?? 'hsl(0 0% 9%)',
    widgetTrigger,
    widgetContentContainer: {
      borderRadius: isSmallScreen
        ? '0px'
        : (theme?.widgetContentContainer?.borderRadius ?? '32px'),
      zIndex: theme?.widgetContentContainer?.zIndex ?? widgetTrigger.zIndex + 1,
      offset: {
        side: isSmallScreen
          ? 0
          : widgetTrigger.offset.bottom +
            widgetTrigger.size.button +
            WOBBLE_MAX_MOVEMENT_PIXELS.y * 2 +
            (theme?.widgetContentContainer?.offset?.side ?? 10),
        align: isSmallScreen
          ? 0
          : widgetTrigger.offset.right +
            (theme?.widgetContentContainer?.offset?.align ?? 0),
      },
    },
    screens: {
      welcome: {
        width: withSmallScreenDefault(
          'w',
          theme?.screens?.welcome?.width ?? '375px',
        ),
        // By setting minHeight to 1px, a nice animation will play from 1px to the dynamic height of the content of the screen
        minHeight: withSmallScreenDefault(
          'h',
          theme?.screens?.welcome?.minHeight ?? '200px',
        ),
      },
      sessions: {
        width: withSmallScreenDefault(
          'w',
          theme?.screens?.sessions?.width ?? '450px',
        ),
        height: withSmallScreenDefault(
          'h',
          theme?.screens?.sessions?.height ?? '600px',
        ),
      },
      chat: {
        width: withSmallScreenDefault(
          'w',
          theme?.screens?.chat?.width ?? '525px',
        ),
        height: withSmallScreenDefault(
          'h',
          theme?.screens?.chat?.height ?? '700px',
        ),
      },
    },
  } satisfies NonNullable<DeepRequired<WidgetConfig['theme']>>;

  const computed = {
    // Subtract the offset.bottom twice so that it adds a bit of padding to the top
    // Subtract the distance between the trigger and the widget content container
    // Subtract the invisible padding of the trigger (for the wobble effect)
    maxHeight: withSmallScreenDefault(
      'h',
      `calc(
        100vh 
        - ${themeWithFallbacks.widgetTrigger.offset.bottom}px
        - ${themeWithFallbacks.widgetContentContainer.offset.side}px
        - ${WOBBLE_MAX_MOVEMENT_PIXELS.y * 2}px
      )`,
    ),
    // Subtract the offset.right twice so that it adds a bit of padding to the left
    maxWidth: withSmallScreenDefault(
      'w',
      `calc(
        100vw 
        - ${themeWithFallbacks.widgetTrigger.offset.right * 2}px
      )`,
    ),

    minHeight: withSmallScreenDefault(
      'h',
      `min(
        ${themeWithFallbacks.screens.welcome.minHeight}, 
        ${themeWithFallbacks.screens.sessions.height}, 
        ${themeWithFallbacks.screens.chat.height}
      )`,
    ),
    minWidth: withSmallScreenDefault(
      'w',
      `min(
        ${themeWithFallbacks.screens.welcome.width}, 
        ${themeWithFallbacks.screens.sessions.width}, 
        ${themeWithFallbacks.screens.chat.width}
      )`,
    ),
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
  const primaryForeground = tc(primary).isLight() ? '0 0% 3.9%' : '0 0% 98%';

  /**
   * Spread the primary color without the `hsl()` call so that we can use tailwind opacity classes on it
   */
  const primitivePrimary = `${_primary.h} ${_primary.s * 100}% ${_primary.l * 100}%`;

  return {
    '--opencx-primary': primitivePrimary,
    '--opencx-primary-foreground': primaryForeground,

    '--opencx-background': '0 0% 96.1%',
    '--opencx-foreground': '0 0% 3.9%',

    '--opencx-destructive': '0 72.2% 50.6%',
    '--opencx-destructive-foreground': '0 0% 98%',

    '--opencx-accent': '0 0% 89.8%',
    '--opencx-accent-foreground': 'var(--opencx-foreground)',

    '--opencx-secondary': '0 0% 89.8%',
    '--opencx-secondary-foreground': 'var(--opencx-foreground)',

    '--opencx-muted': '0 0% 89.8%',
    '--opencx-muted-foreground': '0 0% 45.1%',

    '--opencx-input': '0 0% 83.1%',
    '--opencx-border': '0 0% 83.1%',
    '--opencx-ring': 'var(--opencx-foreground)',
  } as CSSProperties;
}
