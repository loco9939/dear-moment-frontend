'use client';

import { Product, ProductOption } from '@/api/products/types';
import { Icon_Heart, Icon_Heart_Filled, Icon_Studio } from '@/assets/icons';
import LoginConfirmModal from '@/auth/LoginConfirmModal';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useProductOptionController } from '../controllers/productOptionController';
interface OptionDetailProps {
  initialProduct: Product | null;
  initialProductOption: ProductOption | null;
  initialError: string | null;
}

export default function OptionDetail({ initialProduct, initialProductOption, initialError }: OptionDetailProps) {
  const { isLiked, onClickHeart, onClickInquiry } = useProductOptionController({
    initProductOption: initialProductOption ?? null,
    initProduct: initialProduct ?? null,
  });

  const [showLoginModal, setShowLoginModal] = useState(false);

  // 로그인 여부 확인 후 문의하기 진행
  const handleLoginComfirm = (type: 'like' | 'inquiry') => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      if (type === 'like') {
        onClickHeart();
      } else {
        // option 문의하기 이벤트 발생(GA)
        window.gtag('event', 'option_inquiry', {
          event_category: 'cta_click',
          event_label: 'option_inquiry',
          value: 'option_inquiry',
        });
        onClickInquiry();
      }
    } else {
      setShowLoginModal(true);
    }
  };

  const studio = initialProduct?.studio;

  const hasDiscount = (initialProductOption?.originalPrice ?? 0) - (initialProductOption?.discountPrice ?? 0) > 0;

  const discountRate = Math.floor(
    (((initialProductOption?.originalPrice ?? 0) - (initialProductOption?.discountPrice ?? 0)) /
      (initialProductOption?.originalPrice ?? 0)) *
      100
  );

  useEffect(() => {
    // 상품 상세 페이지 진입 시 option_view 이벤트 발생
    if (initialProduct) {
      if (!window.gtag) return;
      window.gtag('event', 'option_view', {
        items: [
          {
            item_id: initialProduct.productId,
            item_title: initialProduct.title,
          },
        ],
      });
    }
  }, [initialProduct]);

  if (initialError) {
    return (
      <div className="container absolute left-1/2 top-1/2 mx-[2rem] -translate-x-1/2 -translate-y-1/2 transform p-[2rem]">
        <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">{initialError}</div>
      </div>
    );
  }

  if (!initialProduct || !initialProductOption) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform p-[2rem]">
        <div className="relative rounded px-4 py-3 text-body1Normal font-semibold text-gray-90">
          상품 옵션을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-screen-md pb-[7.6rem] text-gray-90">
      {/* 분홍 배경색 */}
      <div className="absolute -top-[8.2rem] left-0 -z-10 h-[24.6rem] w-full bg-red-10" />
      {/* 상품 헤더 */}
      <div className="mt-[2.8rem] flex flex-col items-center">
        {/* <div className="h-[5.7rem] w-[5.7rem] rounded-full bg-gray-40" /> */}
        <Icon_Studio size={57} />
        <span className="mb-[2.2rem] mt-[1rem] text-body1Normal font-semibold">{studio?.name}</span>
        <span className="text-subtitle1 font-bold text-gray-95">{initialProductOption.name}</span>
      </div>

      {/* 상품 상세 정보 */}
      <div className="mt-[7.2rem] px-[2rem]">
        <div>
          <span className="text-subtitle1 font-bold text-gray-95">상품 설명</span>

          {/* 옵션 상세 정보 */}
          <div className="mt-[4rem] space-y-[1.6rem]">
            {Object.entries({
              시간: `${initialProductOption.shootingHours}시간 ${initialProductOption.shootingMinutes}분`,
              장소: `${initialProductOption.shootingLocationCount}곳`,
              의상: `최대 ${initialProductOption.costumeCount}벌`,
              보정본: `${initialProductOption.retouchedCount}장`,
              가격: hasDiscount
                ? `${initialProductOption.discountPrice.toLocaleString()}원`
                : `${initialProductOption.originalPrice.toLocaleString()}원`,
            }).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-body3Normal font-semibold text-gray-60">{key}</span>
                <div className="flex items-center gap-2">
                  {hasDiscount && key === '가격' && <span className="text-red-40">{discountRate}%</span>}
                  <span className="text-body3Normal font-semibold text-gray-80">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 회색 경계선 */}
        <div className="my-[4.3rem] h-[0.8rem] bg-gray-10" />

        {/* 상품 설명 */}
        <div className="whitespace-pre-line">
          <ReactMarkdown>{initialProductOption.description || initialProduct.description}</ReactMarkdown>
        </div>
      </div>

      {/* 로그인 요청 모달 */}
      {showLoginModal && <LoginConfirmModal onClose={() => setShowLoginModal(false)} />}

      {/* 문의하기 버튼 컨테이너 스타일 수정 */}
      <div className="container fixed bottom-0 left-0 right-0 bg-white px-[2rem] py-[1rem]">
        <div className="mx-auto flex max-w-screen-md items-center justify-between gap-[1rem]">
          <button
            className="bg-red-0 flex h-[5.6rem] w-[6.8rem] items-center justify-center rounded-[0.4rem] border border-red-40"
            onClick={() => handleLoginComfirm('like')}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button
            className="h-[5.6rem] w-full rounded-[0.4rem] bg-red-40 text-body1Normal font-semibold text-gray-10"
            onClick={() => handleLoginComfirm('inquiry')}
          >
            바로 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
