'use client';

import { Product, ProductOption } from '@/api/products/types';
import { Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
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

  const studio = initialProduct?.studio;

  if (initialError) {
    return (
      <div className="p-[2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 container mx-[2rem]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{initialError}</div>
      </div>
    );
  }

  if (!initialProduct || !initialProductOption) {
    return (
      <div className="p-[2rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-gray-90 text-body1Normal font-semibold px-4 py-3 rounded relative">
          상품 옵션을 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-screen-md mx-auto text-gray-90 pb-[7.6rem]">
      {/* 분홍 배경색 */}
      <div className="absolute -top-[8.2rem] left-0 w-full h-[24.6rem] bg-red-10 -z-10" />
      {/* 상품 헤더 */}
      <div className="flex flex-col items-center mt-[2.8rem]">
        <div className="w-[5.7rem] h-[5.7rem] bg-gray-40 rounded-full" />
        <span className="text-body1Normal font-semibold mt-[1rem] mb-[2.2rem]">{studio?.name}</span>
        <span className="text-subtitle1 font-bold text-gray-95">{initialProductOption.name}</span>
      </div>

      {/* 상품 상세 정보 */}
      <div className="mt-[7.2rem] px-[2rem]">
        <div>
          <span className="text-subtitle1 font-bold text-gray-95">상품 설명</span>

          {/* 옵션 상세 정보 */}
          <div className="space-y-[1.6rem] mt-[4rem]">
            {Object.entries({
              시간: `${initialProductOption.shootingHours}시간 ${initialProductOption.shootingMinutes}분`,
              장소: `${initialProductOption.shootingLocationCount}곳`,
              의상: `최대 ${initialProductOption.costumeCount}벌`,
              보정본: `${initialProductOption.retouchedCount}장`,
              가격: initialProductOption.discountPrice
                ? `${initialProductOption.discountPrice.toLocaleString()}원`
                : `${initialProductOption.originalPrice.toLocaleString()}원`,
            }).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-body3Normal font-semibold text-gray-60">{key}</span>
                <span className="text-body3Normal font-semibold text-gray-80">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 회색 경계선 */}
        <div className="bg-gray-10 h-[0.8rem] my-[4.3rem]" />

        {/* 상품 설명 */}
        <div>
          <p className="text-body3Normal text-gray-80">
            {initialProductOption.description || initialProduct.description}
          </p>
        </div>
      </div>

      {/* 문의하기 버튼 컨테이너 스타일 수정 */}
      <div className="container fixed bottom-0 left-0 right-0 px-[2rem] py-[1rem] bg-white">
        <div className="max-w-screen-md mx-auto flex gap-[1rem] justify-between items-center">
          <button
            className="w-[6.8rem] h-[5.6rem] flex justify-center items-center bg-red-0 border border-red-40 rounded-[0.4rem]"
            onClick={onClickHeart}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button
            className="w-[24.2rem] h-[5.6rem] text-body1Normal font-semibold text-gray-10 bg-red-40 rounded-[0.4rem]"
            onClick={onClickInquiry}
          >
            바로 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
