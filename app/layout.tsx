import type { Metadata, Viewport } from 'next';
import Analytics from './components/Analytics';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: [
    {
      path: './fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Dear moment',
  description: '웨딩 스냅 작가 플랫폼',
  appleWebApp: { title: 'Dear moment' },
  icons: [
    { rel: 'icon', url: '/favicon.svg' },
    { rel: 'shortcut icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
  ],
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className="font-sans">
        {process.env.NODE_ENV === 'production' && (
          <Suspense fallback={<></>}>
            <Analytics />
          </Suspense>
        )}
        {children}
        <div id="modal"></div>
      </body>
    </html>
  );
}
