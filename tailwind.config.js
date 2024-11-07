/** @type {import('tailwindcss').Config} */
import resolveConfig from "tailwindcss/resolveConfig";

const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00927F",
          dark: "#005f56",
          light: "#00b2a0",
        },
        secondary: {
          DEFAULT: "#5F6368",
          light: "#B8BABC",
        },
        background: {
          DEFAULT: "#ffffff",
          muted: "#f3f4f6",
        },
        border: {
          DEFAULT: "#e5e7eb",
          active: "#5F6368",
        },
        tag: {
          DEFAULT: "#D1E7FF",
          text: "#1D4ED8",
        },
      },
    },
  },
  plugins: [],
};

const resolvedConfig = resolveConfig(config);
export default config;
export { resolvedConfig };
