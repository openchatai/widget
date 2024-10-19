import { createGlobalStyle } from "styled-components";
import { createSpacing } from "./spacing";
import { modernNormalize } from "./modern-normalize";

export const widgetTheme = {
    colors: {
        background: 'hsl(0, 100%, 100%)', // Main background color for the app or sections
        primary: 'hsl(217, 91%, 60%)',   // Primary buttons, links, or highlights
        foreground: 'hsl(210, 40%, 98%)', // Text color for primary content
        secondary: 'hsl(222, 9%, 37%)',  // Secondary text, borders, or less important elements
        destructive: 'hsl(0, 63%, 31%)',  // Error messages, warnings, or delete buttons
        border: 'hsl(240,9.8%,90%)',      // Border color for cards, inputs, or dividers
        transparent: 'transparent',
        popoverForeground: 'hsl(222.2, 84%, 4.9%)', // Text color for popovers, modals, or dropdowns
    },
    radii: {
        sm: '0.125rem',
        md: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
        none: '0px',
    },
    spacing: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    },
    fs: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
    },
    fontFamily: {
        DEFAULT: "Inter, Cairo, system-ui"
    }
} as const;

type ThemeType = typeof widgetTheme;

declare module "styled-components" {
    export interface DefaultTheme extends ThemeType { }
}

export const gapSpacing = createSpacing({
    unit: "px",
    factor: 4,
    divisor: 1
}, "gap")

export const paddingSpacing = createSpacing({
    unit: "px",
    factor: 4,
    divisor: 1
}, "padding");

export const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..700;1,14..32,100..700&display=swap");
    @import url("https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap");
    
    ${modernNormalize}

    a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
    }
`