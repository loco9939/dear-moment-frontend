"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dispatch, SetStateAction } from "react";
import { FilterType, FilterValue } from "../type";
import FilteringTabs from "./FilteringTabs";

interface FilteringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
}

export default function FilteringModal({
  open,
  onOpenChange,
  filterType,
  selectedFilters,
  setSelectedFilters,
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
          <FilteringTabs
            filterType={filterType}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onOpenChange={onOpenChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
