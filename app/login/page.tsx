'use client';

import { Icon_Logo } from '@/assets/icons';
import { KakaoLogin } from '@/components/KakaoLogin';

import Image from 'next/image';
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    // 페이지 로드 시 세션 스토리지 초기화
    sessionStorage.clear();
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <Image src="/login.webp" alt="메인 웨딩 사진" fill className="object-cover" priority />
      <div className="absolute z-10 flex w-full flex-col gap-[1.44rem] px-[2.3rem] pt-[19.2rem]">
        <Icon_Logo width={142} height={23} />
        <div className="z-10 w-[19.3rem] text-title2 font-bold text-common-0">딱 맞는 웨딩스냅 찾는 가장 쉬운 방법</div>
      </div>
      <div className="absolute bottom-[2rem] w-full px-[2rem]">
        <KakaoLogin />
      </div>
    </div>
  );
}
