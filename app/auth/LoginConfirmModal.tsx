'use client';

import { Modal } from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

interface LoginConfirmModalProps {
  onClose?: () => void;
}

export default function LoginConfirmModal({ onClose }: LoginConfirmModalProps) {
  const router = useRouter();
  return (
    <Modal
      isOpen={true}
      title={'로그인'}
      description={
        <div className="py-[1.5rem]">
          로그인이 필요한 서비스입니다.
          <br />
          로그인 후 이용 부탁드립니다.
        </div>
      }
      primaryButton={{
        text: '로그인하기',
        onClick: () => router.push('/login'),
      }}
      secondaryButton={{
        text: '취소',
        onClick: () => (onClose ? onClose() : router.back()),
      }}
    />
  );
}
