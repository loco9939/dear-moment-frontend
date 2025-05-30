'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import { getMyInfo } from '@/my/_services/my';
import { setStorage } from '@/utils/localStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginSuccessPageUI() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkUserAdditionalInfo = async () => {
    try {
      const response = await getMyInfo();

      const timer = setTimeout(() => {
        // skip 했거나 이미 회원정보 입력했으면 메인 페이지로 이동
        if (response.data.addInfoIsSkip) {
          router.push('/');
        } else {
          router.push('/onboarding');
        }
      }, 2000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error('내 정보 조회 실패:', error);
    }
  };

  useEffect(() => {
    // URL에서 accessToken 추출
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      // accessToken을 localStorage에 저장
      setStorage('accessToken', accessToken);

      // accessToken을 쿠키에 저장
      // path=/: 쿠키가 전체 사이트에서 접근 가능하도록 설정
      // max-age=86400: 쿠키의 유효 기간을 24시간(86400초)으로 설정
      // secure: HTTPS 연결에서만 쿠키가 전송되도록 설정
      // samesite=strict: 같은 도메인에서만 쿠키가 전송되도록 설정
      document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; secure; samesite=strict`;
    }

    // NOTE: 내 정보 조회하여 addInfoIsSkip 값을 기반으로 회원정보 입력 페이지 이동 결정
    checkUserAdditionalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-common-0">
      <div className="flex flex-col items-center gap-6 text-center">
        <svg
          className="h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-90">로그인 성공</h1>
        <p className="text-body1Normal text-gray-70">환영합니다! 잠시 후 메인 페이지로 이동합니다.</p>
        <LoadingSpinner />
      </div>
    </div>
  );
}
