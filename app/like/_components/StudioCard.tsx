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

  const handleLikeClick = async () => {
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
    <div className="h-[24.7rem] my-[1.4rem] mx-[2rem] flex flex-col space-y-[1.3rem]" onClick={handlePageProductClick}>
      {/* 작가정보 헤더 */}
      <div className="flex flex-col space-y-[0.8rem]">
        <div>
          <div className="flex items-center gap-[1rem]">
            <div className="w-[2.6rem] h-[2.6rem] rounded-full bg-gray-40" />
            <div className="space-y-[0.8rem] py-[0.7rem]">
              <span className="text-gray-90 text-subtitle2 font-bold">{likeStudios.name}</span>
            </div>
            <button className="ml-auto" onClick={handleLikeClick}>
              {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
            </button>
          </div>
          <div className="flex gap-[0.5rem]">
            {(likeStudios.retouchStyles as RetouchStyle[]).map((style, index) => (
              <div key={index} className="text-gray-80 text-label2 font-semibold bg-red-20 px-[0.8rem] py-[0.45rem]">
                {STYLE_DISPLAY_MAP[style]}
              </div>
            ))}
          </div>
        </div>
        {/* 가격 */}
        <div className="h-[1.4rem] mb-2 text-body2Normal">
          {<span className="font-bold text-red-40 mr-[0.4rem]">{likeStudios.discountRate}%</span>}
          <span className="text-common-100 font-semibold">
            {likeStudios.minPrice.toLocaleString()}원 ~ {likeStudios.maxPrice.toLocaleString()}원
          </span>
        </div>
        {/* 날짜 옵션 */}
        <div className="flex gap-[0.5rem] items-center">
          <Icon_Calendar width={14} height={14} />
          <div className="flex gap-[0.6rem] items-center">
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
          <div key={index} className="min-w-[10.1rem] w-full h-[13.2rem] relative overflow-hidden">
            <Image src={url} alt={`${likeStudios.name} thumbnail ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
