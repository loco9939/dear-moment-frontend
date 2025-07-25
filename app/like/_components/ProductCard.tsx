import { SHOOTING_PERIOD_DISPLAY_MAP } from '@/(home)/models/FilteringModel';
import { ShootingPeriod } from '@/(home)/type';
import { addOptionLike, removeOptionLike } from '@/api/likes';
import { MainLikeProduct } from '@/api/likes/types';
import { Icon_Calendar, Icon_ChevronDown, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductCardProps {
  likeProduct: MainLikeProduct;
  onLikeChange?: () => void;
}

interface LikeItemProps {
  label: string;
  value: string | number | boolean;
  unit?: string;
  booleanText?: { true: string; false: string };
}

const InfoItem = ({ label, value, unit = '', booleanText }: LikeItemProps) => {
  const displayValue =
    typeof value === 'boolean'
      ? booleanText
        ? value
          ? booleanText.true
          : booleanText.false
        : value.toString()
      : `${value}${unit}`;

  return (
    <div className="flex h-[1.8rem] w-[13.5rem] flex-1 justify-between py-3">
      <span className="text-body3Normal font-semibold">{label}</span>
      <span className="font-regular text-body3Normal">{displayValue}</span>
    </div>
  );
};

export default function ProductCard({ likeProduct, onLikeChange }: ProductCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(!!likeProduct);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    try {
      if (isLiked) {
        // 좋아요 취소
        await removeOptionLike({ likeId: likeProduct.likeId, optionId: likeProduct.productOptionId });
      } else {
        // 좋아요 추가
        await addOptionLike(likeProduct.productOptionId);
      }
      setIsLiked(!isLiked);
      onLikeChange?.();
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  // 상품 옵션 설명 페이지로 이동
  const handlePageProductOptionClick = () => {
    router.push(`/options/${likeProduct.productId}/${likeProduct.productOptionId}`);
  };

  // 상품 페이지로 이동
  const handlePageProductClick = () => {
    router.push(`/products/${likeProduct.productId}`);
  };

  return (
    <div className="m-[2rem] h-[25.6rem]">
      {/* 사진 */}
      <div className="flex h-[18.4rem] justify-between" onClick={handlePageProductOptionClick}>
        <div className="relative w-full bg-gray-10">
          <Image src={likeProduct.thumbnailUrl} alt="메인 웨딩 사진" fill className="object-cover" loading="lazy" />
          <button className="absolute right-[0.6rem] top-[15.25rem]" onClick={handleLikeClick}>
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
          </button>
        </div>
        <div className="w-[1rem]"></div>
        <div className="flex w-[15.5rem] flex-col justify-between bg-gray-10 px-[1rem] py-[1.4rem]">
          <InfoItem
            label="원본"
            value={likeProduct.originalProvided}
            booleanText={{ true: '전체 제공', false: '미제공' }}
          />
          <InfoItem label="시간" value={likeProduct.shootingHours} unit="시간" />
          <InfoItem label="장소" value={likeProduct.shootingLocationCount} unit="곳" />
          <InfoItem label="의상" value={likeProduct.costumeCount} unit="벌" />
          <InfoItem label="보정본" value={likeProduct.retouchedCount} unit="장" />
        </div>
      </div>
      <div className="h-[1.1rem]"></div>
      <div className="flex h-[6.1rem] flex-col gap-[0.9rem]" onClick={handlePageProductClick}>
        <div className="flex h-auto justify-between text-body2Normal font-bold">
          <div className="flex items-center text-gray-90">
            <span>{likeProduct.studioName}</span>
            <Icon_ChevronDown width={16} height={16} className="rotate-[270deg]" />
          </div>
          <div className="flex w-[11.2rem] items-center justify-end gap-[0.8rem]">
            <div className="text-red-40">{likeProduct.discountRate}%</div>
            <div className="text-common-100">{likeProduct.price.toLocaleString()}원</div>
          </div>
        </div>
        <div className="text-body3Normal font-medium tracking-[-0.04em] text-gray-80">{likeProduct.optionName}</div>
        {/* 날짜 옵션 */}
        <div className="flex items-center gap-[0.5rem]">
          <Icon_Calendar width={14} height={14} />
          <div className="flex items-center gap-[0.6rem]">
            {(likeProduct.shootingSeason as ShootingPeriod[]).map((season, index) => (
              <span
                key={index}
                className="border-r border-gray-50 pr-[0.6rem] text-label2 font-medium text-gray-80 last:border-r-0 last:pr-0"
              >
                {SHOOTING_PERIOD_DISPLAY_MAP[season]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
