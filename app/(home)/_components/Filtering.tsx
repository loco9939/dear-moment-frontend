"use client";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { FilterType, FilterValue } from "../type";
import FilteringModal from "./FilteringModal";

export default function Filtering() {
  // 모달 열림/닫힘 상태 관리
  const [open, setOpen] = useState(false);
  // 현재 선택된 필터 타입 관리
  const [filterType, setFilterType] = useState<FilterType>("정렬");
  // 각 섹션별 선택된 필터 상태 관리
  const [selectedFilters, setSelectedFilters] = useState<
    Record<FilterType, FilterValue>
  >({
    정렬: "",
    촬영시기: "",
    스타일: [],
    패키지: "",
    가격: 0,
  });

  // 필터 버튼 클릭 핸들러
  const handleFilterClick = (type: FilterType) => {
    setFilterType(type);
    setOpen(true);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("정렬")}
        >
          정렬
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("촬영시기")}
        >
          촬영시기
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("스타일")}
        >
          스타일
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("패키지")}
        >
          패키지
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
        <Button
          className="bg-gray-500"
          onClick={() => handleFilterClick("가격")}
        >
          가격
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </div>
      <FilteringModal
        open={open}
        onOpenChange={setOpen}
        filterType={filterType}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </>
  );
}
