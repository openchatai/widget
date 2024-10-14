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
  plugins: [
    require("tailwindcss-animate"),
  ]
};