import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#2D4B37", // Deep Forest Green
          light: "#4A6B52",
          dark: "#1A2E21",
        },
        secondary: {
          DEFAULT: "#D97706", // Amber/Mustard
          light: "#F59E0B",
          dark: "#B45309",
        },
        accent: {
          DEFAULT: "#C2410C", // Terracotta
          light: "#EA580C",
          dark: "#9A3412",
        },
        oatmeal: {
          DEFAULT: "#F5F5F0",
          dark: "#E5E5DF",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
