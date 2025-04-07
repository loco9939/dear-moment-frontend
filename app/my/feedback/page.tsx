'use client';

import { postInquiryService } from '@/api/inquiry';
import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import { BaseItem, Dropbox } from '@/components/molecule/Dropbox';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MyFeedbackPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'error' | 'success'>('error');
  const [content, setContent] = useState('');
  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setIsEmailValid(false);
      setEmailErrorMessage('유효한 이메일 주소를 입력해주세요.');
    } else {
      setIsEmailValid(true);
      setEmailErrorMessage('');
    }
  };

  // 이메일 필드에서 포커스가 빠져나갈 때 검증
  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setIsEmailValid(false);
      setEmailErrorMessage('유효한 이메일 주소를 입력해주세요.');
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setEmailErrorMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    try {
      if (!selectedItem) return;

      const res = await postInquiryService({
        type: selectedItem.value.toString(),
        content,
        email,
      });
      setIsModalOpen(true);
    } catch (e) {
      console.error(e);
      setModalType('error');
      setIsModalOpen(true);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);

    // 성공 모달이었다면 목록 페이지로 이동
    if (modalType === 'success') {
      router.push('/my');
    }
  };

  const dropdownItems = [
    { id: '1', label: '디어모먼트 서비스 칭찬', value: 'SERVICE_COMPLIMENT' },
    { id: '2', label: '디어모먼트 서비스 불편/제안', value: 'SERVICE_SUGGESTION' },
    { id: '3', label: '시스템 개선 의견', value: 'SYSTEM_IMPROVEMENT' },
  ];

  return (
    <div className="container min-h-screen flex flex-col">
      <Appbar
        leftIcon={
          <Link href="/my">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="고객의 소리"
      />
      <main className="flex-1 px-[2rem] py-[2.8rem]">
        <Dropbox dropdownItems={dropdownItems} selectedItem={selectedItem} onChangeProps={setSelectedItem} />
        <Textarea
          placeholder="의견을 입력해주세요"
          maxLength={1000}
          onChange={onChangeContent}
          value={content}
          className="mt-[1.2rem] h-[20rem]"
        />
        <div className="mt-[1.8rem]">
          <p className="text-body2Normal font-bold text-gray-90 mb-[1.2rem]">답변 받을 이메일을 입력해주세요</p>
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            maxLength={50}
            onChange={onChangeEmail}
            onBlur={handleEmailBlur}
            value={email}
            className={!isEmailValid ? 'border-red-500' : ''}
          />
          {!isEmailValid && <p className="text-red-500 text-sm mt-1">{emailErrorMessage}</p>}
        </div>
      </main>
      <button
        className="w-[32rem] h-[5.6rem] bg-red-40 text-body1Normal font-semibold text-gray-10 mx-auto mb-[1.2rem] rounded-[0.4rem] disabled:bg-gray-80 disabled:text-gray-50"
        disabled={!isEmailValid || !email.trim() || !content.trim() || !selectedItem}
        onClick={handleSubmit}
      >
        접수하기
      </button>
      <Modal
        isOpen={isModalOpen}
        title={modalType === 'error' ? '오류 발생' : '접수 완료'}
        description={
          <p className="py-[1.5rem]">
            {modalType === 'error' ? '접수에 실패했습니다.' : '오류 제보가 접수되었습니다.'}
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
