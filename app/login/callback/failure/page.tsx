'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// https://dear-moment.kro.kr/login/callback/failure?kakao=fail&error=DB_SIGNUP_FAILED
// 백엔드에서 전달하는 카카오 로그인 실패 에러 종류 :
// 1. KAKAO_LOGIN_FAILED: 카카오 로그인에 실패한 경우 (400 Bad Request)
// 2. DB_SIGNUP_FAILED: DB 회원가입에 실패한 경우 (500 Internal Server Error)
// 3. OAUTH_SERVER_PROCESS_FAILED: 오어스 서버 데이터 처리에 실패한 경우 (500 Internal Server Error)

export default function LoginFailurePage() {
  const router = useRouter();

  useEffect(() => {
    // 세션 스토리지 초기화
    sessionStorage.clear();
    
    // 2초 후 로그인 페이지로 리다이렉트
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-common-0 px-4">
      <div className="space-y-[6rem] text-center max-w-md w-full">
        <div className="text-subtitle2 font-bold text-gray-90">
          <p>죄송합니다</p>
          <p>로그인에 실패하였습니다.</p>
          <p>로그인 페이지로 돌아가 재시도해주세요.</p>
        </div>
        {/* 박스 이미지 */}
        <Image src="/not_found.webp" alt="Login failed" width={159} height={103} className="mx-auto" />
        <Link
          href="/login"
          className="block whitespace-nowrap rounded-[0.2rem] bg-common-100 text-body1Normal font-semibold text-gray-10 px-[5.5rem] py-[1.6rem]"
        >
          로그인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
