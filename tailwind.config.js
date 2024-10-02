/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./lib/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      base: "calc(var(--widget-size-scale, 1) * 1rem)",
      sm: "calc(var(--widget-size-scale, 1) * 0.875rem)",
      lg: "calc(var(--widget-size-scale, 1) * 1.25rem)",
      xl: "calc(var(--widget-size-scale, 1) * 1.5rem)",
      "2xl": "calc(var(--widget-size-scale, 1) * 2rem)",
      xs: "calc(var(--widget-size-scale, 1) * 0.75rem)",
    },
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        foreground: "hsl(var(--foreground))",
        background: "hsl(var(--background))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        secondary: "hsl(var(--secondary))",
        dark: "hsl(var(--dark))",
      },
    },
    fontFamily: {
      inter: ["Inter", "Cairo", "sans-serif"],
    },
  },
};