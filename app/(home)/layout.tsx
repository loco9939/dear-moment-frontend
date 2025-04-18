'use client';

import { Icon_Logo } from '@/assets/icons';
import { NavigationBar } from '@/components/NavigationBar';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const homeWrap = document.getElementById('home-wrap');
    if (homeWrap) {
      homeWrap.style.height = window.innerHeight + 'px';
    }
  }, []);

  return (
    <div id="home-wrap" className="container min-h-[100dvh] flex flex-col">
      <header className="py-[1.5rem] px-[2rem]">
        <Link href="/" className="inline-block">
          <Icon_Logo width={120} height={23} />
        </Link>
      </header>

      {children}

      <NavigationBar />
    </div>
  );
}
