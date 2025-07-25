'use client';

import { Icon_ChevronDown } from '@/assets/icons';
import { useSwipe } from '@/hooks/useSwipe';
import { useEffect, useState } from 'react';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[]; // 이미지 URL 배열
  initialImageIndex: number; // 처음 보여줄 이미지 인덱스
}

export function ImageViewerModal({ isOpen, onClose, images, initialImageIndex }: ImageViewerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialImageIndex);

  // initialImageIndex가 변경될 때 currentIndex를 업데이트
  useEffect(() => {
    setCurrentIndex(initialImageIndex);
  }, [initialImageIndex]);

  // 이전 이미지로 이동
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  // 다음 이미지로 이동
  const handleNext = () => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // useSwipe 훅 사용
  const { handlers } = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
  });

  if (!isOpen) return null;

  return (
    // 모달 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-95">
      {/* 이미지 컨테이너 */}
      <div
        className="container relative flex h-full items-center justify-center"
        onClick={e => e.stopPropagation()}
        {...handlers} // 터치 이벤트 핸들러 추가
      >
        {/* 이전 버튼 */}
        <button
          onClick={handlePrevious}
          className="absolute left-[2rem] top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-common-100 p-2"
        >
          <Icon_ChevronDown className="-translate-x-[0.1rem] rotate-90 fill-white" />
        </button>
        <div className="relative h-full w-full">
          <img
            src={images[currentIndex]}
            alt="포트폴리오 이미지"
            className="h-full w-full object-cover"
            draggable={false} // 이미지 드래그 방지
          />
          {/* 이미지 카운터 */}
          <div className="absolute bottom-[3rem] left-1/2 -translate-x-1/2 transform text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="absolute right-[2rem] top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-common-100 p-2"
        >
          <Icon_ChevronDown className="translate-x-[0.1rem] -rotate-90 fill-white" />
        </button>
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
