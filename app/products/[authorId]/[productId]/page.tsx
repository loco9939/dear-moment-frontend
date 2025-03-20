'use client';

import { Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { AuthorDetail, mockAuthorsData, Product } from '@/mock/authorData';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const [author, setAuthor] = useState<AuthorDetail | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // 상품 정보를 가져오는 함수
    const fetchProductData = async () => {
      try {
        // 실제 API 연동 시 아래 주석을 해제하고 사용
        // const response = await fetch(`/api/authors/${params.id}/products/${params.productId}`);
        // const data = await response.json();

        // 현재는 목업 데이터 사용
        const mockAuthor = mockAuthorsData?.find(author => author.id === params.authorId);

        const mockProduct = mockAuthorsData
          ?.find(author => author.id === params.authorId)
          ?.products.find(product => product.id === params.productId);

        if (mockProduct) {
          setProduct(mockProduct);
        }
        if (mockAuthor) {
          setAuthor(mockAuthor);
        }
      } catch (error) {
        console.error('상품 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [params.id, params.productId]);

  if (isLoading) return <div className="p-[2rem]">로딩 중...</div>;
  if (!product) return <div className="p-[2rem]">상품을 찾을 수 없습니다.</div>;

  const displayContent: Record<string, string> = {
    원본제공: '원본제공',
    시간: '시간',
    장소: '장소',
    의상: '의상',
    보정본: '보정본',
  };

  return (
    <div className="relative w-full max-w-screen-md mx-auto text-gray-90 pb-[7.6rem]">
      {/* 분홍 배경색 */}
      <div className="absolute -top-[8.2rem] left-0 w-full h-[24.6rem] bg-red-10 -z-10" />
      {/* 상품 헤더 */}
      <div className="flex flex-col items-center mt-[2.8rem]">
        <div className="w-[5.7rem] h-[5.7rem] bg-gray-40 rounded-full" />
        <span className="text-body1Normal font-semibold mt-[1rem] mb-[2.2rem]">{author?.name}</span>
        <span className="text-subtitle1 font-bold text-gray-95">{product.name}</span>
      </div>

      {/* 상품 상세 정보 */}
      <div className="mt-[7.2rem] px-[2rem]">
        <div>
          <span className="text-subtitle1 font-bold text-gray-95">상품 정보</span>
          <div className="space-y-[1.6rem] mt-[4rem]">
            {Object.entries(product.details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-body3Normal font-semibold text-gray-60">{displayContent[key]}</span>
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
            이 패키지는 웨딩 촬영의 모든 필수 요소를 포함하고 있습니다. 전문 웨딩 포토그래퍼가 신랑 신부님의 특별한
            순간을 아름답게 담아드립니다. 모든 원본 사진을 제공해 드리며, 엄선된 사진에 대한 고급 리터칭을 포함합니다.
          </p>
        </div>
      </div>

      {/* 문의하기 버튼 컨테이너 스타일 수정 */}
      <div className="container fixed bottom-0 left-0 right-0 px-[2rem] py-[1rem] bg-white">
        <div className="max-w-screen-md mx-auto flex gap-[1rem] justify-between items-center">
          <button
            className="w-[6.8rem] h-[5.6rem] flex justify-center items-center bg-red-0 border border-red-40 rounded-[0.4rem]"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button className="w-[24.2rem] h-[5.6rem] text-body1Normal font-semibold text-gray-10 bg-red-40 rounded-[0.4rem]">
            바로 문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
