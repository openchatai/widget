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
        primary: "var(--opn-primary)",

        foreground: "hsl(var(--opn-foreground))",
        background: "hsl(var(--opn-background))",

        accent: "hsl(var(--opn-accent))",
        "accent-foreground": "hsl(var(--opn-accent-foreground))",

        secondary: "hsl(var(--opn-secondary))",
        "secondary-foreground": "hsl(var(--opn-secondary-foreground))",

        destructive: "hsl(var(--opn-destructive))",
        "destructive-foreground": "hsl(var(--opn-destructive-foreground))",

        "input": "hsl(var(--opn-input))",
        "border": "hsl(var(--opn-border))"
      },
    },
    fontFamily: {
      inter: ["Inter", "Cairo", "sans-serif"],
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ]
};
