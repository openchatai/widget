import type { CSSProperties } from "react";
import tc from "tinycolor2";

export const WIDGET_CONTENT_MIN_HEIGHT_PX = 400;
export const WIDGET_CONTENT_MAX_HEIGHT_PX = 600;
export const DEFAULT_STYLES = {
  widgetMinHeight: "min-h-[400px]",
  widgetMaxHeight: "max-h-[600px]",
  widgetHeight: "h-[600px]",
} as const;

interface Colors {
  primary?: string;
}

export const cssVars = (
  { primary = "hsl(0, 0%, 0%)" }: Colors,
  // _: { triggerOffset: string },
) => {
  const _primary = tc(primary).toHsl();
  const primaryForeground = tc(primary).isLight()
    ? "240 10% 3.9%"
    : "0 0% 100%";

  const primitivePrimary = `${_primary.h} ${_primary.s * 100}% ${_primary.l * 100}%`

  return {
    /**
     * Spread the primary color without the `hsl()` call so that we can use tailwind opacity classes on it
     */
    "--opencx-primary": primitivePrimary,
    "--opencx-primary-foreground": primaryForeground,

    "--opencx-background": "0 0% 100%",
    "--opencx-foreground": "240 10% 3.9%",

    "--opencx-accent": "240 4.8% 95.9%",
    "--opencx-accent-foreground": "240 5.9% 10%",

    "--opencx-destructive": "0 84.2% 60.2%",
    "--opencx-destructive-foreground": "0 0% 98%",

    "--opencx-secondary": "240 4.8% 95.9%",
    "--opencx-secondary-foreground": "240 5.9% 10%",

    "--opencx-muted": "240 4.8% 95.9%",
    "--opencx-muted-foreground": "240 3.8% 46.1%",

    "--opencx-input": "240 5.9% 90%",
    "--opencx-border": "240 5.9% 90%",
    "--opencx-ring": "240 5.9% 10%",

    // "--opencx-trigger-offset": _.triggerOffset,
  } as CSSProperties;
};
