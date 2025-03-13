"use client";

import { Badge } from "@/components/ui/badge";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { useAuthorCardController } from "../controllers/AuthorCardController";

export default function AuthorCard() {
  const { isLiked, onClickHeart } = useAuthorCardController();

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {/* 사진 갤러리 레이아웃 */}
      <div className="flex gap-2 h-[204px] relative">
        <HeartIcon
          className={`w-6 h-6 absolute top-2 right-2 z-10 cursor-pointer ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
          onClick={onClickHeart}
        />
        {/* 왼쪽 큰 이미지 */}
        <div className="relative flex-[2] overflow-hidden rounded-lg">
          <Image
            src="/author_thumb.png"
            alt="메인 웨딩 사진"
            fill
            className="object-cover"
          />
        </div>

        {/* 오른쪽 작은 이미지들 */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="relative flex-1 overflow-hidden rounded-lg">
            <Image
              src="/author_thumb.png"
              alt="웨딩 사진 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative flex-1 overflow-hidden rounded-lg">
            <Image
              src="/author_thumb.png"
              alt="웨딩 사진 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* 하단 텍스트 정보 */}
      <div className="mt-4">
        <div className="flex justify-between gap-2">
          <h3 className="text-lg font-bold text-black">글린트그라피</h3>
          <p className="text-lg font-semibold text-black">500,000원~</p>
        </div>
        <div className="flex gap-2 text-sm text-black mt-2">
          <Badge className="bg-gray-400">우이동</Badge>
          <Badge className="bg-gray-400">빈티지풍</Badge>
          <Badge className="bg-gray-400">25년 이상</Badge>
        </div>
      </div>
    </div>
  );
}
