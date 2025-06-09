// 회원탈퇴
//  reason : 탈퇴사유입력
//  confirm : 탈퇴 확인
//  complete : 탈퇴 완료

'use client';

import Link from 'next/link';
import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteUserInfo, getMyInfo, userInfo } from '@/my/_services/my';
import Image from 'next/image';
import { setStorage } from '@/utils/localStorage';

export default function QuitPage() {
  const router = useRouter();
  const [step, setStep] = useState<'reason' | 'confirm' | 'complete'>('reason');
  const [quitReason, setQuitReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [myInfo, setMyInfo] = useState<userInfo | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const { data } = await getMyInfo();
        setMyInfo(data);
      } catch (error) {
        console.error('내 정보 조회 실패', error);
      }
    };
    fetchMyInfo();
  }, []);

  const getReasonCode = (reason: string): number => {
    switch (reason) {
      case 'noUse':
        return 1; // 결혼·웨딩촬영 완료
      case 'expensive':
        return 2; // 마음에 드는 작가 없음
      case 'quality':
        return 3; // 이용 불편
      case 'other':
        return 4; // 다른 플랫폼 이용
      case 'noDate':
        return 5; // 가능한 작가 없음
      case 'custom':
        return 6; // 기타
      default:
        return 1;
    }
  };

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuitReason(e.target.value);
  };

  // 다음 또는 탈퇴하기
  const handleNext = async () => {
    if (step === 'reason') {
      if (!quitReason) {
        alert('탈퇴 사유를 선택해주세요.');
        return;
      }
      if (quitReason === 'custom' && otherReason === '') {
        // 기타(직접입력) 사유 선택 시 사유 입력 필수
        alert('탈퇴 사유를 입력해주세요.');
        return;
      }
      setStep('confirm');
    } else if (step === 'confirm') {
      // 탈퇴 처리
      try {
        await deleteUserInfo({
          reasonCode: getReasonCode(quitReason),
          customReason: quitReason === 'custom' ? otherReason : '',
        });

        // 로컬 스토리지 정리
        setStorage('accessToken', '');
        setStorage('isLoggedIn', 'false');
        sessionStorage.clear(); // 세션 스토리지 정리

        // 쿠키 삭제
        document.cookie = 'accessToken=; path=/; max-age=0; secure; samesite=strict';

        // 약간의 지연 후 상태 업데이트
        setTimeout(() => {
          setStep('complete');
        }, 100);
      } catch (error) {
        console.error('탈퇴하기 실패', error);
      }
    }
  };

  const handleCancel = () => {
    if (step === 'reason') {
      router.push('/my');
    } else if (step === 'confirm') {
      setStep('reason');
    }
  };

  const goHome = () => {
    router.push('/');
  };

  const renderPage = () => {
    switch (step) {
      case 'reason':
        return (
          <div className="mx-[2rem]">
            <div className="flex flex-col space-y-[4.5rem] py-[1rem]">
              <div>
                <div className="mb-[1.2rem] text-title2 font-semibold text-common-100">
                  {myInfo?.name}님
                  <br />
                  정말 탈퇴하시겠어요?
                </div>
                <div className="size text-body1Normal font-medium text-gray-80">
                  지금 탈퇴하시면 아래 혜택이 모두 사라져요!
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="mb-[2rem] text-body2Normal font-medium text-gray-70">
                  {myInfo?.name}님이 찜한 스튜디오 리스트 {myInfo?.likeStudioCount}건
                </span>
                <Link href="/like?isSelected=studio" className="w-full">
                  <button className="w-full rounded bg-black px-[1.6rem] py-[1.6rem] text-white">
                    <span className="text-body2Normal font-semibold text-gray-10">찜한 스튜디오 확인하러 가기</span>
                  </button>
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="mb-[2rem] text-body2Normal font-medium text-gray-70">
                  {myInfo?.name}님이 찜한 상품 리스트 {myInfo?.likeProductCount}건
                </span>
                <Link href="/like?isSelected=product" className="w-full">
                  <button className="w-full rounded bg-black px-[1.6rem] py-[1.6rem] text-white">
                    <span className="text-body2Normal font-semibold text-gray-10">찜한 상품 확인하러 가기</span>
                  </button>
                </Link>
              </div>
            </div>
            {/* <br /> */}
            <div className="pb-[1rem] pt-[1.4rem]">
              <hr />
              <h2 className="my-[3.6rem] text-body1Normal font-medium text-gray-80">
                탈퇴 사유를 알려주시면 서비스 개선에 힘쓰겠습니다.
              </h2>
              <div className="space-y-[1rem] text-body2Reading font-medium text-gray-70">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="quitReason"
                    value="noUse"
                    className="mr-2"
                    checked={quitReason === 'noUse'}
                    onChange={handleReasonChange}
                  />
                  <span>결혼/웨딩 촬영이 모두 완료되어 더 이상 필요 없음</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="quitReason"
                    value="expensive"
                    className="mr-2"
                    checked={quitReason === 'expensive'}
                    onChange={handleReasonChange}
                  />
                  <span>마음에 드는 작가를 찾지 못함</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="quitReason"
                    value="quality"
                    className="mr-2"
                    checked={quitReason === 'quality'}
                    onChange={handleReasonChange}
                  />
                  <span>이용이 불편함</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="quitReason"
                    value="other"
                    className="mr-2"
                    checked={quitReason === 'other'}
                    onChange={handleReasonChange}
                  />
                  <span>다른 플랫폼이나 채널을 통해 작가를 찾음</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="quitReason"
                    value="noDate"
                    className="mr-2"
                    checked={quitReason === 'noDate'}
                    onChange={handleReasonChange}
                  />
                  <span>원하는 지역/날짜에 가능한 작가가 없음</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="quitReason"
                    value="custom"
                    className="mr-2"
                    checked={quitReason === 'custom'}
                    onChange={handleReasonChange}
                  />
                  <span>기타(직접입력)</span>
                </label>
                {quitReason === 'custom' && (
                  <Textarea
                    placeholder="문의 내용을 입력해주세요"
                    maxLength={1000}
                    className="mt-[1.2rem] h-[20rem]"
                    value={otherReason}
                    onChange={e => setOtherReason(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      case 'confirm':
        return (
          <div className="mx-[2rem] space-y-[4.5rem] p-[1rem]">
            <div className="space-y-[1.2rem]">
              <h2 className="text-title2 font-semibold text-common-100">
                디어모먼트를 <br />
                정말 탈퇴하시겠어요?
              </h2>
              <p className="text-body1Normal font-medium text-gray-80">탈퇴 전 반드시 확인해주세요</p>
            </div>
            <div className="space-y-[1.2rem] text-body2Reading font-medium text-gray-70">
              <li>탈퇴 후 기존 정보는 복구되지 않습니다.</li>
              <li>탈퇴 시 계정 및 개인정보(찜한 목록, 문의 내역 등)는 즉시 삭제됩니다.</li>
              <li>연령대•이용 패턴 등은 통계 목적으로 비식별 처리되어 활용됩니다.</li>
            </div>
          </div>
        );
      case 'complete':
        return (
          <div className="mx-[2rem] flex min-h-[calc(100vh-12.4rem)] flex-col items-center justify-center space-y-[1.2rem]">
            {/* <Image src="/images/quit/quit_complete.png" alt="탈퇴 완료" width={100} height={100} /> */}
            <Image src="/not_found.webp" alt="Not found" width={159} height={103} className="mx-auto" />
            <h2 className="text-title2 font-semibold text-common-100">탈퇴가 완료되었습니다</h2>
            <p className="text-body1Normal font-medium text-gray-80">디어모먼트를 이용해주셔서 감사합니다.</p>
          </div>
        );
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'reason':
        return (
          <div className="mb-[1.2rem] mt-[3.2rem] flex h-[5.6rem] items-center justify-between gap-[1rem] px-[2rem]">
            <button
              className="bg-red-0 flex h-full w-[8.9rem] cursor-pointer items-center justify-center rounded-[0.4rem] border border-red-40 text-body1Normal font-semibold text-red-40"
              onClick={handleNext}
            >
              다음
            </button>
            <button
              className="h-full w-full rounded-[0.4rem] bg-red-40 text-body1Normal font-semibold text-gray-10"
              onClick={handleCancel}
            >
              취소
            </button>
          </div>
        );
      case 'confirm':
        return (
          <div className="mb-[1.2rem] flex h-[5.6rem] items-center justify-between gap-[1rem] px-[2rem]">
            <button
              className="bg-red-0 flex h-full w-[8.9rem] cursor-pointer items-center justify-center rounded-[0.4rem] border border-red-40 text-body1Normal font-semibold text-red-40"
              onClick={handleNext}
            >
              탈퇴하기
            </button>
            <button
              className="h-full w-full rounded-[0.4rem] bg-red-40 text-body1Normal font-semibold text-gray-10"
              onClick={handleCancel}
            >
              취소
            </button>
          </div>
        );
      case 'complete':
        return (
          <div className="mb-[1.2rem] flex h-[5.6rem] items-center justify-between gap-[1rem] px-[2rem]">
            <button
              className="h-[5.6rem] w-full rounded-[0.4rem] bg-red-40 text-body1Normal font-semibold text-gray-10"
              onClick={goHome}
            >
              홈화면으로 이동하기
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container flex min-h-[100dvh] flex-col">
      <Appbar
        leftIcon={
          <Link
            href={step === 'reason' ? '/my' : '#'}
            onClick={e => {
              if (step !== 'reason') {
                e.preventDefault();
                handleCancel();
              }
            }}
          >
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="회원 탈퇴"
      />
      <main className="flex-1">{renderPage()}</main>
      <div className="mx-[2rem]">{renderStep()}</div>
    </div>
  );
}
