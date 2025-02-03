import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilteringUtils, INITIAL_FILTER_STATE } from "../models/FilteringModel";
import { FilterType, FilterValue } from "../type";

interface UseFilteringTabsProps {
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
  onOpenChange: (open: boolean) => void;
}

export function useFilteringTabsController({
  filterType,
  selectedFilters,
  setSelectedFilters,
  onOpenChange,
}: UseFilteringTabsProps) {
  // 임시 필터 상태 관리
  const [tempFilters, setTempFilters] =
    useState<Record<FilterType, FilterValue>>(selectedFilters);

  // 필터 선택 핸들러
  const handleFilterSelect = (section: FilterType, value: string) => {
    if (section === "가격") {
      const range = FilteringUtils.getPriceRange(value);
      if (range) {
        setTempFilters((prev) => ({
          ...prev,
          가격: range[0],
        }));
      }
    } else if (section === "스타일") {
      // 스타일 다중 선택 로직
      setTempFilters((prev) => {
        const currentStyles = Array.isArray(prev[section]) ? prev[section] : [];
        const updatedStyles = currentStyles.includes(value)
          ? currentStyles.filter((style) => style !== value)
          : [...currentStyles, value];

        return {
          ...prev,
          [section]: updatedStyles,
        };
      });
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
      가격: value[0],
    }));
  };

  // 초기화 핸들러
  const handleReset = () => {
    setTempFilters(INITIAL_FILTER_STATE);
  };

  // 적용 핸들러
  const handleApply = () => {
    setSelectedFilters(tempFilters);
    onOpenChange(false);
  };

  // 탭 변경 핸들러
  const handleTabChange = (value: string) => {
    const element = document.getElementById(value);
    if (element) {
      const scrollContainer = element.closest(".overflow-y-auto");
      if (scrollContainer) {
        const topOffset = element.offsetTop;
        scrollContainer.scrollTo({
          top: topOffset - 60,
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
  }, [filterType]);

  return {
    tempFilters,
    handleFilterSelect,
    handleSliderChange,
    getCurrentPriceButton: FilteringUtils.getCurrentPriceButton,
    handleReset,
    handleApply,
    handleTabChange,
  };
}
