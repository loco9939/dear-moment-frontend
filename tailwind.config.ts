import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '360px', // 모바일
        // md: "768px", // 태블릿
        // lg: "1024px", // 작은 데스크탑
        // xl: "1280px", // 큰 데스크탑
        // "2xl": "1536px", // 초대형 스크린
      },
    },
    extend: {
      colors: {
        normal: '#0C0C0D',
        alternative: '#282929',
        common: {
          0: '#ffffff',
          100: '#000000',
        },
        gray: {
          10: '#F8F9FC',
          20: '#E3E5EB',
          30: '#C3C6CC',
          40: '#ABAFB7',
          50: '#8D8F95',
          60: '#727479',
          70: '#5B5B5C',
          80: '#434344',
          90: '#282929',
          95: '#0C0C0D',
        },
        red: {
          10: '#FFFAFA',
          20: '#FFE3E3',
          30: '#FFA99D',
          40: '#FF7664',
          50: '#FF1F00',
          60: '#CE1A02',
          70: '#971200',
          80: '#710E00',
          90: '#4A0900',
          95: '#380700',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        title1: [
          '2.8rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.04em',
          },
        ],
        title2: [
          '2.4rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.04em',
          },
        ],
        subtitle1: [
          '2rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.04em',
          },
        ],
        subtitle2: [
          '1.8rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.04em',
          },
        ],
        body1Normal: [
          '1.6rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.04em',
          },
        ],
        body2Normal: [
          '1.4rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.04em',
          },
        ],
        body2Reading: [
          '1.4rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.04em',
          },
        ],
        body3Normal: [
          '1.3rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.04em',
          },
        ],
        body3Reading: [
          '1.3rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.04em',
          },
        ],
        label1Normal: [
          '1.2rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.04em',
          },
        ],
        label1Reading: [
          '1.2rem',
          {
            lineHeight: '1.4',
            letterSpacing: '-0.04em',
          },
        ],
        label2: [
          '1.1rem',
          {
            lineHeight: '1',
            letterSpacing: '-0.04em',
          },
        ],
      },
      keyframes: {
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        slideDown: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(100%)' },
        },
        scaleUp: {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        scaleDown: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(0.95)',
            opacity: '0',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        scaleUp: 'scaleUp 0.2s ease-out',
        scaleDown: 'scaleDown 0.2s ease-in',
        fadeIn: 'fadeIn 0.2s ease-out',
        fadeOut: 'fadeOut 0.2s ease-in',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-show': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        },
      });
    }),
  ],
};
export default config;
