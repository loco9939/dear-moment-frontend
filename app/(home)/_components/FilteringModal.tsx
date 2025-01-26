"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterType } from "../type";
import FilteringTabs from "./FilteringTabs";

interface FilteringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterType: FilterType;
}

export default function FilteringModal({
  open,
  onOpenChange,
  filterType,
}: FilteringModalProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="container h-[80vh] rounded-lg border-none bg-gray-500"
      >
        <SheetHeader>
          <SheetTitle>필터</SheetTitle>
        </SheetHeader>
        {/* 스크롤 가능한 컨테이너 추가 */}
        <div className="overflow-y-auto h-[calc(80vh-80px)]">
          <FilteringTabs filterType={filterType} />
        </div>
        <div className="mt-4">
          {filterType === "정렬" && <div>{/* 정렬 옵션들 */}</div>}
          {filterType === "촬영시기" && <div>{/* 촬영시기 옵션들 */}</div>}
          {filterType === "스타일" && <div>{/* 스타일 옵션들 */}</div>}
          {filterType === "패키지" && <div>{/* 패키지 옵션들 */}</div>}
          {filterType === "가격" && <div>{/* 가격 옵션들 */}</div>}
        </div>
      </SheetContent>
    </Sheet>
  );
}
