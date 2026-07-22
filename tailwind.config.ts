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
        surface: "#F8F9FB",
        primary: {
          DEFAULT: "#1E293B",
          600: "#334155",
        },
        secondary: {
          DEFAULT: "#F97316",
          600: "#EA580C",
        },
        tertiary: {
          DEFAULT: "#35280C",
        },
        neutral: {
          DEFAULT: "#64748B",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
