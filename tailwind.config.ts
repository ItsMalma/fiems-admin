import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#266BAC",
        primary2: "#1A4A77",
        primary3: "#17436D",

        primaryActive: "#48A6DC",
        primaryHover: "#A8DFFF",

        solitude: "#E5E7EB",
        solitude2: "#D1D5DB",

        solitudeActive: "#FFF",

        statusActive: "#37E549",
        statusInactive: "#F50D0D",
      },
    },
  },
  plugins: [],
};
export default config;
