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
    <div className="fixed inset-0 bg-gray-95 z-50 flex items-center justify-center">
      {/* 이미지 컨테이너 */}
      <div
        className="relative container h-full flex items-center"
        onClick={e => e.stopPropagation()}
        {...handlers} // 터치 이벤트 핸들러 추가
      >
        {/* 이전 버튼 */}
        <button
          onClick={handlePrevious}
          className="absolute left-[-6rem] top-1/2 transform -translate-y-1/2 text-white text-[3rem] p-4"
        >
          &#8249;
        </button>
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt="포트폴리오 이미지"
            className="w-[36rem] h-[52rem] object-contain"
            draggable={false} // 이미지 드래그 방지
          />
          {/* 이미지 카운터 */}
          <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="absolute right-[-6rem] top-1/2 transform -translate-y-1/2 text-white text-[3rem] p-4"
        >
          &#8250;
        </button>
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-[2rem] left-[2rem] text-white text-[2.4rem]">
          <Icon_ChevronDown className="rotate-90 fill-gray-10" />
        </button>
      </div>
    </div>
  );
}
