import animate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      zIndex: {
        max: 9999,
      },
      colors: {
        primary: 'hsl(var(--opencx-primary))',
        'primary-foreground': 'hsl(var(--opencx-primary-foreground))',

        foreground: 'hsl(var(--opencx-foreground))',
        background: 'hsl(var(--opencx-background))',

        accent: 'hsl(var(--opencx-accent))',
        'accent-foreground': 'hsl(var(--opencx-accent-foreground))',

        secondary: 'hsl(var(--opencx-secondary))',
        'secondary-foreground': 'hsl(var(--opencx-secondary-foreground))',

        muted: 'hsl(var(--opencx-muted))',
        'muted-foreground': 'hsl(var(--opencx-muted-foreground))',

        destructive: 'hsl(var(--opencx-destructive))',
        'destructive-foreground': 'hsl(var(--opencx-destructive-foreground))',

        input: 'hsl(var(--opencx-input))',
        border: 'hsl(var(--opencx-border))',
        ring: 'hsl(var(--opencx-ring))',
      },
    },
    fontFamily: {
      inter: ['Inter', 'Rubik', 'serif', 'sans-serif'],
    },
  },
  plugins: [animate, typography],
};
