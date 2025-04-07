'use client';

import { postInquiryStudio } from '@/api/inquiry';
import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MyReportAuthorErrorEditPage() {
  const router = useRouter();

  // 입력 필드 상태 관리
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [content, setContent] = useState('');

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'error' | 'success'>('error');

  // 입력 필드 변경 핸들러
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 이메일 유효성 검사 함수
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

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    // 이메일 유효성 검사
    if (email && !validateEmail(email)) {
      setIsEmailValid(false);
      setEmailErrorMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    // 필수 항목 검증
    if (!title.trim() || !email.trim() || !content.trim()) {
      // 하나라도 빈 값이면 에러 모달 표시
      setModalType('error');
      setIsModalOpen(true);
      return;
    }

    // 모든 값이 채워졌다면 성공 모달 표시
    setModalType('success');
    setIsModalOpen(true);

    // TODO: 실제 API 호출은 여기에 추가
    // submitReport({ title, email, content });
    try {
      const res = await postInquiryStudio({ title, email, content });
      console.log('====res: ', res);
    } catch (e) {
      console.error(e);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);

    // 성공 모달이었다면 목록 페이지로 이동
    if (modalType === 'success') {
      router.push('/my/report-author-error');
    }
  };

  return (
    <div className="container min-h-screen flex flex-col">
      <Appbar
        leftIcon={
          <Link href="/my/report-author-error">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="작가 정보 오류 제보"
      />
      <main className="flex-1 px-[2rem] mt-[4rem]">
        <Input placeholder="제목을 입력해주세요" onChange={onChangeTitle} value={title} />
        <Textarea
          placeholder="문의 내용을 입력해주세요"
          maxLength={200}
          onChange={onChangeContent}
          value={content}
          className="mt-[1.2rem] h-[20rem]"
        />
        <div className="mt-[1.2rem]">
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
        <div className="mt-[4.6rem]">
          <p className="text-body2Normal font-bold text-gray-90">안내사항</p>
          <ul className="list-disc pl-[1.5rem] mt-[1.5rem] space-y-[0.6rem] text-label1Reading font-regular text-gray-60">
            <li>제보해주신 작가 정보는 검토 후 정확한 오류로 확인될 경우 수정 및 답변을 드립니다.</li>
            <li>제보 내용이 사실과 다를 경우 별도의 답변은 제공되지 않는 점 양해 부탁드립니다.</li>
            <li>답변 시간은 평일 오전 9시 ~ 오후 6시 까지입니다.</li>
          </ul>
        </div>
      </main>
      <button
        className="w-[32rem] h-[5.6rem] bg-red-40 text-body1Normal font-semibold text-gray-10 mx-auto mb-[1.2rem] rounded-[0.4rem] disabled:bg-gray-80 disabled:text-gray-50"
        disabled={!isEmailValid || !email.trim() || !title.trim() || !content.trim()}
        onClick={handleSubmit}
      >
        접수하기
      </button>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        title={modalType === 'error' ? '필수 항목 미입력' : '접수 완료'}
        description={
          <p className="py-[1.5rem]">
            {modalType === 'error' ? '제목, 내용, 이메일을 입력해주세요' : '오류 제보가 접수되었습니다.'}
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
