import { Dispatch, SetStateAction, useState } from 'react';
import { searchMainPageProducts } from '../../api/products';
import { searchLikeMainPageProducts, searchLikeMainPageStudios } from '../../api/likes';
import { MainPageProduct } from '../../api/products/types';
import { MainLikeProduct, MainLikeStudio } from '../../api/likes/types';
import { FilteringService } from '../services/FilteringService';
import { PagedResponse } from '../../api/common/types';
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

// 메인 페이지 상태값 전달(로딩, 에러, 상품)
interface UseFilteringControllerProps {
  setMainProducts: (products: MainPageProduct[] | MainLikeProduct[] | MainLikeStudio[]) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  fetchMainProducts?: () => Promise<void>; // 메인 페이지 상품 목록을 가져오는 함수
  type: 'main' | 'likeProduct' | 'likeStudio';
}

export function useFilteringController({
  setMainProducts,
  setLoading,
  setError,
  fetchMainProducts,
  type,
}: UseFilteringControllerProps) {
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>('sortBy');

  // 각 타입별로 필터 상태를 분리하여 관리
  const [mainFilters, setMainFilters] = useState<Record<FilterType, FilterValue>>(
    FilteringService.getInitialFilterState()
  );
  const [productFilters, setProductFilters] = useState<Record<FilterType, FilterValue>>(
    FilteringService.getInitialFilterState()
  );
  const [studioFilters, setStudioFilters] = useState<Record<FilterType, FilterValue>>(
    FilteringService.getInitialFilterState()
  );

  // 현재 타입에 맞는 필터 상태를 선택
  const selectedFilters = type === 'main' ? mainFilters : type === 'likeProduct' ? productFilters : studioFilters;

  const setSelectedFilters =
    type === 'main' ? setMainFilters : type === 'likeProduct' ? setProductFilters : setStudioFilters;

  const handleFilterClick = (type: FilterType) => {
    setFilterType(type);
    setOpen(true);
  };

  // 필터를 적용하여 검색 API 호출하는 함수
  const applyFiltersAndSearch = async (filters: Record<FilterType, FilterValue>) => {
    try {
      setLoading(true);
      setError(null);

      // 필터가 초기화되었는지 확인
      const isInitialState = isFilterInitialState(filters);

      // 필터가 초기화된 경우 기본 메인 페이지 데이터를 가져옴
      if (isInitialState && fetchMainProducts) {
        await fetchMainProducts();
        return;
      }

      // 필터 데이터 변환
      const searchFilters = {
        sortBy: filters.sortBy ? [filters.sortBy as SortOption] : [],
        availableSeasons: (filters.shootingPeriod as ShootingPeriod[]) || [],
        cameraTypes: (filters.cameraType as CameraType[]) || [],
        retouchStyles: (filters.retouchStyle as RetouchStyle[]) || [],
        partnerShopCategories: (filters.packageType as PackageType[]) || [],
        minPrice: ((filters.priceRange as PriceRange).min || 0) * 10000,
        maxPrice: ((filters.priceRange as PriceRange).max || 100) * 10000,
      };

      let response;
      // 검색 API 호출
      if (type === 'main') {
        response = await searchMainPageProducts(0, 10, searchFilters);
      } else if (type === 'likeProduct') {
        response = await searchLikeMainPageProducts(searchFilters);
      } else if (type === 'likeStudio') {
        response = await searchLikeMainPageStudios(searchFilters);
      }

      if (response && response.success && response.data) {
        setMainProducts(
          type === 'main'
            ? (response.data as PagedResponse<MainPageProduct>).content
            : type === 'likeProduct'
            ? (response.data as unknown as MainLikeProduct[])
            : (response.data as unknown as MainLikeStudio[])
        );
      } else {
        setError('상품 검색에 실패했습니다.');
        // NOTE: 오류 발생 시 상품 목록을 초기화하지 않음
        // setMainProducts([]);
      }
    } catch (error) {
      console.error('상품 검색 실패:', error);

      setError('상품 검색 중 오류가 발생했습니다.');
      // NOTE: 오류 발생 시 상품 목록을 초기화하지 않음
      // setMainProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // 필터가 초기 상태인지 확인하는 함수
  const isFilterInitialState = (filters: Record<FilterType, FilterValue>): boolean => {
    const initialState = FilteringService.getInitialFilterState();

    // 정렬 옵션 확인
    if (filters.sortBy !== initialState.sortBy) return false;

    // 촬영시기 확인 (배열)
    const shootingPeriods = filters.shootingPeriod as ShootingPeriod[];
    if (shootingPeriods && shootingPeriods.length > 0) return false;

    // 카메라종류 확인 (배열)
    const cameraTypes = filters.cameraType as CameraType[];
    if (cameraTypes && cameraTypes.length > 0) return false;

    // 보정스타일 확인 (배열)
    const retouchStyles = filters.retouchStyle as RetouchStyle[];
    if (retouchStyles && retouchStyles.length > 0) return false;

    // 패키지 확인 (배열)
    const packageTypes = filters.packageType as PackageType[];
    if (packageTypes && packageTypes.length > 0) return false;

    // 가격 범위 확인
    const priceRange = filters.priceRange as PriceRange;
    const initialPriceRange = initialState.priceRange as PriceRange;

    if (priceRange.min !== initialPriceRange.min || priceRange.max !== initialPriceRange.max) {
      return false;
    }

    // 모든 필터가 초기 상태와 동일함
    return true;
  };

  return {
    open,
    filterType,
    selectedFilters,
    handleFilterClick,
    setOpen,
    setSelectedFilters,
    applyFiltersAndSearch,
  };
}
