'use client';

import { Appbar } from '@/components/Appbar';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OnboardingPage() {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // 닉네임 유효성 검사 함수
  const validateNickname = (value: string): boolean => {
    // 2~8자 이내의 한글, 숫자만 입력 가능
    const regex = /^[가-힣0-9]{2,8}$/;
    return regex.test(value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);

    // 입력 중에는 에러 메시지 초기화
    if (value === '') {
      setError('');
    } else if (value.length < 2) {
      setError('닉네임은 2자 이상이어야 합니다.');
    } else if (value.length > 8) {
      setError('닉네임은 8자 이하여야 합니다.');
    } else if (!validateNickname(value)) {
      setError('한글과 숫자만 입력 가능합니다.');
    } else {
      setError('');
    }
  };

  const handleNextClick = () => {
    if (!validateNickname(nickname)) {
      setError('닉네임은 2~8자 이내의 한글, 숫자만 입력 가능합니다.');
      return;
    }
    // step2 페이지로 이동
    router.push(`/onboarding/step2?nickname=${nickname}`);
  };
  return (
    <div className="container min-h-[100dvh] flex flex-col">
      <Appbar title="기본 정보 설정" />
      <div className="flex-1 px-[2rem]">
        <div className="text-body2Reading font-medium text-gray-90 mb-[0.8rem]">
          <span>STEP 1/</span>
          <span className="text-gray-40">2</span>
        </div>
        <p className="text-title2 font-semibold text-gray-90">닉네임을 알려주세요.</p>
        <Input
          placeholder="닉네임을 입력해주세요"
          className="mt-[3rem]"
          minLength={2}
          maxLength={8}
          value={nickname}
          onChange={handleNicknameChange}
          errorMessage={error}
        />
      </div>
      <div className="container fixed bottom-0 left-0 right-0 px-[2rem] py-[1rem] bg-white">
        <button
          disabled={nickname.length < 2 || !!error}
          className="w-full h-[5.6rem] text-body1Normal font-semibold text-gray-10 bg-red-40 rounded-[0.4rem] disabled:bg-gray-80 disabled:text-gray-50"
          onClick={handleNextClick}
        >
          다음
        </button>
      </div>
    </div>
  );
}
