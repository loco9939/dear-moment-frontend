const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
