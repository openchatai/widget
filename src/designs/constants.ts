import type { CSSProperties } from "react";
import tc from "tinycolor2";

interface Colors {
    primary: string;
}

export const cssVars = (colors: Colors, _: { triggerOffset: string }) => {
    const primary = tc(colors.primary).toHslString();
    return {
        "--opn-primary": primary,

        "--opn-background": "0 0% 100%",
        "--opn-foreground": "210 40% 98%",

        "--opn-accent": "210 40% 96.1%",
        "--opn-accent-foreground": "222.2 47.4% 11.2%",
        
        "--opn-destructive": "0 84.2% 60.2%",
        "--opn-destructive-foreground": "210 40% 98%",
        
        "--opn-secondary": "0 0% 96%",
        "--opn-secondary-foreground": "222.2 47.4% 11.2%",
        
        "--opn-input": "214.3 31.8% 91.4%",
        "--opn-border": "214.3 31.8% 91.4%",

        "--opn-trigger-offset": _.triggerOffset,
    } as CSSProperties;
};
