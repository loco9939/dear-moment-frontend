/* eslint-disable @next/next/no-img-element */
'use client';

import { Icon_Check, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { AuthorDetail, mockAuthorsData } from '@/mock/authorData';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthorTabs from './_components/AuthorTabs';
import { ImageViewerModal } from './_components/ImageViewerModal';
import { InquiryBottomSheet } from './_components/InquiryBottomSheet';

export default function AuthorDetailPage() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [author, setAuthor] = useState<AuthorDetail | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    // 작가 정보를 가져오는 API 호출
    const fetchAuthorData = async () => {
      try {
        // TODO: API 엔드포인트를 실제 서버 주소로 변경해야 함
        // const response = await fetch(`/api/authors/${params.id}`);
        // const data = await response.json();
        const data = mockAuthorsData.find(author => author.id === params.id);
        setAuthor(data);
      } catch (error) {
        console.error('작가 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthorData();
  }, [params.id]);

  const portfolioImages = author?.products.map(p => p.thumbnailUrl);

  if (isLoading) return <div>로딩 중...</div>;
  if (!author) return <div>작가를 찾을 수 없습니다.</div>;

  return (
    <div className="w-full max-w-screen-md mx-auto">
      {/* 대표 이미지 */}
      <div className="relative w-full h-[400px]">
        <img src={author.profileImage} alt="대표 이미지" className="w-full h-full object-cover" />
      </div>

      {/* 작가 정보 섹션 */}
      <div className="">
        {/* 작가정보 헤더 */}
        <div className="border-b border-gray-20 p-[2rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="w-[5.7rem] h-[5.7rem] rounded-full bg-gray-40" />
            <span className="text-gray-90 text-subtitle2 font-bold">{author.name}</span>
            <button className="ml-auto" onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart />}
            </button>
          </div>
          <p className="text-body2Reading font-bold mt-[1rem]">&ldquo;당신의 낮과 밤을 모두 사랑해&ldquo;</p>
          <div className="flex gap-[0.5rem] mt-[2rem]">
            <div className="text-gray-80 text-label2 font-semibold bg-red-20 px-[0.8rem] py-[0.45rem]">우아한</div>
            <div className="text-gray-80 text-label2 font-semibold bg-red-20 px-[0.8rem] py-[0.45rem]">빈티지한</div>
          </div>
        </div>

        {/* 작가 정보 컨텐츠 */}
        <div className="">
          {/* 작가 특징 */}
          <div className="mt-[2.8rem] px-[2rem]">
            <p className="text-gray-95 text-body2Normal font-semibold mb-[2rem]">{author.name}만의 차별화된 특징</p>
            <div className="space-y-[0.7rem]">
              <div className="flex gap-[0.8rem] items-center">
                <Icon_Check className="fill-gray-60" width={18} height={18} />
                <span>자체 스튜디오 보유</span>
              </div>
              <div className="flex gap-[0.8rem] items-center">
                <Icon_Check className="fill-gray-60" width={18} height={18} />
                <span>1인 작가</span>
              </div>
            </div>
          </div>

          {/* 작가 포트폴리오 */}
          <div className="mt-[3.5rem] px-[2rem]">
            <p className="text-gray-95 text-body2Normal font-semibold mb-[2rem]">{author.name}의 포트폴리오</p>
            <div className="flex gap-[0.2rem] flex-wrap">
              {portfolioImages?.map((imgSrc, index) => {
                if (index > 7) return;
                return (
                  <div key={index} className="relative cursor-pointer" onClick={() => setSelectedImageIndex(index)}>
                    <img src={imgSrc} alt="대표 이미지" className="object-cover w-[7.8rem] h-[7.8rem]" />
                    {index === 7 && (
                      <div className="absolute w-full h-full bg-gray-30 top-0 left-0 opacity-90 flex justify-center items-center">
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
        <AuthorTabs products={author.products} guidelines={author.guidelines} author={author} />

        {/* 문의하기 버튼 */}
        <div className="h-[5.6rem] mb-[1.2rem] flex gap-[1rem] justify-between items-center px-[2rem]">
          <button
            className="w-[6.8rem] h-full flex justify-center items-center bg-red-0 border border-red-40 rounded-[0.4rem] cursor-pointer"
            onClick={() => setIsLiked(!isLiked)}
          >
            {isLiked ? <Icon_Heart_Filled /> : <Icon_Heart className="stroke-red-40" />}
          </button>
          <button
            className="w-[24.2rem] h-full text-body1Normal font-semibold text-gray-10 bg-red-40 rounded-[0.4rem]"
            onClick={() => setOpenInquiry(true)}
          >
            문의하기
          </button>
        </div>
      </div>

      {/* 문의하기 Popup */}
      <InquiryBottomSheet open={openInquiry} onOpenChange={setOpenInquiry} isLiked={isLiked} setIsLiked={setIsLiked} />

      {/* 이미지 뷰어 모달 */}
      <ImageViewerModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={portfolioImages ?? []}
        initialImageIndex={selectedImageIndex || 0}
      />
    </div>
  );
}
