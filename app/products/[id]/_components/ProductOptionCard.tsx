'use client';

import { ProductOption } from '@/api/products/types';
import { Icon_ChevronDown, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { useRouter } from 'next/navigation';
import { useProductOptionController } from '../controllers/productOptionController';

interface ProductOptionCardProps {
  productOption: ProductOption;
  productId?: string;
}

export const ProductOptionCard = ({ productOption, productId }: ProductOptionCardProps) => {
  const router = useRouter();
  const { isLiked, onClickHeart } = useProductOptionController({ productOption });

  const productDetailsEntry = {
    시간: `${productOption.shootingHours}시간 ${productOption.shootingMinutes}분`,
    장소: `${productOption.shootingLocationCount}곳`,
    의상: `최대 ${productOption.costumeCount}벌`,
    보정본: `${productOption.retouchedCount}장`,
  };

  const discountRate = productOption.discountPrice
    ? ((productOption.originalPrice - productOption.discountPrice) / productOption.originalPrice) * 100
    : 0;

  const handleDetailClick = () => {
    router.push(`/options/${productId}/${productOption.optionId}`);
  };

  return (
    <li className="px-[2rem] py-[1.5rem] bg-gray-10">
      {/* 카드 헤더 */}
      <div className="flex justify-between items-start mb-[1.6rem]">
        <div className="flex gap-[1rem] items-center">
          <div className="flex flex-col gap-[0.3rem]">
            <span className="text-subtitle2 font-bold text-gray-90">{productOption.name}</span>
            {productOption.discountPrice ? (
              <div>
                <p className="text-body2Normal font-bold text-gray-60 line-through my-[0.6rem]">
                  {productOption.originalPrice.toLocaleString()}원
                </p>
                <div className="text-subtitle2 font-bold">
                  <span className="text-red-40">{discountRate}%</span>
                  <span className="text-gray-80 ml-[0.3rem]">{productOption.discountPrice?.toLocaleString()}원</span>
                </div>
              </div>
            ) : (
              <span className="text-subtitle2 font-bold text-gray-80">
                {productOption.originalPrice.toLocaleString()}원
              </span>
            )}
          </div>
        </div>
        <button type="button" onClick={onClickHeart} className="">
          {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
        </button>
      </div>

      {/* 카드 컨텐츠 */}
      <div className="border-t border-b border-gray-20 py-[2.6rem] space-y-[1.6rem]">
        {Object.entries(productDetailsEntry).map(([key, value]) => {
          return (
            <div key={key} className="flex justify-between">
              <span className="text-body3Normal font-semibold text-gray-60">{key}</span>
              <span className="text-body3Normal font-semibold text-gray-80">{value}</span>
            </div>
          );
        })}
      </div>

      {/* 자세히 보기 */}
      <button className="w-full flex justify-center items-center gap-[0.6rem] mt-[1.6rem]" onClick={handleDetailClick}>
        <span className="text-body2Normal font-semibold text-gray-60">자세히 보기</span>
        <Icon_ChevronDown className="-rotate-90 fill-gray-60" width={18} height={18} />
      </button>
    </li>
  );
};
