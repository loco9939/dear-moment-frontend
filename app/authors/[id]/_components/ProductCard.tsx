'use client';

import { Icon_ChevronDown, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { Product } from '@/mock/authorData';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  authorId?: string;
}

export const ProductCard = ({ product, authorId }: ProductCardProps) => {
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);

  const displayContent: Record<string, string> = {
    원본제공: '원본제공',
    시간: '시간',
    장소: '장소',
    의상: '의상',
    보정본: '보정본',
  };

  const hasDcPrice = product.dcPrice !== undefined;

  const handleDetailClick = () => {
    router.push(`/products/${authorId}/${product.id}`);
  };

  return (
    <li className="px-[2rem] py-[1.5rem] bg-gray-10">
      {/* 카드 헤더 */}
      <div className="flex justify-between items-start mb-[1.6rem]">
        <div className="flex gap-[1rem] items-center">
          {/* <div className="w-[4rem] h-[4rem] rounded-full bg-gray-40" /> */}
          <div className="flex flex-col gap-[0.3rem]">
            <span className="text-subtitle2 font-bold text-gray-90">{product.name}</span>
            {hasDcPrice ? (
              <div>
                <p className="text-body2Normal font-bold text-gray-60 line-through my-[0.6rem]">
                  {product.price.toLocaleString()}원
                </p>
                <div className="text-subtitle2 font-bold">
                  <span className="text-red-40">45%</span>
                  <span className="text-gray-80 ml-[0.3rem]">{product.dcPrice?.toLocaleString()}원</span>
                </div>
              </div>
            ) : (
              <span className="text-subtitle2 font-bold text-gray-80">{product.price.toLocaleString()}원</span>
            )}
          </div>
        </div>
        <button type="button" onClick={() => setIsLike(!isLike)} className="">
          {isLike ? <Icon_Heart_Filled /> : <Icon_Heart />}
        </button>
      </div>

      {/* 카드 컨텐츠 */}
      <div className="border-t border-b border-gray-20 py-[2.6rem] space-y-[1.6rem]">
        {Object.entries(product.details).map(([key, value]) => {
          return (
            <div key={key} className="flex justify-between">
              <span className="text-body3Normal font-semibold text-gray-60">{displayContent[key]}</span>
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
