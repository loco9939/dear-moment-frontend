import { MainPageProduct, ProductSearchFilter } from '@/api/products/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useRef } from 'react';
import { useProducts } from '../hooks/products/useProducts';
import { useScroll } from '../hooks/useScroll';
import { FilterType, FilterValue, PriceRange } from '../type';
import ProductCard from './ProductCard';

interface ProductListProps {
  mainProducts?: MainPageProduct[];
  loading?: boolean;
  error?: string | null;
  filterOptions?: Record<FilterType, FilterValue>; // 필터 옵션 추가
}

export default function ProductList({
  mainProducts = [],
  loading: initialLoading,
  error: initialError,
  filterOptions,
}: ProductListProps) {
  // 스크롤 관찰 대상 요소 참조
  const observerTarget = useRef<HTMLDivElement>(null);
  // 스크롤 컨테이너 참조
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  // 필터 옵션을 API 호출 형식으로 변환하는 함수
  const convertFiltersToApiFormat = (filters?: Record<FilterType, FilterValue>): ProductSearchFilter => {
    if (!filters) {
      return {
        sortBy: [],
        availableSeasons: [],
        cameraTypes: [],
        retouchStyles: [],
        partnerShopCategories: [],
        minPrice: 0,
        maxPrice: 1000000,
      };
    }
    // FilteringController.ts의 변환 로직 참고
    return {
      sortBy: filters.sortBy ? [filters.sortBy as string] : [],
      availableSeasons: (Array.isArray(filters.shootingPeriod) ? filters.shootingPeriod : []) as string[],
      cameraTypes: (Array.isArray(filters.cameraType) ? filters.cameraType : []) as string[],
      retouchStyles: (Array.isArray(filters.retouchStyle) ? filters.retouchStyle : []) as string[],
      partnerShopCategories: (Array.isArray(filters.packageType) ? filters.packageType : []) as string[],
      minPrice:
        filters.priceRange &&
        typeof filters.priceRange === 'object' &&
        (filters.priceRange as PriceRange).min !== undefined
          ? ((filters.priceRange as unknown as PriceRange).min as number) * 10000
          : 0,
      maxPrice:
        filters.priceRange &&
        typeof filters.priceRange === 'object' &&
        (filters.priceRange as PriceRange).max !== undefined
          ? ((filters.priceRange as unknown as PriceRange).max as number) * 10000
          : 1000000, // 기본값 100만원
    };
  };
  // React Query를 사용한 상품 데이터 가져오기
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useProducts({
    initialData: mainProducts,
    filters: convertFiltersToApiFormat(filterOptions),
  });

  // 스크롤 위치 추적 및 복원
  useScroll({ scrollContainerRef, filterOptions });

  // 무한 스크롤을 위한 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 } // 10% 이상 보이면 콜백 실행
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 로딩 및 에러 상태
  const isLoading = initialLoading;
  const isError = status === 'error' || initialError;

  // 모든 페이지의 상품을 하나의 배열로 병합
  const allProducts = data?.pages.flatMap(page => page.content) || [];

  return (
    <section className="px-[2rem]">
      <p className="mb-[2rem] mt-[2.4rem] text-body1Normal font-bold text-gray-90">지금 가장 HOT한 스냅 작가!</p>

      <ul
        ref={scrollContainerRef}
        className="relative h-[calc(100vh-20rem)] space-y-[1.7rem] overflow-y-auto scrollbar-hide"
      >
        {isLoading && allProducts.length === 0 && (
          <div className="flex h-64 items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {isError && (
          <div className="py-10 text-center text-red-500">
            <p>상품을 불러오는 중 오류가 발생했습니다.</p>
            <p>{error?.message || initialError}</p>
          </div>
        )}
        {allProducts.length === 0 && !isLoading && !isError && (
          <div className="relative rounded py-4 text-center text-body1Normal font-semibold text-gray-90">
            상품이 없습니다.
          </div>
        )}
        {allProducts.map((product, index) => (
          <li
            key={`${product.productId}-${index}`}
            className="w-full"
            style={{
              marginBottom: index === allProducts.length - 1 ? '2rem' : undefined,
            }}
          >
            <ProductCard isFirst={index === 0} mainProduct={product} />
          </li>
        ))}

        {/* 무한 스크롤 관찰 대상 */}
        <div ref={observerTarget} className="h-[10px] w-full"></div>

        {/* 추가 로딩 표시 */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <LoadingSpinner size={30} />
          </div>
        )}

        {/* 더 이상 불러올 데이터가 없는 경우 */}
        {!hasNextPage && allProducts.length > 0 && (
          <div className="text-caption1Normal text-center text-gray-60">모든 상품을 불러왔습니다.</div>
        )}
      </ul>
    </section>
  );
}
