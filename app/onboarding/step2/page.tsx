'use client';

import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Modal } from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import OnboardingStep2Form from './Form';
import OnboardingStep2Info from './Info';

export default function OnboardingStep2Page() {
  const router = useRouter();

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'error' | 'success'>('error');

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);

    // 성공 모달이었다면 목록 페이지로 이동
    if (modalType === 'success') {
      router.push('/');
    }
  };

  return (
    <div className="container min-h-[100dvh] flex flex-col">
      <Appbar
        title="기본 정보 설정"
        leftIcon={<Icon_ChevronDown className="rotate-90" onClick={() => router.back()} />}
      />
      <div className="flex-1 px-[2rem]">
        <Suspense fallback={<LoadingSpinner />}>
          <OnboardingStep2Info />
          <OnboardingStep2Form setModalType={setModalType} setIsModalOpen={setIsModalOpen} />
        </Suspense>
      </div>

      <Modal
        isOpen={isModalOpen}
        title={modalType === 'error' ? '기본 정보 입력 실패' : '기본 정보 입력 완료'}
        description={
          <p className="py-[1.5rem]">
            {modalType === 'error'
              ? '기본 정보가 입력 실패했습니다. 잠시 후 다시 시도해주세요.'
              : '기본 정보가 입력되었습니다.'}
          </p>
        }
        primaryButton={{
          text: '확인',
          onClick: handleCloseModal,
        }}
      />
    </div>
  );
}
