import { SHOOTING_PERIOD_DISPLAY_MAP, STYLE_DISPLAY_MAP } from '@/(home)/models/FilteringModel';
import { RetouchStyle, ShootingPeriod } from '@/(home)/type';
import { addProductLike, removeProductLike } from '@/api/likes';
import { MainLikeStudio } from '@/api/likes/types';
import { Icon_Calendar, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface StudioCardProps {
  likeStudios: MainLikeStudio;
  onLikeChange?: () => void;
}

export default function StudioCard({ likeStudios, onLikeChange }: StudioCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(likeStudios.likeId !== 0);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    try {
      if (isLiked) {
        // 좋아요 취소
        await removeProductLike({ likeId: likeStudios.likeId, productId: likeStudios.productId });
      } else {
        // 좋아요 추가
        await addProductLike(likeStudios.productId);
      }
      setIsLiked(!isLiked);
      onLikeChange?.();
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  // 상품 페이지로 이동
  const handlePageProductClick = () => {
    router.push(`/products/${likeStudios.productId}`);
  };

  return (
    <div className="mx-[2rem] my-[1.4rem] flex h-[24.7rem] flex-col space-y-[1.3rem]" onClick={handlePageProductClick}>
      {/* 작가정보 헤더 */}
      <div className="flex flex-col space-y-[0.8rem]">
        <div>
          <div className="flex items-center gap-[1rem]">
            <div className="h-[2.6rem] w-[2.6rem] rounded-full bg-gray-40" />
            <div className="space-y-[0.8rem] py-[0.7rem]">
              <span className="text-subtitle2 font-bold text-gray-90">{likeStudios.name}</span>
            </div>
            <button className="ml-auto" onClick={handleLikeClick}>
              {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
            </button>
          </div>
          <div className="flex gap-[0.5rem]">
            {(likeStudios.retouchStyles as RetouchStyle[]).map((style, index) => (
              <div key={index} className="bg-red-20 px-[0.8rem] py-[0.45rem] text-label2 font-semibold text-gray-80">
                {STYLE_DISPLAY_MAP[style]}
              </div>
            ))}
          </div>
        </div>
        {/* 가격 */}
        <div className="mb-2 h-[1.4rem] text-body2Normal">
          {<span className="mr-[0.4rem] font-bold text-red-40">{likeStudios.discountRate}%</span>}
          <span className="font-semibold text-common-100">
            {likeStudios.minPrice.toLocaleString()}원 ~ {likeStudios.maxPrice.toLocaleString()}원
          </span>
        </div>
        {/* 날짜 옵션 */}
        <div className="flex items-center gap-[0.5rem]">
          <Icon_Calendar width={14} height={14} />
          <div className="flex items-center gap-[0.6rem]">
            {likeStudios.availableSeasons?.map((season, index) => (
              <span
                key={index}
                className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]"
              >
                {SHOOTING_PERIOD_DISPLAY_MAP[season as ShootingPeriod]}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* 썸네일 영역 (3장 가로로) */}
      <div className="flex gap-[0.8rem]">
        {likeStudios.thumbnailUrls.map((url, index) => (
          <div key={index} className="relative h-[13.2rem] w-full min-w-[10.1rem] overflow-hidden">
            <Image src={url} alt={`${likeStudios.name} thumbnail ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
