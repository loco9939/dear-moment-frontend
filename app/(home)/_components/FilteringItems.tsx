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

  return (
    <div className="space-y-[2.2rem]">
      {Object.keys(tempFilters)
        .filter(title => title !== 'priceRange')
        .map(title => {
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
      <div className="space-y-[1.8rem]">
        <p className="text-body2Normal font-semibold text-gray-95">가격</p>
        <div className="flex justify-start items-center gap-[1.2rem]">
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
              className="w-[10rem]"
              onChange={e => {
                const value = e.target.value ? parseInt(e.target.value, 10) : 0;
                handlePriceRangeChange(value, 'max');
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end bg-white gap-[1rem] absolute bottom-0 right-0 w-full pb-[1.2rem] px-[2rem] h-[10rem]">
        <button
          className="w-[8.9rem] bg-red-0 text-body1Normal font-semibold rounded-[0.4rem] border border-red-40 text-red-40 h-[56px]"
          onClick={handleReset}
        >
          초기화
        </button>
        <button
          className="w-full bg-red-40 text-body1Normal font-semibold rounded-[0.4rem] text-gray-10 h-[56px]"
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
