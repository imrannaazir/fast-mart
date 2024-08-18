import type { Config } from "tailwindcss";
import { light_colors } from "./src/constants/colors.constant";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: light_colors.background,
        foreground: light_colors.foreground,
        primary: light_colors.primary,
        secondary: light_colors.secondary,
      },
    },
  },
  plugins: [],
};
export default config;
