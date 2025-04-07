import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container bg-common-0 h-screen relative">
      <div className="space-y-[6rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="text-subtitle2 font-bold text-gray-90 text-center">
          <p>죄송합니다</p>
          <p>페이지를 찾을 수 없습니다</p>
        </div>
        {/* 박스 이미지 */}
        <Image src="/not_found.webp" alt="Not found" width={159} height={103} className="mx-auto" />
        <Link
          href="/"
          className="block whitespace-nowrap rounded-[0.2rem] bg-common-100 text-body1Normal font-semibold text-gray-10 px-[5.5rem] py-[1.6rem]"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
