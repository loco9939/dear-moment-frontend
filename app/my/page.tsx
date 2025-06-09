'use client';

import { NavigationBar } from '@/components/NavigationBar';
import Link from 'next/link';
import { getMyInfo, userInfo } from './_services/my';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const [myInfo, setMyInfo] = useState<userInfo | null>(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const { data } = await getMyInfo();
        setMyInfo(data);
      } catch (error) {
        throw new Error(`내 정보 조회 실패 : ${error}`);
      }
    };

    fetchMyInfo();
  }, []);

  return (
    <div className="container flex min-h-[100dvh] flex-col">
      <header className="space-y-[4rem] bg-red-20 px-[1.8rem] py-[1.6rem]">
        <p className="text-title2 font-bold text-gray-90">MY PAGE</p>
        <p className="pb-[1.6rem] text-title1 font-bold text-common-100">{myInfo?.name}</p>
      </header>

      <main className="flex-1 space-y-[4rem] px-[2rem] py-[2.8rem]">
        <div>
          <p className="border-b-[0.2rem] border-gray-95 pb-[1rem] text-body1Normal font-semibold text-gray-95">
            나의 문의정보
          </p>
          <Link href="/my/inquiry">
            <p className="mt-[1.2rem] border-b border-gray-20 py-[1.5rem] text-body2Normal font-medium text-gray-90">
              나의 문의내역
            </p>
          </Link>
          <Link href="/my/quit">
            <p className="py-[1.5rem] text-body2Normal font-medium text-gray-90">탈퇴하기</p>
          </Link>
        </div>
        <div>
          <p className="border-b-[0.2rem] border-gray-95 pb-[1rem] text-body1Normal font-semibold text-gray-95">
            고객센터
          </p>
          <Link href="/my/report-author-error">
            <p className="mt-[1.2rem] border-b border-gray-20 py-[1.5rem] text-body2Normal font-medium text-gray-90">
              작가 정보 오류 제보
            </p>
          </Link>
          <Link href="/my/feedback">
            <p className="py-[1.5rem] text-body2Normal font-medium text-gray-90">고객의 소리</p>
          </Link>
        </div>
        <div>
          <p className="border-b-[0.2rem] border-gray-95 pb-[1rem] text-body1Normal font-semibold text-gray-95">
            From. Dear Moment
          </p>
          <Link href="#">
            <p className="mt-[1.2rem] border-b border-gray-20 py-[1.5rem] text-body2Normal font-medium text-gray-90">
              공지사항
            </p>
          </Link>
          <Link href="#">
            <p className="py-[1.5rem] text-body2Normal font-medium text-gray-90">디어모먼트 소개</p>
          </Link>
        </div>
      </main>

      <NavigationBar />
    </div>
  );
}
