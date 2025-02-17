import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "320px", // 모바일
        // md: "768px", // 태블릿
        // lg: "1024px", // 작은 데스크탑
        // xl: "1280px", // 큰 데스크탑
        // "2xl": "1536px", // 초대형 스크린
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        title1: [
          "2.8rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.04em",
          },
        ],
        title2: [
          "2.4rem",
          {
            lineHeight: "1.4",
            letterSpacing: "-0.04em",
          },
        ],
        subtitle1: [
          "2rem",
          {
            lineHeight: "1.4",
            letterSpacing: "-0.04em",
          },
        ],
        subtitle2: [
          "1.8rem",
          {
            lineHeight: "1.4",
            letterSpacing: "-0.04em",
          },
        ],
        body1Normal: [
          "1.6rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.04em",
          },
        ],
        body2Normal: [
          "1.4rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.04em",
          },
        ],
        body2Reading: [
          "1.4rem",
          {
            lineHeight: "1.4",
            letterSpacing: "-0.04em",
          },
        ],
        body3Normal: [
          "1.3rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.04em",
          },
        ],
        body3Reading: [
          "1.3rem",
          {
            lineHeight: "1.4",
            letterSpacing: "-0.04em",
          },
        ],
        label1Normal: [
          "1.2rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.04em",
          },
        ],
        label1Reading: [
          "1.2rem",
          {
            lineHeight: "1.4",
            letterSpacing: "-0.04em",
          },
        ],
        label2: [
          "1.1rem",
          {
            lineHeight: "1",
            letterSpacing: "-0.04em",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
