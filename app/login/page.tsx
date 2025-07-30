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

  // 토큰 만료 테스트 함수들
  const testTokenExpiration = () => {
    // localStorage에 만료된 토큰 설정
    localStorage.setItem('accessToken', 'test-token');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('tokenExpiration', (Date.now() - 1000).toString()); // 1초 전으로 설정

    // 쿠키에도 만료된 토큰 설정
    document.cookie = 'accessToken=test-token; path=/; max-age=60; secure; samesite=strict';

    console.log('토큰 만료 테스트 설정 완료!');
    alert('토큰 만료 테스트 설정이 완료되었습니다. 페이지를 새로고침하거나 다른 페이지로 이동해보세요.');
  };

  const testTokenExpirationImmediate = () => {
    // 즉시 토큰 만료 상태로 설정
    localStorage.setItem('accessToken', 'test-token');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('tokenExpiration', (Date.now() - 1000).toString());

    // 페이지 새로고침하여 토큰 만료 감지 트리거
    window.location.reload();
  };

  const clearTestData = () => {
    // 테스트 데이터 정리
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('tokenExpiration');
    document.cookie = 'accessToken=; path=/; max-age=0; secure; samesite=strict';

    console.log('테스트 데이터가 정리되었습니다.');
    alert('테스트 데이터가 정리되었습니다.');
  };

  const showCurrentTokenStatus = () => {
    const token = localStorage.getItem('accessToken');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const expiration = localStorage.getItem('tokenExpiration');
    const cookieToken = document.cookie.includes('accessToken');

    const status = `
현재 토큰 상태:
- localStorage 토큰: ${token ? '있음' : '없음'}
- 로그인 상태: ${isLoggedIn}
- 만료시간: ${expiration ? new Date(parseInt(expiration)).toLocaleString() : '없음'}
- 쿠키 토큰: ${cookieToken ? '있음' : '없음'}
- 현재시간: ${new Date().toLocaleString()}
    `;

    console.log(status);
    alert(status);
  };

  return (
    <div className="relative min-h-screen w-full">
      <Image src="/login.webp" alt="메인 웨딩 사진" fill className="object-cover" priority />

      {/* 토큰 만료 테스트 버튼들 */}
      <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
        <button
          onClick={testTokenExpiration}
          className="rounded bg-red-600 px-3 py-2 text-sm text-white shadow-lg hover:bg-red-700"
        >
          🧪 토큰 만료 설정
        </button>
        <button
          onClick={testTokenExpirationImmediate}
          className="rounded bg-orange-600 px-3 py-2 text-sm text-white shadow-lg hover:bg-orange-700"
        >
          ⚡ 즉시 테스트
        </button>
        <button
          onClick={showCurrentTokenStatus}
          className="rounded bg-blue-600 px-3 py-2 text-sm text-white shadow-lg hover:bg-blue-700"
        >
          📊 토큰 상태 확인
        </button>
        <button
          onClick={clearTestData}
          className="rounded bg-gray-600 px-3 py-2 text-sm text-white shadow-lg hover:bg-gray-700"
        >
          🗑️ 테스트 데이터 정리
        </button>
      </div>

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
