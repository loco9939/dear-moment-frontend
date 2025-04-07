'use client';

import { Chip } from '@/components/ui/Chip';
import { Dispatch, SetStateAction } from 'react';
import { MainPageProduct } from '../../api/products/types';
import { useFilteringController } from '../controllers/FilteringController';
import {
  CAMERA_DISPLAY_MAP,
  PACKAGE_DISPLAY_MAP,
  SHOOTING_PERIOD_DISPLAY_MAP,
  SORT_DISPLAY_MAP,
  STYLE_DISPLAY_MAP,
} from '../models/FilteringModel';
import { CameraType, PackageType, PriceRange, RetouchStyle, ShootingPeriod, SortOption } from '../type';
import FilteringModal from './FilteringModal';

interface FilteringProps {
  setMainProducts: Dispatch<SetStateAction<MainPageProduct[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  fetchMainProducts?: () => Promise<void>;
}

export default function Filtering({ setMainProducts, setLoading, setError, fetchMainProducts }: FilteringProps) {
  const { open, filterType, selectedFilters, handleFilterClick, setOpen, setSelectedFilters, applyFiltersAndSearch } =
    useFilteringController({
      setMainProducts,
      setLoading,
      setError,
      fetchMainProducts,
    });

  const { sortBy, shootingPeriod, cameraType, retouchStyle, packageType, priceRange } = selectedFilters;

  // 가격 범위 표시 텍스트 생성
  const getPriceRangeText = (priceRange: PriceRange) => {
    // 가격이 선택되지 않았거나 min, max가 없는 경우
    if (!priceRange.min && !priceRange.max) return '가격';
    if (priceRange.min && priceRange.min === 201) return '200만원 초과';
    if (priceRange.max && priceRange.max > 200) return `${priceRange.min}만원 - 200만원 초과`;
    return `${priceRange.min}만원 - ${priceRange.max}만원`;
  };

  // 보정 스타일 리스트 및 표시 텍스트 생성
  const retouchStyleList = retouchStyle as RetouchStyle[];
  const retouchStyleText =
    retouchStyleList.length > 0
      ? `${STYLE_DISPLAY_MAP[retouchStyleList[0]] || retouchStyleList[0]} ${
          retouchStyleList.length > 1 ? `외 ${retouchStyleList.length - 1}` : ''
        }`
      : '';

  // 촬영 시기 리스트 및 표시 텍스트 생성
  const shootingPeriodList = shootingPeriod as ShootingPeriod[];
  const shootingPeriodText =
    shootingPeriodList.length > 0
      ? `${SHOOTING_PERIOD_DISPLAY_MAP[shootingPeriodList[0]] || shootingPeriodList[0]} ${
          shootingPeriodList.length > 1 ? `외 ${shootingPeriodList.length - 1}` : ''
        }`
      : '';

  // 카메라 종류 리스트 및 표시 텍스트 생성
  const cameraTypeList = cameraType as CameraType[];
  const cameraTypeText =
    cameraTypeList.length > 0
      ? `${CAMERA_DISPLAY_MAP[cameraTypeList[0]] || cameraTypeList[0]} ${
          cameraTypeList.length > 1 ? `외 ${cameraTypeList.length - 1}` : ''
        }`
      : '';

  // 패키지 리스트 및 표시 텍스트 생성
  const packageList = packageType as PackageType[];
  const packageText =
    packageList.length > 0
      ? `${PACKAGE_DISPLAY_MAP[packageList[0]] || packageList[0]} ${
          packageList.length > 1 ? `외 ${packageList.length - 1}` : ''
        }`
      : '';
  return (
    <section>
      <menu className="overflow-x-auto scroll scrollbar-hide mx-[2rem]">
        <div className="flex gap-2">
          <Chip
            label={Boolean(sortBy) ? SORT_DISPLAY_MAP[sortBy as SortOption] || (sortBy as SortOption) : '정렬'}
            active
            background={Boolean(sortBy) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('sortBy')}
          />
          <Chip
            label={Boolean(shootingPeriodList.length) ? shootingPeriodText : '촬영 시기'}
            active
            background={Boolean(shootingPeriodList.length) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('shootingPeriod')}
          />
          <Chip
            label={Boolean(cameraTypeList.length) ? cameraTypeText : '카메라 종류'}
            active
            background={Boolean(cameraTypeList.length) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('cameraType')}
          />
          <Chip
            label={Boolean(retouchStyleList.length) ? retouchStyleText : '보정 스타일'}
            active
            background={Boolean(retouchStyleList.length) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('retouchStyle')}
          />
          <Chip
            label={Boolean(packageList.length) ? packageText : '패키지'}
            active
            background={Boolean(packageList.length) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('packageType')}
          />
          <Chip
            label={getPriceRangeText(priceRange as PriceRange)}
            active
            background={
              Boolean((priceRange as PriceRange).min !== undefined && (priceRange as PriceRange).max !== undefined)
                ? 'inverse'
                : 'default'
            }
            onClick={() => handleFilterClick('priceRange')}
          />
        </div>
      </menu>

      <FilteringModal
        open={open}
        onOpenChange={setOpen}
        filterType={filterType}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        applyFiltersAndSearch={applyFiltersAndSearch}
      />
    </section>
  );
}
