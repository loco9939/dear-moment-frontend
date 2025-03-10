import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { INITIAL_FILTER_STATE } from '../models/FilteringModel';
import { FilteringService } from '../services/FilteringService';
import { FilterType, FilterValue, PriceRange } from '../type';

interface UseFilteringItemsProps {
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
  onOpenChange: (open: boolean) => void;
}

export function useFilteringItemsController({
  filterType,
  selectedFilters,
  setSelectedFilters,
  onOpenChange,
}: UseFilteringItemsProps) {
  // 임시 필터 상태 관리
  const [tempFilters, setTempFilters] = useState<Record<FilterType, FilterValue>>(selectedFilters);

  // 필터 선택 핸들러
  const handleFilterSelect = (type: FilterType, value: string) => {
    if (type === '가격') {
      // 가격 범위 버튼 클릭 시 처리
      const priceRange = FilteringService.getPriceRangeFromValue(value);
      setTempFilters(prev => {
        const currentRange = prev[type] as PriceRange;
        // 이미 선택된 값과 동일한 범위가 선택되면 초기화
        if (currentRange?.min === priceRange.min && currentRange?.max === priceRange.max) {
          return {
            ...prev,
            [type]: { min: undefined, max: undefined } as PriceRange,
          };
        }
        // 새로운 범위 선택
        return {
          ...prev,
          [type]: priceRange,
        };
      });
    } else if (type === '보정스타일' || type === '촬영시기' || type === '카메라종류') {
      // 스타일 다중 선택 로직
      setTempFilters(prev => {
        const currentStyles = (Array.isArray(prev[type]) ? prev[type] : []) as string[];
        const updatedStyles = currentStyles.includes(value)
          ? currentStyles.filter(style => style !== value)
          : [...currentStyles, value];

        return {
          ...prev,
          [type]: updatedStyles,
        };
      });
    } else {
      setTempFilters(prev => ({
        ...prev,
        [type]: prev[type] === value ? '' : value,
      }));
    }
  };

  // 슬라이더 값 변경 핸들러
  const handleSliderChange = (values: number[]) => {
    const [min, max] = values;

    setTempFilters(prev => ({
      ...prev,
      가격: { min, max } as PriceRange,
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
      const scrollContainer = element.closest('.overflow-y-auto');
      if (scrollContainer) {
        const topOffset = element.offsetTop;
        scrollContainer.scrollTo({
          top: topOffset - 60,
          behavior: 'smooth',
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
    handleReset,
    handleApply,
    handleTabChange,
  };
}
