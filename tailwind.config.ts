import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0c0b",
        surface: "#131312",
        "surface-elevated": "#1a1918",
        "text-primary": "#ede9e0",
        "text-secondary": "#7a7670",
        accent: "#b8a898",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ['"Cabinet Grotesk"', "Satoshi", "sans-serif"],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
