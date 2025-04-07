'use client';

import { MainPageProduct } from '@/api/products/types';
import { Icon_Calendar, Icon_Cancel_Circle_Filled, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductCardController } from '../controllers/ProductCardController';
import { STYLE_DISPLAY_MAP } from '../models/FilteringModel';
import { RetouchStyle } from '../type';

export default function ProductCard({
  mainProduct,
  isFirst = false,
}: {
  mainProduct: MainPageProduct;
  isFirst?: boolean;
}) {
  const router = useRouter();
  const { isLiked, onClickHeart } = useProductCardController({ mainProduct });
  const [showNotification, setShowNotification] = useState(false);

  // 첫번째 요소에만 Notification 띄우고 session 기간까지만 유지
  // 현재는 mockData 사용중이라 새로고침 시 깜빡이는 이슈 존재하지만 실 데이터 API 연동 시 데이터 바인딩 후 AuthorCard 렌더링 되므로 깜빡이는 이슈 해결
  useEffect(() => {
    if (isFirst) {
      const notificationState = sessionStorage.getItem('productCardNotificationShown');
      setShowNotification(notificationState !== 'hidden');
    }
  }, [isFirst]);

  const closeNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem('productCardNotificationShown', 'hidden');
    setShowNotification(false);
  };

  // 하트 아이콘 클릭 시 이벤트 버블링 방지
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickHeart();
  };

  // MainPageProduct 타입은 이미 계산된 값을 가지고 있음
  const { minPrice, maxPrice, discountRate } = mainProduct;
  const hasDiscount = discountRate > 0;

  // 썸네일 이미지 설정
  const thumbnails = mainProduct.thumbnailUrls || [];

  // 상품 페이지로 이동
  const handleMainProductClick = () => {
    router.push(`/products/${mainProduct.productId}`);
  };

  return (
    <div className="w-full bg-white rounded-lg cursor-pointer" onClick={handleMainProductClick}>
      {/* 사진 갤러리 레이아웃 - 가로 스크롤 기능 추가 */}
      <div className="relative h-[13.6rem]">
        {hasDiscount && (
          <div className="text-label1Normal font-semibold text-common-0 bg-red-40 absolute top-0 left-0 z-10 px-[0.8rem] py-[0.55rem]">
            할인 프로모션
          </div>
        )}

        {/* 이미지 갤러리 스크롤 영역 */}
        <div className="flex overflow-x-auto gap-[0.2rem] h-full scrollbar-hide snap-x snap-mandatory">
          {thumbnails.length > 0 ? (
            thumbnails.map((thumbnail, index) => (
              <div key={index} className="relative flex-shrink-0 w-[calc(33.33%-0.133rem)] h-full snap-start">
                <Image
                  src={thumbnail || '/author_thumb.png'}
                  alt={`상품 이미지 ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            // 이미지가 없을 경우 기본 이미지 표시
            <div className="relative flex-shrink-0 w-full h-full">
              <Image src="/author_thumb.png" alt="기본 상품 이미지" fill className="object-cover" />
            </div>
          )}
        </div>

        {/* 스크롤 표시자 */}
        {thumbnails.length > 3 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {thumbnails.map((_, index) => (
              <div key={index} className={`w-1.5 h-1.5 rounded-full ${index < 3 ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        )}
      </div>

      {/* 하단 텍스트 정보 */}
      <div className="mt-[0.8rem]">
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-[1rem]">
            {/* 스튜디오 이름 */}
            <h3 className="text-body2Normal font-semibold text-gray-90">{mainProduct.studioName}</h3>
          </div>

          {isLiked ? (
            <Icon_Heart_Filled className="cursor-pointer" onClick={handleHeartClick} />
          ) : (
            <Icon_Heart className="cursor-pointer" onClick={handleHeartClick} />
          )}
        </div>
        <div className="flex gap-[0.4rem] mt-[0.5rem]">
          {mainProduct.retouchStyles &&
            mainProduct.retouchStyles
              .slice(0, 2)
              .map((style, index) => <CategoryLabel key={index} label={STYLE_DISPLAY_MAP[style as RetouchStyle]} />)}
        </div>
        <div className="mt-[0.6rem] flex gap-[0.7rem]">
          {hasDiscount && <span className="text-body1Normal font-bold text-red-40">{discountRate}%</span>}
          <span className="text-body1Normal font-semibold text-gray-90">{minPrice.toLocaleString()}원</span>
          {minPrice !== maxPrice && (
            <>
              <span className="text-body1Normal font-bold text-gray-90">~</span>
              <span className="text-body1Normal font-semibold text-gray-90">{maxPrice.toLocaleString()}원</span>
            </>
          )}
        </div>

        {/* 가격 툴팁 */}
        {isFirst && showNotification && <Notification closeNotification={closeNotification} />}

        {/* 날짜 옵션 */}
        <div className="flex gap-[0.5rem] mt-[0.6rem] items-center">
          <Icon_Calendar width={14} height={14} />
          <div className="flex gap-[0.6rem] items-center">
            {mainProduct.shootingSeason &&
              mainProduct.shootingSeason.map((season, index) => (
                <span
                  key={index}
                  className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]"
                >
                  {season.replace('YEAR_', '').replace('_FIRST_HALF', '년 상반기').replace('_SECOND_HALF', '년 하반기')}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CategoryLabel = ({ label }: { label: string }) => {
  return (
    <div className="bg-red-20 rounded-[0.2rem] text-label2 font-semibold px-[0.8rem] py-[0.45rem] border-none text-gray-80">
      {label}
    </div>
  );
};

const Notification = ({ closeNotification }: { closeNotification: (e: React.MouseEvent) => void }) => {
  return (
    <div className="relative bg-gray-90 inline-block px-[0.65rem] py-[0.5rem] rounded-[0.4rem] mt-[0.7rem]">
      <div className="absolute -top-[1.5rem] left-[2.4rem] w-0 h-0 border-[1rem] border-gray-90 border-t-transparent border-r-transparent border-l-transparent" />
      <span className="float-left text-label2 font-medium text-gray-20 pt-[0.2rem] mr-[0.4rem]">
        상품의 최저가부터 최고가까지 보여줄게요
      </span>
      <Icon_Cancel_Circle_Filled
        className="fill-gray-50 float-left cursor-pointer"
        width={16}
        height={16}
        onClick={closeNotification}
      />
    </div>
  );
};
