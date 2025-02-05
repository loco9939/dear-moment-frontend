/* eslint-disable @next/next/no-img-element */
"use client";

import { AuthorDetail, mockAuthorData } from "@/mock/authorData";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AuthorTabs from "./_components/AuthorTabs";

export default function AuthorDetailPage() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [author, setAuthor] = useState<AuthorDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 작가 정보를 가져오는 API 호출
    const fetchAuthorData = async () => {
      try {
        // TODO: API 엔드포인트를 실제 서버 주소로 변경해야 함
        // const response = await fetch(`/api/authors/${params.id}`);
        // const data = await response.json();
        const data = mockAuthorData;
        setAuthor(data);
      } catch (error) {
        console.error("작가 정보를 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthorData();
  }, [params.id]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!author) return <div>작가를 찾을 수 없습니다.</div>;

  return (
    <div className="w-full max-w-screen-md mx-auto">
      {/* 대표 이미지 */}
      <div className="relative w-full h-[400px]">
        <img
          src={author.profileImage}
          alt="대표 이미지"
          className="w-full h-full object-cover"
        />
        {/* 뒤로가기 버튼 */}
        <button className="absolute top-4 left-4 bg-black/80 p-2 rounded-full">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 작가 정보 섹션 */}
      <div className="px-4 py-6">
        {/* 작가명과 필터 태그 */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">{author.name}</h1>
          <div className="flex gap-2">
            {Object.entries(author.filters).map(([type, value]) => {
              if (Array.isArray(value)) {
                return (
                  <div className="flex gap-2" key={type}>
                    {value.map((v) => (
                      <span
                        key={v}
                        className="px-3 py-1 bg-gray-100 text-sm rounded-full text-black"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                );
              }
              return (
                <span
                  key={type}
                  className="px-3 py-1 bg-gray-100 text-sm rounded-full text-black"
                >
                  {value}
                </span>
              );
            })}
          </div>
        </div>

        {/* 작가 소개 */}
        <p className="text-white mb-8">{author.introduction}</p>

        <AuthorTabs products={author.products} guidelines={author.guidelines} />

        {/* 문의하기 버튼 */}
        <div className="flex gap-2 items-center">
          <button
            className="bg-gray-700 p-3 rounded-lg"
            onClick={() => setIsLiked(!isLiked)}
          >
            <HeartIcon
              className="w-6 h-6"
              fill={isLiked ? "currentColor" : "none"}
            />
          </button>
          <button className="flex-1 bg-gray-700 p-3 rounded-lg">
            문의하기
          </button>
        </div>
      </div>
    </div>
  );
}
