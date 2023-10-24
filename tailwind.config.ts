import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
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
      "play-episode": "url('../public/play-button.svg')",
      google: "url('../public/google.svg')",
      facebook: "url('../public/facebook.svg')",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
