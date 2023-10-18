import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pallete-1": "#cbccce",
        "pallete-2": "#8c9cca",
        "pallete-3": "#8390cc",
        "pallete-4": "#223893",
        "pallete-5": "#0c143b",
      },
    },
    backgroundImage: {
      'play-episode': "url('../public/play-button.svg')",
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
