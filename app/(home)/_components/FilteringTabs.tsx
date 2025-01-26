"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { FilterType } from "../type";

export default function FilteringTabs({
  filterType,
}: {
  filterType: FilterType;
}) {
  // 탭 변경 시 해당 섹션으로 스크롤
  const handleTabChange = (value: string) => {
    const element = document.getElementById(value);
    if (element) {
      // 스크롤 컨테이너를 찾아서 스크롤
      const scrollContainer = element.closest(".overflow-y-auto");
      if (scrollContainer) {
        const topOffset = element.offsetTop;
        scrollContainer.scrollTo({
          top: topOffset - 60, // 헤더 높이를 고려한 오프셋
          behavior: "smooth",
        });
      }
    }
  };

  // 초기 렌더링 시 선택된 탭으로 스크롤 이동
  useEffect(() => {
    handleTabChange(filterType);
  }, []);

  return (
    <Tabs
      defaultValue={filterType}
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full sticky top-[-1px] bg-gray-700 z-10 rounded-none">
        <TabsTrigger value="정렬">정렬</TabsTrigger>
        <TabsTrigger value="촬영시기">촬영시기</TabsTrigger>
        <TabsTrigger value="스타일">스타일</TabsTrigger>
        <TabsTrigger value="패키지">패키지</TabsTrigger>
        <TabsTrigger value="가격">가격</TabsTrigger>
      </TabsList>
      <div className="mt-4 space-y-6">
        <section id="정렬">
          <h2 className="text-lg font-semibold mb-3">정렬</h2>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">최신순</Button>
            <Button variant="outline">인기순</Button>
            <Button variant="outline">좋아요순</Button>
          </div>
        </section>
        <section id="촬영시기">
          <h2 className="text-lg font-semibold mb-3">촬영시기</h2>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">2025년 상반기</Button>
            <Button variant="outline">2025년 하반기</Button>
            <Button variant="outline">2026년 상반기</Button>
          </div>
        </section>
        <section id="스타일">
          <h2 className="text-lg font-semibold mb-3">스타일</h2>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">빈티지한</Button>
            <Button variant="outline">우아한</Button>
            <Button variant="outline">따뜻한</Button>
          </div>
        </section>
        <section id="패키지">
          <h2 className="text-lg font-semibold mb-3">패키지</h2>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">있음</Button>
            <Button variant="outline">없음</Button>
          </div>
        </section>
        <section id="가격">
          <h2 className="text-lg font-semibold mb-3">가격</h2>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">20만원 이하</Button>
            <Button variant="outline">20~40만원대</Button>
            <Button variant="outline">40~60만원대</Button>
            <Button variant="outline">60~80만원대</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
            <Button variant="outline">80만원 이상</Button>
          </div>
        </section>
        <div className="flex justify-end gap-2">
          <Button variant="outline" className="flex-2">
            초기화
          </Button>
          <Button variant="outline" className="flex-1">
            적용
          </Button>
        </div>
      </div>
    </Tabs>
  );
}
