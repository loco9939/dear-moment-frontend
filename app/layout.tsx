import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import Analytics from './components/Analytics';
import TokenExpirationHandler from './components/TokenExpirationHandler';
import { Toaster } from './components/ui/sonner';
import './globals.css';
import QueryProvider from './providers/QueryProvider';

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
  maximumScale: 2,
  userScalable: true,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <QueryProvider>
          {process.env.NODE_ENV === 'production' && (
            <Suspense fallback={<></>}>
              <Analytics />
            </Suspense>
          )}
          <TokenExpirationHandler />
          {children}
          <div id="modal"></div>
          <Toaster position="bottom-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
