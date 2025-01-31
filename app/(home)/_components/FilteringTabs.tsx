"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterType } from "../type";

export default function FilteringTabs({
  filterType,
  selectedFilters,
  setSelectedFilters,
  onOpenChange,
}: {
  filterType: FilterType;
  selectedFilters: Record<FilterType, string | number>;
  setSelectedFilters: Dispatch<
    SetStateAction<Record<FilterType, string | number>>
  >;
  onOpenChange: (open: boolean) => void;
}) {
  // 임시 필터 상태 관리
  const [tempFilters, setTempFilters] =
    useState<Record<FilterType, string | number>>(selectedFilters);

  // 가격 버튼별 범위 매핑
  const priceRangeMap = {
    "20만원 이하": [0, 20],
    "20~40만원대": [21, 40],
    "40~60만원대": [41, 60],
    "60~80만원대": [61, 80],
    "80만원 이상": [81, 100],
  };

  const handleApply = () => {
    setSelectedFilters(tempFilters);
    onOpenChange(false);
  };

  // 필터 선택 핸들러
  const handleFilterSelect = (section: FilterType, value: string) => {
    if (section === "가격") {
      const range = priceRangeMap[value as keyof typeof priceRangeMap];
      if (range) {
        setTempFilters((prev) => ({
          ...prev,
          가격: range[0], // 숫자 값 저장
        }));
      }
    } else {
      setTempFilters((prev) => ({
        ...prev,
        [section]: prev[section] === value ? "" : value,
      }));
    }
  };

  // 슬라이더 값 변경 핸들러
  const handleSliderChange = (value: number[]) => {
    setTempFilters((prev) => ({
      ...prev,
      가격: value[0], // 슬라이더 값을 직접 저장
    }));
  };

  // 현재 가격에 해당하는 버튼 범위 찾기
  const getCurrentPriceButton = (price: number) => {
    const selectedRange = Object.entries(priceRangeMap).find(([, range]) => {
      return price >= range[0] && price <= range[1];
    });
    return selectedRange ? selectedRange[0] : "";
  };

  // 초기화 핸들러
  const handleReset = () => {
    setTempFilters({
      정렬: "",
      촬영시기: "",
      스타일: "",
      패키지: "",
      가격: 0,
    });
  };

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

  // 모달이 열릴 때마다 임시 필터 상태를 현재 선택된 필터로 초기화
  useEffect(() => {
    setTempFilters(selectedFilters);
  }, [selectedFilters]);

  // 초기 렌더링 시 선택된 탭으로 스크롤 이동
  useEffect(() => {
    handleTabChange(filterType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    tempFilters.스타일 === value
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
              {Object.keys(priceRangeMap).map((value) => (
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
