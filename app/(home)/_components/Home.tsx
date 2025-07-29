'use client';

import { useEffect, useState } from 'react';
import { useFilteringController } from '../controllers/FilteringController';
import { FilterType, FilterValue } from '../type';
import Filtering from './Filtering';
import ProductList from './ProductList';

export default function Home() {
  // 필터 옵션 상태 관리 - localStorage에서 불러온 값으로 초기화
  const [filterOptions, setFilterOptions] = useState<Record<FilterType, FilterValue>>(() => {
    if (typeof window === 'undefined') return {} as Record<FilterType, FilterValue>;

    const savedFilters = localStorage.getItem('productListFilters');
    return savedFilters ? JSON.parse(savedFilters) : {};
  });

  // FilteringController에서 필요한 필터링 관련 상태 및 핸들러 가져오기
  const { open, filterType, selectedFilters, handleFilterClick, setOpen, setSelectedFilters } = useFilteringController({
    // React Query가 데이터를 관리하므로 더미 함수 전달
    setMainProducts: () => {},
    setLoading: () => {},
    setError: () => {},
    type: 'main',
  });

  // 필터 옵션이 변경되면 selectedFilters와 동기화
  useEffect(() => {
    if (filterOptions) {
      setSelectedFilters(prev => ({
        ...prev,
        ...filterOptions,
      }));
    }
  }, [filterOptions]);

  // 필터 적용 시 호출되는 핸들러
  const handleApplyFilters = (filters: Record<FilterType, FilterValue>): Promise<void> => {
    // 필터 옵션 업데이트 - 이로 인해 ProductList의 useQuery가 자동으로 재실행됨
    const newFilters = {
      ...filterOptions,
      ...filters,
    };

    setFilterOptions(newFilters);

    // localStorage에 필터 옵션 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('productListFilters', JSON.stringify(newFilters));
    }

    // 필터 모달 닫기
    setOpen(false);

    return Promise.resolve();
  };

  return (
    <div className="space-y-4">
      <Filtering
        open={open}
        filterType={filterType}
        selectedFilters={selectedFilters}
        handleFilterClick={handleFilterClick}
        setOpen={setOpen}
        setSelectedFilters={setSelectedFilters}
        applyFiltersAndSearch={handleApplyFilters}
      />
      <ProductList
        filterOptions={filterOptions || {}} // undefined 방지를 위해 빈 객체 전달
      />
    </div>
  );
}
