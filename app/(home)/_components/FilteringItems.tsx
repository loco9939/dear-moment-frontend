'use client';

import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';
import { useFilteringItemsController } from '../controllers/FilteringItemsController';
import {
  CAMERA_OPTIONS,
  FILTER_DISPLAY_MAP,
  PACKAGE_OPTIONS,
  SHOOTING_PERIOD_OPTIONS,
  SORT_OPTIONS,
  STYLE_OPTIONS,
} from '../models/FilteringModel';
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
  const { tempFilters, handleFilterSelect, handlePriceRangeChange, handleReset, handleApply } =
    useFilteringItemsController({
      filterType,
      selectedFilters,
      setSelectedFilters,
      onOpenChange,
      applyFiltersAndSearch,
    });

  // 각 필터 옵션의 원본 값 (enum 값)
  const filterOptions: Record<FilterType, readonly string[]> = {
    sortBy: SORT_OPTIONS,
    shootingPeriod: SHOOTING_PERIOD_OPTIONS,
    cameraType: CAMERA_OPTIONS,
    retouchStyle: STYLE_OPTIONS,
    packageType: PACKAGE_OPTIONS,
    priceRange: ['min', 'max'] as readonly string[],
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

  // 필터 항목을 원하는 순서대로 정렬하기 위한 배열 정의
  const filterOrder: FilterType[] = [
    'sortBy',
    'priceRange',
    'shootingPeriod',
    'cameraType',
    'retouchStyle',
    'packageType',
  ];

  return (
    <div className="space-y-[2.2rem]">
      {/* 필터 순서를 지정하여 렌더링 */}
      {filterOrder.map(filterKey => {
        // 가격 범위 필터 렌더링
        if (filterKey === 'priceRange') {
          return (
            <div key={filterKey} className="space-y-[1.8rem]">
              <p className="text-body2Normal font-semibold text-gray-95">가격</p>
              <div className="flex items-center justify-start gap-[1.2rem]">
                <div className="h-auto">
                  <label htmlFor="min-price" className="text-caption1Normal text-gray-80">
                    최소 가격 (만원)
                  </label>
                  <Input
                    id="min-price"
                    type="number"
                    value={min || ''}
                    placeholder="0"
                    className="w-[10rem]"
                    onChange={e => {
                      const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                      handlePriceRangeChange(value, 'min');
                    }}
                  />
                </div>
                <span className="text-caption1Normal text-gray-80">~</span>
                <div className="h-auto">
                  <label htmlFor="max-price" className="text-caption1Normal text-gray-80">
                    최대 가격 (만원)
                  </label>
                  <Input
                    id="max-price"
                    type="number"
                    value={max || ''}
                    placeholder="최대금액 입력"
                    className="w-[12rem]"
                    onChange={e => {
                      const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                      handlePriceRangeChange(value, 'max');
                    }}
                  />
                </div>
              </div>
            </div>
          );
        }

        // 다른 필터 항목 렌더링
        return (
          <Category
            key={filterKey}
            title={filterKey}
            items={filterOptions[filterKey]}
            tempFilters={tempFilters}
            handleFilterSelect={handleFilterSelect}
            getDisplayText={getDisplayText}
          />
        );
      })}

      <div className="absolute bottom-0 right-0 flex h-[10rem] w-full items-end justify-between gap-[1rem] bg-white px-[2rem] pb-[1.2rem]">
        <button
          className="bg-red-0 h-[56px] w-[8.9rem] rounded-[0.4rem] border border-red-40 text-body1Normal font-semibold text-red-40"
          onClick={handleReset}
        >
          초기화
        </button>
        <button
          className="h-[56px] w-full rounded-[0.4rem] bg-red-40 text-body1Normal font-semibold text-gray-10"
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
      <div className="flex flex-wrap gap-[1.2rem]">
        {items.map(item => {
          const isSelected = Array.isArray(tempFilters[title])
            ? (tempFilters[title] as string[]).includes(item)
            : tempFilters[title] === item;

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
