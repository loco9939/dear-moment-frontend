'use client';

import { Icon_Calendar, Icon_Cancel_Circle_Filled, Icon_Heart, Icon_Heart_Filled } from '@/assets/icons';
import { AuthorDetail } from '@/mock/authorData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthorCardController } from '../controllers/AuthorCardController';

export default function AuthorCard({ author, isFirst = false }: { author: AuthorDetail; isFirst?: boolean }) {
  const router = useRouter();
  const { isLiked, onClickHeart } = useAuthorCardController();
  const [showNotification, setShowNotification] = useState(false);

  // 첫번째 요소에만 Notification 띄우고 session 기간까지만 유지
  // 현재는 mockData 사용중이라 새로고침 시 깜빡이는 이슈 존재하지만 실 데이터 API 연동 시 데이터 바인딩 후 AuthorCard 렌더링 되므로 깜빡이는 이슈 해결
  useEffect(() => {
    if (isFirst) {
      const notificationState = sessionStorage.getItem('authorCardNotificationShown');
      setShowNotification(notificationState !== 'hidden');
    }
  }, [isFirst]);

  const closeNotification = () => {
    sessionStorage.setItem('authorCardNotificationShown', 'hidden');
    setShowNotification(false);
  };

  // 하트 아이콘 클릭 시 이벤트 버블링 방지
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClickHeart();
  };

  return (
    <div className="w-full bg-white rounded-lg cursor-pointer" onClick={() => router.push(`/authors/${author.id}`)}>
      {/* 사진 갤러리 레이아웃 */}
      <div className="flex gap-[0.2rem] h-[13.6rem] relative">
        <div className="text-label1Normal font-semibold text-common-0 bg-red-40 absolute top-0 left-0 z-10 px-[0.8rem] py-[0.55rem]">
          할인 프로모션
        </div>
        <div className="relative flex-[2] overflow-hidden ">
          <Image src="/author_thumb.png" alt="메인 웨딩 사진" fill className="object-cover" />
        </div>
        <div className="relative flex-[2] overflow-hidden ">
          <Image src="/author_thumb.png" alt="메인 웨딩 사진" fill className="object-cover" />
        </div>
        <div className="relative flex-[2] overflow-hidden ">
          <Image src="/author_thumb.png" alt="메인 웨딩 사진" fill className="object-cover" />
        </div>
      </div>

      {/* 하단 텍스트 정보 */}
      <div className="mt-[0.8rem]">
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-[1rem]">
            {/* 작가 프로필 이미지 */}
            {/* <div className="w-[2.4rem] h-[2.4rem] bg-gray-50 rounded-full" /> */}
            <h3 className="text-body2Normal font-semibold text-gray-90">{author.name}</h3>
          </div>

          {isLiked ? (
            <Icon_Heart_Filled className="cursor-pointer" onClick={handleHeartClick} />
          ) : (
            <Icon_Heart className="cursor-pointer" onClick={handleHeartClick} />
          )}
        </div>
        <div className="flex gap-[0.4rem] mt-[0.5rem]">
          <CategoryLabel label="우아한" />
          <CategoryLabel label="빈티지한" />
        </div>
        <div className="mt-[0.6rem] flex gap-[0.7rem]">
          <span className="text-body1Normal font-bold text-red-40">43%</span>
          <span className="text-body1Normal font-semibold text-gray-90">500,000원</span>
          <span className="text-body1Normal font-bold text-gray-90">~</span>
          <span className="text-body1Normal font-semibold text-gray-90">1,400,000원</span>
        </div>

        {/* 가격 툴팁 */}
        {isFirst && showNotification && <Notification closeNotification={closeNotification} />}

        {/* 날짜 옵션 */}
        <div className="flex gap-[0.5rem] mt-[0.6rem] items-center">
          <Icon_Calendar width={14} height={14} />
          <div className="flex gap-[0.6rem] items-center">
            <span className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]">
              25년 상반기
            </span>
            <span className="text-label2 font-medium text-gray-80 last:border-l last:border-gray-50 last:pl-[0.6rem]">
              25년 상반기
            </span>
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

const Notification = ({ closeNotification }: { closeNotification: () => void }) => {
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
