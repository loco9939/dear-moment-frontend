import { Icon_Heart_Filled, Icon_Calendar } from '@/assets/icons';
import Image from 'next/image';

export default function ProductCard() {
  return (
    <div className="w-[32rem] h-[25.6rem] m-[2rem]">
      {/* 사진 */}
      <div className="h-[18.4rem] flex">
        <div className="w-[15.5rem] bg-gray-10 relative">
          <Image src="/author_thumb.png" alt="메인 웨딩 사진" fill className="object-cover" />
          <Icon_Heart_Filled className="cursor-pointer absolute top-[15.25rem] left-[12.5rem]" />
        </div>
        <div className="w-[1rem]"></div>
        <div className="w-[15.5rem] bg-gray-10 py-[1.4rem] px-[1rem] flex flex-col justify-between">
          <div className="w-[13.5rem] h-[1.8rem] flex justify-between py-3 flex-1">
            <span className="font-semibold text-body3Normal">원본</span>
            <span className="font-regular text-body3Normal">전체 제공</span>
          </div>
          <div className="w-[13.5rem] h-[1.8rem] flex justify-between py-3 flex-1">
            <span className="font-semibold text-body3Normal">시간</span>
            <span className="font-regular text-body3Normal">3시간</span>
          </div>
          <div className="w-[13.5rem] h-[1.8rem] flex justify-between py-3 flex-1">
            <span className="font-semibold text-body3Normal">장소</span>
            <span className="font-regular text-body3Normal">2곳</span>
          </div>
          <div className="w-[13.5rem] h-[1.8rem] flex justify-between py-3 flex-1">
            <span className="font-semibold text-body3Normal">의상</span>
            <span className="font-regular text-body3Normal">최대 2벌</span>
          </div>
          <div className="w-[13.5rem] h-[1.8rem] flex justify-between py-3 flex-1">
            <span className="font-semibold text-body3Normal">보정본</span>
            <span className="font-regular text-body3Normal">30장</span>
          </div>
        </div>
      </div>
      <div className="h-[1.1rem]"></div>
      <div className="w-[32rem] h-[6.1rem] flex flex-col gap-[0.9rem]">
        <div className="h-auto flex justify-between font-bold text-body2Normal">
          <div className="text-gray-90">오에브</div>
          <div className="w-[11.2rem] flex justify-end gap-[0.8rem]">
            <div className="text-red-40">43%</div>
            <div className="text-common-100">850,000원</div>
          </div>
        </div>
        <div className=" text-gray-80 text-body3Normal">Basic</div>
        {/* 날짜 옵션 */}
        <div className=" flex gap-[0.5rem] items-center">
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
