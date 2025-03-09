'use client';

import { Chip } from '@/components/ui/Chip';
import { useFilteringController } from '../controllers/FilteringController';
import { PriceRange } from '../type';
import FilteringModal from './FilteringModal';

export default function Filtering() {
  const { open, filterType, selectedFilters, handleFilterClick, setOpen, setSelectedFilters } =
    useFilteringController();

  const { 정렬, 촬영시기, 카메라종류, 보정스타일, 패키지, 가격 } = selectedFilters;

  // 가격 범위 표시 텍스트 생성
  const getPriceRangeText = (priceRange: PriceRange) => {
    // 가격이 선택되지 않았거나 min, max가 없는 경우
    if (priceRange.min === undefined || priceRange.max === undefined) return '가격';

    if (priceRange.min === 0 && priceRange.max === 30) return '30만원 이하';
    if (priceRange.min === 70) return '70만원 이상';
    return `${priceRange.min}-${priceRange.max}만원`;
  };

  const 보정스타일선택값리스트 = 보정스타일 as string[];
  const 보정스타일텍스트 = `${보정스타일선택값리스트[0]} ${
    보정스타일선택값리스트.length > 1 ? `외 ${보정스타일선택값리스트.length - 1}` : ''
  }`;
  return (
    <section>
      <menu className="overflow-x-auto scroll scrollbar-hide">
        <div className="flex gap-2">
          <Chip
            label={Boolean(정렬) ? (정렬 as string) : '정렬'}
            active
            background={Boolean(정렬) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('정렬')}
          />
          <Chip
            label={Boolean(촬영시기) ? (촬영시기 as string) : '촬영 시기'}
            active
            background={Boolean(촬영시기) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('촬영시기')}
          />
          <Chip
            label={Boolean(카메라종류) ? (카메라종류 as string) : '카메라 종류'}
            active
            background={Boolean(카메라종류) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('카메라종류')}
          />
          <Chip
            label={Boolean(보정스타일선택값리스트.length) ? 보정스타일텍스트 : '보정 스타일'}
            active
            background={Boolean(보정스타일선택값리스트.length) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('보정스타일')}
          />
          <Chip
            label={Boolean(패키지) ? (패키지 as string) : '패키지'}
            active
            background={Boolean(패키지) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('패키지')}
          />
          <Chip
            label={getPriceRangeText(가격 as PriceRange)}
            active
            background={Boolean((가격 as PriceRange).min && (가격 as PriceRange).max) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('가격')}
          />
        </div>
      </menu>

      <FilteringModal
        open={open}
        onOpenChange={setOpen}
        filterType={filterType}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </section>
  );
}
