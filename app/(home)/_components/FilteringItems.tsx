'use client';

import { Chip } from '@/components/ui/Chip';
import { Dispatch, SetStateAction } from 'react';
import { useFilteringTabsController } from '../controllers/FilteringTabsController';
import { FilteringService } from '../services/FilteringService';
import { FilterType, FilterValue } from '../type';

interface FilteringItemsProps {
  onOpenChange: (open: boolean) => void;
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
}

export const FilteringItems = ({
  onOpenChange,
  filterType,
  selectedFilters,
  setSelectedFilters,
}: FilteringItemsProps) => {
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

  const {
    getSortOptions,
    getShootingPeriodOptions,
    getCameraOptions,
    getStyleOptions,
    getPackageOptions,
    getPriceRangeOptions,
  } = FilteringService;

  const displayCategory: Record<FilterType, readonly string[]> = {
    정렬: getSortOptions(),
    촬영시기: getShootingPeriodOptions(),
    카메라종류: getCameraOptions(),
    보정스타일: getStyleOptions(),
    패키지: getPackageOptions(),
    가격: getPriceRangeOptions(),
  };

  return (
    <div className="space-y-[2.2rem]">
      {Object.keys(tempFilters).map(title => {
        return <Category key={title} title={title} items={displayCategory[title as FilterType]} />;
      })}
      <div className="flex justify-between items-end bg-white gap-[1rem] absolute bottom-0 right-0 w-full pb-[1.2rem] px-[2rem] h-[10rem]">
        <button className="w-[8.9rem] bg-gray-80 h-[56px]" onClick={handleReset}>
          초기화
        </button>
        <button className="w-[22.1rem] bg-common-100 h-[56px]" onClick={handleApply}>
          적용
        </button>
      </div>
    </div>
  );
};

const Category = ({ title, items }: { title: string; items: readonly string[] }) => {
  return (
    <div className="space-y-[1.8rem]">
      <p className="text-body2Normal font-semibold text-gray-95">{title}</p>
      <div className="flex flex-wrap gap-[0.6rem]">
        {items.map(item => {
          return <Chip key={item} label={item} />;
        })}
      </div>
    </div>
  );
};
