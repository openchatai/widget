/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./lib/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        max: 9999
      },
      colors: {
        primary: "hsl(var(--opn-primary))",
        foreground: "hsl(var(--opn-foreground))",
        background: "hsl(var(--opn-background))",
        "primary-foreground": "hsl(var(--opn-primary-foreground))",
        accent: "hsl(var(--opn-accent))",
        secondary: "hsl(var(--opn-secondary))",
        dark: "hsl(var(--opn-dark))",
      },
    },
    fontFamily: {
      inter: ["Inter", "Cairo", "sans-serif"],
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ]
};
