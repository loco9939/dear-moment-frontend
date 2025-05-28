'use client';

import { CAMERA_DISPLAY_MAP, STYLE_DISPLAY_MAP } from '@/(home)/models/FilteringModel';
import { CameraType, RetouchStyle } from '@/(home)/type';
import { Product } from '@/api/products/types';
import { Icon_Calendar, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import Icon_Camera from '@/assets/icons/Icon_Camera';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProductDetailController } from '../controllers/productDetailController';
import { ImageViewerModal } from './ImageViewerModal';
import { InquiryBottomSheet } from './InquiryBottomSheet';
import ProductTabs from './ProductTabs';
import LoginConfirmModal from '@/auth/LoginConfirmModal';
import { useState } from 'react';

interface ProductDetailProps {
  initProduct: Product | null;
  initialError: string | null;
}

export default function ProductDetail({ initProduct, initialError }: ProductDetailProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
    product,
    isLiked,
    onClickHeart,
    isOpenInquiry,
    selectedImageIndex,
    setIsOpenInquiry,
    onSelectImage,
    onResetImage,
  } = useProductDetailController({ initProduct });

  const portfolioImages = product?.subImages.map(img => img.url) ?? [];

  const studio = product?.studio;

  // 로그인 여부 확인 후 좋아요 또는 문의하기 진행
  const handleLoginComfirm = (type: 'like' | 'inquiry') => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (type === 'like') {
      // 좋아요
      onClickHeart();
    } else {
      // 문의하기
      setIsOpenInquiry(true);
    }
  };

  if (initialError) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform p-[2rem]">
        <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">{initialError}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-md">
      {/* 대표 이미지 */}
      <div className="relative h-[286px] w-full">
        <Image src={product?.mainImage.url ?? ''} alt="main_image" fill className="object-contain" />
      </div>

      {/* 작가 정보 섹션 */}
      <div className="">
        {/* 작가정보 헤더 */}
        <div className="p-[2rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="h-[5.7rem] w-[5.7rem] rounded-full bg-gray-40" />
            <div className="space-y-[0.8rem] py-[0.7rem]">
              <span className="text-subtitle2 font-bold text-gray-90">{studio?.name}</span>
              <div className="flex gap-[0.5rem]">
                {product?.retouchStyles.map(style => (
                  <div
                    key={style}
                    className="bg-red-20 px-[0.8rem] py-[0.45rem] text-label2 font-semibold text-gray-80"
                  >
                    {STYLE_DISPLAY_MAP[style as RetouchStyle]}
                  </div>
                ))}
              </div>
            </div>
            <button className="ml-auto" onClick={() => handleLoginComfirm('like')}>
              {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
            </button>
          </div>
          <div className="mt-[1.4rem]">
            <p className="text-body2Reading font-bold">{studio?.studioIntro}</p>
          </div>
          <div className="mt-[1.4rem] flex items-center gap-[0.5rem]">
            <Icon_Calendar width={14} height={14} />
            <div className="flex items-center gap-[0.6rem]">
              {product?.availableSeasons.map((season, index) => (
                <span
                  key={index}
                  className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]"
                >
                  {season.replace('YEAR_', '').replace('_FIRST_HALF', '년 상반기').replace('_SECOND_HALF', '년 하반기')}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[0.6rem] flex items-center gap-[0.5rem]">
            <Icon_Camera width={14} height={14} />
            <div className="flex items-center gap-[0.6rem]">
              {product?.cameraTypes.map((cameraType, index) => (
                <span
                  key={index}
                  className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]"
                >
                  {CAMERA_DISPLAY_MAP[cameraType as CameraType]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 작가 정보 컨텐츠 */}
        <div className="">
          {/* 작가 포트폴리오 */}
          <div className="mt-[0.6rem] px-[2rem]">
            <p className="mb-[2rem] text-body2Normal font-semibold text-gray-95">{studio?.name}의 포트폴리오</p>
            <div className="flex flex-wrap gap-[0.2rem]">
              {portfolioImages?.map((imgSrc, index) => {
                if (index > 7) return null;
                return (
                  <div
                    key={index}
                    className="relative flex h-[78px] w-[78px] cursor-pointer items-center"
                    onClick={() => onSelectImage(index)}
                  >
                    <Image src={imgSrc} alt="sub_image" fill className="object-cover" />
                    {index === 7 && (
                      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-gray-30 opacity-90">
                        <span className="text-body3Normal text-common-0">+{8 - index}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 상품정보, 안내사항 탭 */}
        <ProductTabs productOptions={product?.options ?? []} product={product} />

        {/* 문의하기 버튼 */}
        <div className="mb-[1.2rem] flex h-[5.6rem] items-center justify-between gap-[1rem] px-[2rem]">
          <button
            className="bg-red-0 flex h-full w-[6.8rem] cursor-pointer items-center justify-center rounded-[0.4rem] border border-red-40"
            onClick={() => handleLoginComfirm('like')}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button
            className="h-full w-full rounded-[0.4rem] bg-red-40 text-body1Normal font-semibold text-gray-10"
            onClick={() => handleLoginComfirm('inquiry')}
          >
            문의하기
          </button>
        </div>
      </div>

      {/* 로그인 요청 모달 */}
      {showLoginModal && <LoginConfirmModal onClose={() => setShowLoginModal(false)} />}

      {/* 문의하기 Popup */}
      <InquiryBottomSheet
        product={product}
        open={isOpenInquiry}
        onOpenChange={setIsOpenInquiry}
        isLiked={isLiked}
        onClickHeart={onClickHeart}
      />

      {/* 이미지 뷰어 모달 */}
      <ImageViewerModal
        isOpen={selectedImageIndex !== null}
        onClose={onResetImage}
        images={portfolioImages ?? []}
        initialImageIndex={selectedImageIndex || 0}
      />
    </div>
  );
}
