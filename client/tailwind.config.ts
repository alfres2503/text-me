import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        landscape: 'url("/landscape-bg.jpg")',
      },
      backgroundColor: {
        darkGlass_sm: "rgba(0, 0, 0, 0.25)",
        darkGlass_md: "rgba(0, 0, 0, 0.5)",
        darkGlass_lg: "rgba(0, 0, 0, 0.75)",
        whiteGlass_sm: "rgba(255, 255, 255, 0.1)",
        whiteGlass_md: "rgba(255, 255, 255, 0.5)",
        whiteGlass_lg: "rgba(255, 255, 255, 0.75)",
      },
    },
  },
  plugins: [],
};
export default config;
