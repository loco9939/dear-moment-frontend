'use client';

import { patchUser } from '@/api/users';
import { Sex } from '@/api/users/types';
import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import { BaseItem, Dropbox } from '@/components/molecule/Dropbox';
import { Modal } from '@/components/ui/Modal';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function OnboardingStep2Page() {
  const router = useRouter();
  const params = useSearchParams();
  const [gender, setGender] = useState<'남' | '여' | null>(null);
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);
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

  const dropdownItems: BaseItem[] = Array.from({ length: 68 }, (_, i) => ({
    id: (1940 + i).toString(),
    label: (1940 + i).toString(),
    value: 1940 + i,
  }));

  const handleGenderSelect = (selectedGender: '남' | '여') => {
    setGender(selectedGender);
  };

  const handleNextClick = async () => {
    if (!gender || !selectedItem) return;

    try {
      const data = {
        name: params.get('nickname')!,
        isStudio: false,
        birthDate: `${selectedItem.value.toString()}-01-01`,
        sex: (gender === '남' ? 'MALE' : 'FEMALE') as Sex,
      };
      const response = await patchUser(data);
      if (response.success) {
        setModalType('success');
      }
    } catch {
      setModalType('error');
    }
    setIsModalOpen(true);
  };

  const handleOptionClick = (item: BaseItem | null) => {
    setSelectedItem(item);
  };

  return (
    <div className="container min-h-[100dvh] flex flex-col">
      <Appbar
        title="기본 정보 설정"
        leftIcon={<Icon_ChevronDown className="rotate-90" onClick={() => router.back()} />}
      />
      <div className="flex-1 px-[2rem]">
        <div className="text-body2Reading font-medium text-gray-90 mb-[0.8rem]">
          <span>STEP 2/</span>
          <span className="text-gray-40">2</span>
        </div>
        <p className="text-title2 font-semibold text-gray-90">{params.get('nickname')}님의</p>
        <p className="text-title2 font-semibold text-gray-90">기본 정보를 알려주세요.</p>

        <div className="mt-[1.5rem]">
          <p className="text-label1Reading font-medium text-gray-40 mb-[0.8rem]">
            (선택) 이용자 특성별 맞춤서 분석을 통해 <br /> 더 나은 서비스 경험을 제공하기 위한 정보로, 이후로 공개되지
            않아요.
          </p>

          <div className="flex items-center gap-[1.2rem] mt-[3rem]">
            <Dropbox
              className="flex-1 border-gray-30"
              placeholder="태어난 연도"
              dropdownItems={dropdownItems}
              selectedItem={selectedItem}
              onChangeProps={handleOptionClick}
            />
            <div className="flex gap-[1.2rem] text-body2Normal font-semibold">
              <button
                className={`w-[5rem] h-[5rem] rounded-[0.2rem] flex items-center justify-center ${
                  gender === '남' ? 'bg-gray-20 text-common-100' : 'bg-gray-10 text-gray-50'
                }`}
                onClick={() => handleGenderSelect('남')}
              >
                남
              </button>
              <button
                className={`w-[5rem] h-[5rem] rounded-[0.2rem] flex items-center justify-center ${
                  gender === '여' ? 'bg-gray-20 text-common-100' : 'bg-gray-10 text-gray-50'
                }`}
                onClick={() => handleGenderSelect('여')}
              >
                여
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container fixed bottom-0 left-0 right-0 px-[2rem] py-[1rem] bg-white">
        <button
          disabled={!gender || !selectedItem}
          className="w-full h-[5.6rem] text-body1Normal font-semibold text-gray-10 bg-red-40 rounded-[0.4rem] disabled:bg-gray-80 disabled:text-gray-50"
          onClick={handleNextClick}
        >
          완료
        </button>
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
