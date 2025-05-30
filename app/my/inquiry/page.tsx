/* eslint-disable @next/next/no-img-element */
'use client';

import { deleteInquiryOption, fetchInquiryList } from '@/api/inquiry';
import { InquiryItem } from '@/api/inquiry/types';
import { Icon_ChevronDown } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyInquiryPage() {
  const [inquiryList, setInquiryList] = useState<InquiryItem[]>([]);

  useEffect(() => {
    const getInquiryList = async () => {
      try {
        const response = await fetchInquiryList();
        if (response.success && response.data) {
          setInquiryList(response.data.content);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getInquiryList();
  }, []);

  const handleDelete = async ({ inquiryId, productId }: { inquiryId: number; productId: number }) => {
    try {
      await deleteInquiryOption({ inquiryId, productId });
      alert('삭제되었습니다.');
      setInquiryList(prev => prev.filter(item => item.inquiryId !== inquiryId));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container flex min-h-[100dvh] flex-col">
      <Appbar
        leftIcon={
          <Link href="/my">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="나의 문의내역"
      />
      <main className="flex-1 px-[2rem] py-[2.8rem]">
        <ul className="mt-[4.2rem] space-y-[1.6rem]">
          {inquiryList.map((item, index) => (
            <li key={index} className="border-b border-gray-200 pb-[2rem]">
              <div className="mb-[0.6rem] flex items-center justify-between">
                <span className="font-regular text-body3Normal text-gray-60">{item.createdDate.slice(0, 10)}</span>
                <button
                  onClick={() => handleDelete({ inquiryId: item.inquiryId, productId: item.productId })}
                  className="rounded-[0.2rem] border border-gray-300 px-[0.8rem] py-[0.45rem] text-label2 font-medium text-gray-60"
                >
                  삭제
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-[1.2rem] text-body1Normal font-bold text-gray-90">{item.studioName}</h3>
                  <p className="text-body2Normal font-medium text-gray-70">{item.optionName}</p>
                </div>
                <div className="relative h-[6rem] w-[6rem] bg-gray-200">
                  {/* 이미지가 실제로 있다면 아래 주석을 해제하고 사용하세요 */}
                  <img src={item.thumbnailUrl} alt={item.studioName} className="object-cover" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
