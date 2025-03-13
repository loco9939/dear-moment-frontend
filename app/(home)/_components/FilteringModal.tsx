'use client';

import { Icon_Cancel } from '@/assets/icons';
import { Appbar } from '@/components/Appbar';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Dispatch, SetStateAction } from 'react';
import { FilterType, FilterValue } from '../type';
import { FilteringItems } from './FilteringItems';

interface FilteringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterType: FilterType;
  selectedFilters: Record<FilterType, FilterValue>;
  setSelectedFilters: Dispatch<SetStateAction<Record<FilterType, FilterValue>>>;
}

export default function FilteringModal({
  open,
  onOpenChange,
  filterType,
  selectedFilters,
  setSelectedFilters,
}: FilteringModalProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="container h-full bg-common-0">
        <SheetTitle>
          <Appbar
            title="필터"
            className="text-gray-95"
            rightIcon={<Icon_Cancel className="cursor-pointer" onClick={() => onOpenChange(false)} />}
          />
        </SheetTitle>

        {/* 스크롤 가능한 컨테이너 추가 */}
        <div className="overflow-y-auto mt-[3.3rem] px-[2rem] h-[calc(100%-198px)]">
          <FilteringItems
            filterType={filterType}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            onOpenChange={onOpenChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
