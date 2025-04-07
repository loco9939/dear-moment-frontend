'use client';

import { PACKAGE_DISPLAY_MAP } from '@/(home)/models/FilteringModel';
import { PackageType } from '@/(home)/type';
import { Product, ProductOption } from '@/api/products/types';
import { useRef, useState } from 'react';
import { ProductOptionCard } from './ProductOptionCard';

interface ProductTabsProps {
  productOptions: ProductOption[];
  product: Product | null;
}

export default function ProductTabs({ productOptions, product }: ProductTabsProps) {
  // 활성화된 탭을 관리하는 상태
  const [activeTab, setActiveTab] = useState<'products' | 'guidelines'>('products');

  // 각 섹션에 대한 ref 생성
  const productsRef = useRef<HTMLDivElement>(null);
  const guidelinesRef = useRef<HTMLDivElement>(null);

  // 탭 높이(3.7rem = 59.2px) + 추가 여백(10px)을 고려한 스크롤 오프셋
  const scrollOffset = -36;

  const studio = product?.studio;

  // 탭 클릭 핸들러
  const handleTabClick = (tab: 'products' | 'guidelines') => {
    setActiveTab(tab);

    // 해당 섹션으로 스크롤 시 탭 높이만큼 추가 오프셋 적용
    if (tab === 'products' && productsRef.current) {
      const elementPosition = productsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition + scrollOffset,
        behavior: 'smooth',
      });
    } else if (tab === 'guidelines' && guidelinesRef.current) {
      const elementPosition = guidelinesRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition + scrollOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mt-[4.5rem]">
      <div className="w-full h-[3.7rem] sticky top-[-1px] z-10 flex border-b border-gray-20 bg-common-0 p-0">
        <div className={`flex-1 h-full text-center`}>
          <button
            className={`h-full w-[11rem] text-body2Normal font-semibold ${
              activeTab === 'products' ? 'text-gray-90 border-b-2 border-gray-90' : 'text-gray-50'
            }`}
            onClick={() => handleTabClick('products')}
          >
            상품정보
          </button>
        </div>
        <div className={`flex-1 h-full text-center`}>
          <button
            className={`h-full w-[11rem]  text-body2Normal font-semibold ${
              activeTab === 'guidelines' ? 'text-gray-90 border-b-2 border-gray-90' : 'text-gray-50'
            }`}
            onClick={() => handleTabClick('guidelines')}
          >
            안내사항
          </button>
        </div>
      </div>

      <div ref={productsRef} className="my-[5.2rem] px-[2rem]">
        <p className="text-subtitle1 font-bold keep-all text-gray-95 mb-[3.7rem]">
          {studio?.name}만의 특별한 <br />
          스냅 상품 정보
        </p>
        <ul className="space-y-[3rem]">
          {productOptions.map((productOption, index) => (
            <ProductOptionCard key={index} productOption={productOption} productId={String(product?.productId)} />
          ))}
        </ul>
      </div>

      <div ref={guidelinesRef} className="my-6 px-[2rem]">
        <p className="text-subtitle1 font-bold text-gray-95">스냅 안내사항</p>
        <div className="text-label1Reading font-semibold text-gray-70 my-[4rem]">
          <p>모든 안내사항은 필독 부탁드립니다.</p>
          <p>안내사항을 읽지 않아 생기는 불이익에 관해서는 책임지지 않습니다.</p>
        </div>
        <div className="">
          <p className="text-body2Normal font-semibold text-gray-95">제휴샵 안내</p>
          <ul className="list-disc list-inside my-[3rem]">
            {studio?.partnerShops?.map((partnerShop, index) => (
              <li key={index}>
                {PACKAGE_DISPLAY_MAP[partnerShop.category as PackageType]}: {partnerShop.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <p className="text-body2Normal font-semibold text-gray-95">필독 안내사항</p>
          <ul className="list-disc list-inside my-[3rem]">
            <li>{studio?.reservationNotice}</li>
          </ul>
        </div>
        <div className="">
          <p className="text-body2Normal font-semibold text-gray-95">취소 및 환불 규정</p>
          <ul className="list-disc list-inside my-[3rem]">
            <li>{studio?.cancellationPolicy}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
