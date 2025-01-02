/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './lib/**/*.{html,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      zIndex: {
        max: 9999
      },
      colors: {
        primary: 'var(--opencx-primary)',

        foreground: 'hsl(var(--opencx-foreground))',
        background: 'hsl(var(--opencx-background))',

        accent: 'hsl(var(--opencx-accent))',
        'accent-foreground': 'hsl(var(--opencx-accent-foreground))',

        secondary: 'hsl(var(--opencx-secondary))',
        'secondary-foreground': 'hsl(var(--opencx-secondary-foreground))',

        destructive: 'hsl(var(--opencx-destructive))',
        'destructive-foreground': 'hsl(var(--opencx-destructive-foreground))',

        input: 'hsl(var(--opencx-input))',
        border: 'hsl(var(--opencx-border))'
      }
    },
    fontFamily: {
      inter: ['Inter', 'Cairo', 'sans-serif']
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};
