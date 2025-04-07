import { NavigationBar } from '@/components/NavigationBar';
import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="container min-h-screen flex flex-col">
      <header className="py-[1.6rem] px-[1.8rem] bg-red-20 space-y-[4rem]">
        <p className="text-title2 font-bold text-gray-90">MY PAGE</p>
        <p className="text-title1 font-bold text-common-100 pb-[1.6rem]">홍길동</p>
      </header>

      <main className="flex-1 px-[2rem] py-[2.8rem] space-y-[4rem]">
        <div>
          <p className="text-body1Normal font-semibold text-gray-95 pb-[1rem] border-b-[0.2rem] border-gray-95">
            나의 문의정보
          </p>
          <Link href="/my/inquiry">
            <p className="text-body2Normal font-medium text-gray-90 py-[1.5rem] mt-[1.2rem]">나의 문의내역</p>
          </Link>
        </div>
        <div>
          <p className="text-body1Normal font-semibold text-gray-95 pb-[1rem] border-b-[0.2rem] border-gray-95">
            고객센터
          </p>
          <Link href="/my/report-author-error">
            <p className="text-body2Normal font-medium text-gray-90 py-[1.5rem] mt-[1.2rem] border-b border-gray-20">
              작가 정보 오류 제보
            </p>
          </Link>
          <Link href="/my/feedback">
            <p className="text-body2Normal font-medium text-gray-90 py-[1.5rem]">고객의 소리</p>
          </Link>
        </div>
        <div>
          <p className="text-body1Normal font-semibold text-gray-95 pb-[1rem] border-b-[0.2rem] border-gray-95">
            From. Dear Moement
          </p>
          <Link href="#">
            <p className="text-body2Normal font-medium text-gray-90 py-[1.5rem] mt-[1.2rem] border-b border-gray-20">
              공지사항
            </p>
          </Link>
          <Link href="#">
            <p className="text-body2Normal font-medium text-gray-90 py-[1.5rem]">디어모먼트 소개</p>
          </Link>
        </div>
      </main>

      <NavigationBar />
    </div>
  );
}
