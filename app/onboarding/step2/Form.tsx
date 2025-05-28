'use client';

import { patchUser } from '@/api/users';
import { Sex } from '@/api/users/types';
import { BaseItem, Dropbox } from '@/components/molecule/Dropbox';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface Props {
  setModalType: (type: 'error' | 'success') => void;
  setIsModalOpen: (open: boolean) => void;
}

export default function OnboardingStep2Form({ setModalType, setIsModalOpen }: Props) {
  const params = useSearchParams();
  const nickname = params.get('nickname');

  const [gender, setGender] = useState<'남' | '여' | null>(null);
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);

  const dropdownItems: BaseItem[] = Array.from({ length: 68 }, (_, i) => ({
    id: (1940 + i).toString(),
    label: (1940 + i).toString(),
    value: 1940 + i,
  }));

  const handleGenderSelect = (selectedGender: '남' | '여') => {
    setGender(selectedGender);
  };

  const handleOptionClick = (item: BaseItem | null) => {
    setSelectedItem(item);
  };

  const handleNextClick = async () => {
    if (!gender || !selectedItem) return;

    try {
      const data = {
        name: nickname!,
        isStudio: false,
        birthDate: `${selectedItem.value.toString()}-01-01`,
        sex: (gender === '남' ? 'MALE' : 'FEMALE') as Sex,
        addInfoIsSkip: false, // TODO: skip 버튼 추가되면 반영
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
  return (
    <div className="mt-[1.5rem]">
      <p className="mb-[0.8rem] text-label1Reading font-medium text-gray-40">
        (선택) 이용자 특성별 맞춤서 분석을 통해 <br /> 더 나은 서비스 경험을 제공하기 위한 정보로, 이후로 공개되지
        않아요.
      </p>

      <div className="mt-[3rem] flex items-center gap-[1.2rem]">
        <Dropbox
          className="flex-1 border-gray-30"
          placeholder="태어난 연도"
          dropdownItems={dropdownItems}
          selectedItem={selectedItem}
          onChangeProps={handleOptionClick}
        />
        <div className="flex gap-[1.2rem] text-body2Normal font-semibold">
          <button
            className={`flex h-[5rem] w-[5rem] items-center justify-center rounded-[0.2rem] ${
              gender === '남' ? 'bg-gray-20 text-common-100' : 'bg-gray-10 text-gray-50'
            }`}
            onClick={() => handleGenderSelect('남')}
          >
            남
          </button>
          <button
            className={`flex h-[5rem] w-[5rem] items-center justify-center rounded-[0.2rem] ${
              gender === '여' ? 'bg-gray-20 text-common-100' : 'bg-gray-10 text-gray-50'
            }`}
            onClick={() => handleGenderSelect('여')}
          >
            여
          </button>
        </div>
      </div>
      <div className="container fixed bottom-0 left-0 right-0 bg-white px-[2rem] py-[1rem]">
        <button
          disabled={!gender || !selectedItem}
          className="h-[5.6rem] w-full rounded-[0.4rem] bg-red-40 text-body1Normal font-semibold text-gray-10 disabled:bg-gray-80 disabled:text-gray-50"
          onClick={handleNextClick}
        >
          완료
        </button>
      </div>
    </div>
  );
}
