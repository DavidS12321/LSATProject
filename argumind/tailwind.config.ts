import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f8ff",
          100: "#e6f0ff",
          200: "#c4daff",
          300: "#9ec2ff",
          400: "#6a9cff",
          500: "#3d74ff",
          600: "#2256e6",
          700: "#183d99",
          800: "#122d73",
          900: "#0b1d4d"
        }
      },
      fontFamily: {
        sans: ["Inter", "var(--font-sans)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
