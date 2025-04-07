'use client';

import { Chip } from '@/components/ui/Chip';
import { Slider } from '@/components/ui/slider';
import { Dispatch, SetStateAction } from 'react';
import { useFilteringItemsController } from '../controllers/FilteringItemsController';
import { FILTER_DISPLAY_MAP } from '../models/FilteringModel';
import { FilteringService } from '../services/FilteringService';
import {
  CameraType,
  FilterType,
  FilterValue,
  PackageType,
  PriceRange,
  RetouchStyle,
  ShootingPeriod,
  SortOption,
} from '../type';

interface FilteringItemsProps {
  onOpenChange: (open: boolean) => void;
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
  applyFiltersAndSearch?: (filters: Record<FilterType, FilterValue>) => Promise<void>;
}

export const FilteringItems = ({
  onOpenChange,
  filterType,
  selectedFilters,
  setSelectedFilters,
  applyFiltersAndSearch,
}: FilteringItemsProps) => {
  const { tempFilters, handleFilterSelect, handleSliderChange, handleReset, handleApply } = useFilteringItemsController(
    {
      filterType,
      selectedFilters,
      setSelectedFilters,
      onOpenChange,
      applyFiltersAndSearch,
    }
  );

  const {
    getSortOptions,
    getShootingPeriodOptions,
    getCameraOptions,
    getStyleOptions,
    getPackageOptions,
    getPriceRangeOptions,
  } = FilteringService;

  // 각 필터 옵션의 원본 값 (enum 값)
  const filterOptions: Record<FilterType, readonly string[]> = {
    sortBy: getSortOptions() as unknown as readonly string[],
    shootingPeriod: getShootingPeriodOptions() as unknown as readonly string[],
    cameraType: getCameraOptions() as unknown as readonly string[],
    retouchStyle: getStyleOptions() as unknown as readonly string[],
    packageType: getPackageOptions() as unknown as readonly string[],
    priceRange: getPriceRangeOptions(),
  };

  // 각 필터 옵션의 표시 텍스트 매핑
  const getDisplayText = (type: FilterType, value: string): string => {
    switch (type) {
      case 'sortBy':
        return FilteringService.getSortDisplayMap()[value as SortOption] || value;
      case 'shootingPeriod':
        return FilteringService.getShootingPeriodDisplayMap()[value as ShootingPeriod] || value;
      case 'cameraType':
        return FilteringService.getCameraDisplayMap()[value as CameraType] || value;
      case 'retouchStyle':
        return FilteringService.getStyleDisplayMap()[value as RetouchStyle] || value;
      case 'packageType':
        return FilteringService.getPackageDisplayMap()[value as PackageType] || value;
      default:
        return value;
    }
  };

  const {
    priceRange: { min, max },
  } = tempFilters as Record<FilterType, PriceRange>;

  const priceRangeText = (min?: number, max?: number) => {
    if (!min && !max) return '-';
    if (min && min === 201) return '200만원 초과';
    if (max && max > 200) return `${min}만원 - 200만원 초과`;
    return `${min}만원 - ${max}만원`;
  };

  return (
    <div className="space-y-[2.2rem]">
      {Object.keys(tempFilters).map(title => {
        return (
          <Category
            key={title}
            title={title as FilterType}
            items={filterOptions[title as FilterType]}
            tempFilters={tempFilters}
            handleFilterSelect={handleFilterSelect}
            getDisplayText={getDisplayText}
          />
        );
      })}
      {/* 가격 슬라이더 */}
      <div className="relative pt-[1.8rem]">
        <div className="absolute -top-3 left-4 text-label1Normal font-medium text-common-100">0원</div>
        <div className="absolute -top-3 right-4 text-label1Normal font-medium text-common-100">200만원 초과</div>
        <Slider
          defaultValue={[0, 100]}
          min={0}
          max={201}
          step={1}
          value={[min ?? 0, max ?? 0]}
          onValueChange={handleSliderChange}
        />
        <div className="mt-4 text-center text-label1Normal font-medium text-gray-70">{priceRangeText(min, max)}</div>
      </div>
      <div className="flex justify-between items-end bg-white gap-[1rem] absolute bottom-0 right-0 w-full pb-[1.2rem] px-[2rem] h-[10rem]">
        <button
          className="w-[8.9rem] bg-red-0 text-body1Normal font-semibold rounded-[0.4rem] border border-red-40 text-red-40 h-[56px]"
          onClick={handleReset}
        >
          초기화
        </button>
        <button
          className="w-[22.1rem] bg-red-40 text-body1Normal font-semibold rounded-[0.4rem] text-gray-10 h-[56px]"
          onClick={handleApply}
        >
          적용
        </button>
      </div>
    </div>
  );
};

const Category = ({
  title,
  items,
  tempFilters,
  handleFilterSelect,
  getDisplayText,
}: {
  title: FilterType;
  items: readonly string[];
  tempFilters: Record<FilterType, FilterValue>;
  handleFilterSelect: (section: FilterType, value: string) => void;
  getDisplayText: (type: FilterType, value: string) => string;
}) => {
  return (
    <div className="space-y-[1.8rem]">
      <p className="text-body2Normal font-semibold text-gray-95">{FILTER_DISPLAY_MAP[title]}</p>
      <div className="flex flex-wrap gap-[0.6rem]">
        {items.map(item => {
          let isSelected = false;

          if (title === 'priceRange') {
            // 가격 범위 비교 로직
            const currentRange = tempFilters[title] as PriceRange;
            const buttonRange = FilteringService.getPriceRangeFromValue(item);

            // 현재 선택된 범위와 버튼의 범위가 겹치는지 확인
            isSelected =
              currentRange?.min !== undefined &&
              currentRange?.max !== undefined &&
              buttonRange.min !== undefined &&
              buttonRange.max !== undefined &&
              // 버튼의 최소값이 현재 범위 내에 있거나
              ((buttonRange.min >= currentRange.min && buttonRange.min <= currentRange.max) ||
                // 버튼의 최대값이 현재 범위 내에 있거나
                (buttonRange.max >= currentRange.min && buttonRange.max <= currentRange.max) ||
                // 버튼의 범위가 현재 범위를 포함하는 경우
                (buttonRange.min <= currentRange.min && buttonRange.max >= currentRange.max));
          } else {
            // 기존 로직 유지
            isSelected = Array.isArray(tempFilters[title])
              ? (tempFilters[title] as string[]).includes(item)
              : tempFilters[title] === item;
          }

          return (
            <Chip
              key={item}
              label={getDisplayText(title, item)}
              background={isSelected ? 'inverse' : 'default'}
              onClick={() => handleFilterSelect(title, item)}
            />
          );
        })}
      </div>
    </div>
  );
};
