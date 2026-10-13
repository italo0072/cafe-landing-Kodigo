import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        husk: "#EFE7DA",
        parchment: "#F7F2E9",
        roast: {
          900: "#2B1B12",
          700: "#4A2E1D",
          500: "#7A4B2C",
        },
        cherry: "#A8402F",
        moss: "#5C6B4F",
        gold: "#B8823D",
        cream: "#FBF8F2",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
