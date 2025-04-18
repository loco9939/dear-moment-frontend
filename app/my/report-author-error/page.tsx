'use client';

import { fetchInquiryStudios } from '@/api/inquiry';
import { InquiryStudio } from '@/api/inquiry/types';
import { Icon_ChevronDown, Icon_Write } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyReportAuthorErrorPage() {
  const [inquiryStudios, setInquiryStudios] = useState<InquiryStudio[]>([]);

  useEffect(() => {
    const getInquiryStudios = async () => {
      try {
        const response = await fetchInquiryStudios();
        if (response.success && response.data) {
          setInquiryStudios(response.data.content);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getInquiryStudios();
  }, []);

  // 펼쳐진 항목 ID를 관리하는 상태
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  // 항목 펼침/닫힘 토글 함수
  const toggleExpand = (id: number) => {
    setExpandedIds(prevIds => (prevIds.includes(id) ? prevIds.filter(itemId => itemId !== id) : [...prevIds, id]));
  };

  // 항목이 펼쳐져 있는지 확인하는 함수
  const isExpanded = (id: number) => expandedIds.includes(id);

  return (
    <div className="container min-h-[100dvh] flex flex-col">
      <Appbar
        leftIcon={
          <Link href="/my">
            <Icon_ChevronDown className="rotate-90 cursor-pointer" />
          </Link>
        }
        title="작가 정보 오류 제보 내역"
        rightIcon={
          <Link href="/my/report-author-error/edit">
            <Icon_Write className="cursor-pointer" />
          </Link>
        }
      />
      <main className="flex-1 px-[2rem]">
        <ul className="space-y-[4rem] mt-[4.2rem]">
          {inquiryStudios.map(studio => (
            <li key={studio.inquiryId} className="border-b border-gray-200 pb-[2rem]">
              <div className="flex justify-between items-center mb-[2.4rem]">
                <span className="text-body3Normal font-regular text-gray-60">{studio.createdDate.slice(0, 10)}</span>
                {/* TODO: 답변완료 상태값 추적 */}
                <span className="text-label1Normal font-medium text-red-40">답변완료</span>
              </div>

              <h3 className="text-body2Normal font-bold text-gray-90 mb-[1.5rem]">{studio.title}</h3>

              <details
                className="group transition-all duration-300 ease-in-out"
                open={isExpanded(studio.inquiryId)}
                onClick={e => {
                  e.preventDefault();
                  toggleExpand(studio.inquiryId);
                }}
              >
                <summary className="list-none cursor-pointer flex items-start justify-between">
                  <p
                    className={`text-body3Reading font-regular text-gray-70 overflow-hidden text-ellipsis mr-[1.5rem] flex-1 pt-[0.2rem] ${
                      isExpanded(studio.inquiryId) ? 'whitespace-pre-line' : 'whitespace-nowrap'
                    }`}
                  >
                    {studio.content}
                  </p>
                  <Icon_ChevronDown
                    className={`w-[1.8rem] h-[1.8rem] transition-transform duration-300 ease-in-out ${
                      isExpanded(studio.inquiryId) ? 'rotate-180' : ''
                    }`}
                  />
                </summary>
              </details>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
