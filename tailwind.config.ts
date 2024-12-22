import type {Config} from "tailwindcss";

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

        success: "#14A44D",
        warning: "#E4A11B",
        danger: "#DC4C64",
        info: "#54B4D3",
        processing: "#1F2937"
      },
      animation: {
        fadeIn: "fadeIn .3s ease-in-out both",
        fadeOut: "fadeOut .3s ease-in-out both",
        exit: "exit .3s ease-in-out .3s both",
      },
      keyframes: {
        fadeIn: {
          from: {opacity: "0", filter: "blur(1px)"},
          to: {opacity: "1", filter: "blur(0)"}
        },
        fadeOut: {
          from: {opacity: "1", filter: "blur(0)"},
          to: {opacity: "0", filter: "blur(1px)"}
        },
        exit: {
          from: {"grid-template-rows": "1fr"},
          to: {"grid-template-rows": "0fr"},
        }
      }
    },
  },
  plugins: [],
};
export default config;
