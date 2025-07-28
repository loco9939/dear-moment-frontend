'use client';

import { Icon_ChevronDown } from '@/assets/icons';
import Image from 'next/image';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string; // 이미지 URL
}

export function MainImageViewerModal({ isOpen, onClose, images }: ImageViewerModalProps) {
  if (!isOpen) return null;

  return (
    // 모달 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-95">
      {/* 이미지 컨테이너 */}
      <div className="container relative flex h-full items-center justify-center" onClick={e => e.stopPropagation()}>
        <div className="relative h-full w-full">
          <Image
            src={images}
            alt="포트폴리오 이미지"
            fill
            className="h-full w-full object-cover"
            draggable={false} // 이미지 드래그 방지
          />
        </div>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute left-[2rem] top-[2rem] rounded-full bg-common-100 p-2 text-[2.4rem] text-white"
        >
          <Icon_ChevronDown className="rotate-90 fill-gray-10" />
        </button>
      </div>
    </div>
  );
}
