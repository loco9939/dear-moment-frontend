'use client';

import { Chip } from '@/components/ui/Chip';
import { useFilteringController } from '../controllers/FilteringController';
import FilteringModal from './FilteringModal';

export default function Filtering() {
  const { open, filterType, selectedFilters, handleFilterClick, setOpen, setSelectedFilters } =
    useFilteringController();

  const { 정렬, 촬영시기, 카메라종류, 보정스타일, 패키지, 가격 } = selectedFilters;
  return (
    <section>
      <menu className="overflow-x-auto scroll">
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
            label={
              Boolean((보정스타일 as string[]).length)
                ? `${(보정스타일 as string[])[0]} 외 ${(보정스타일 as string[]).length - 1}`
                : '보정 스타일'
            }
            active
            background={Boolean((보정스타일 as string[]).length) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('보정스타일')}
          />
          <Chip
            label={Boolean(패키지) ? (패키지 as string) : '패키지'}
            active
            background={Boolean(패키지) ? 'inverse' : 'default'}
            onClick={() => handleFilterClick('패키지')}
          />
          <Chip
            label="가격"
            active
            background={Boolean(가격) ? 'inverse' : 'default'}
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
