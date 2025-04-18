'use client';

import { Icon_Logo } from '@/assets/icons';
import { NavigationBar } from '@/components/NavigationBar';
import Link from 'next/link';
import { useEffect } from 'react';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 뷰포트 높이를 설정하는 함수
    const setViewportHeight = () => {
      const homeWrap = document.getElementById('home-wrap');
      if (homeWrap) {
        homeWrap.style.height = `${window.innerHeight}px`;
      }
    };

    // 초기 로드 시 높이 설정
    setViewportHeight();

    // 화면 크기가 변경될 때마다 높이 업데이트
    window.addEventListener('resize', setViewportHeight);

    // 모바일 기기에서 주소창이 나타나거나 사라질 때 높이 업데이트
    window.addEventListener('orientationchange', setViewportHeight);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <div id="home-wrap" className="container flex flex-col" style={{ minHeight: '100vh' }}>
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
