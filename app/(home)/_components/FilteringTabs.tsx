"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { useFilteringTabsController } from "../controllers/FilteringTabsController";
import { PRICE_RANGE_MAP } from "../models/FilteringModel";
import { FilterType, FilterValue } from "../type";

interface FilteringTabsProps {
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
  onOpenChange: (open: boolean) => void;
}

export default function FilteringTabs({
  filterType,
  selectedFilters,
  setSelectedFilters,
  onOpenChange,
}: FilteringTabsProps) {
  const {
    tempFilters,
    handleFilterSelect,
    handleSliderChange,
    getCurrentPriceButton,
    handleReset,
    handleApply,
    handleTabChange,
  } = useFilteringTabsController({
    filterType,
    selectedFilters,
    setSelectedFilters,
    onOpenChange,
  });

  return (
    <Tabs
      defaultValue={filterType}
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full sticky top-[-1px] bg-gray-700 z-10 rounded-none">
        {Object.keys(tempFilters).map((value) => (
          <TabsTrigger key={value} value={value}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4 space-y-12">
        <section id="정렬">
          <h2 className="text-lg font-semibold mb-3">정렬</h2>
          <div className="flex gap-2 flex-wrap">
            {["최신순", "인기순", "좋아요순"].map((value) => (
              <Button
                key={value}
                variant="outline"
                className={
                  tempFilters.정렬 === value
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
                onClick={() => handleFilterSelect("정렬", value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </section>
        <section id="촬영시기">
          <h2 className="text-lg font-semibold mb-3">촬영시기</h2>
          <div className="flex gap-2 flex-wrap">
            {["2025년 상반기", "2025년 하반기", "2026년 상반기"].map(
              (value) => (
                <Button
                  key={value}
                  variant="outline"
                  className={
                    tempFilters.촬영시기 === value
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                  onClick={() => handleFilterSelect("촬영시기", value)}
                >
                  {value}
                </Button>
              )
            )}
          </div>
        </section>
        <section id="스타일">
          <h2 className="text-lg font-semibold mb-3">스타일</h2>
          <div className="flex gap-2 flex-wrap">
            {["빈티지한", "우아한", "따뜻한", "모던한", "클래식한"].map(
              (value) => (
                <Button
                  key={value}
                  variant="outline"
                  className={
                    Array.isArray(tempFilters.스타일) &&
                    tempFilters.스타일.includes(value)
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                  onClick={() => handleFilterSelect("스타일", value)}
                >
                  {value}
                </Button>
              )
            )}
          </div>
        </section>
        <section id="패키지">
          <h2 className="text-lg font-semibold mb-3">패키지</h2>
          <div className="flex gap-2 flex-wrap">
            {["있음", "없음"].map((value) => (
              <Button
                key={value}
                variant="outline"
                className={
                  tempFilters.패키지 === value
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
                onClick={() => handleFilterSelect("패키지", value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </section>
        <section id="가격">
          <h2 className="text-lg font-semibold mb-3">가격</h2>
          <div className="space-y-6 mb-8">
            <div className="flex gap-2 flex-wrap">
              {Object.keys(PRICE_RANGE_MAP).map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  className={
                    getCurrentPriceButton(tempFilters.가격 as number) === value
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                  onClick={() => handleFilterSelect("가격", value)}
                >
                  {value}
                </Button>
              ))}
            </div>
            <div className="relative pt-6">
              <div className="absolute -top-3 left-0 text-sm">0 만원</div>
              <div className="absolute -top-3 right-0 text-sm">100 만원+</div>
              <Slider
                defaultValue={[0]}
                max={100}
                step={1}
                value={[tempFilters.가격 as number]}
                onValueChange={handleSliderChange}
              />
            </div>
          </div>
        </section>
        <div className="flex justify-end gap-2 absolute bottom-0 right-0 w-full p-6">
          <Button
            variant="outline"
            className="flex-2 h-[36px]"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-[36px]"
            onClick={handleApply}
          >
            적용
          </Button>
        </div>
      </div>
    </Tabs>
  );
}
