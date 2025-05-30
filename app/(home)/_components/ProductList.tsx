import { searchMainPageProducts } from '@/api/products';
import { MainPageProduct, ProductSearchFilter } from '@/api/products/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useRef, useState } from 'react';
import { FilterType, FilterValue, PriceRange } from '../type';
import ProductCard from './ProductCard';

interface ProductListProps {
  mainProducts?: MainPageProduct[];
  loading?: boolean;
  error?: string | null;
  filterOptions?: Record<FilterType, FilterValue>; // 필터 옵션 추가
}

export default function ProductList({ mainProducts = [], loading, error, filterOptions }: ProductListProps) {
  // 상품 목록 상태 관리
  const [products, setProducts] = useState<MainPageProduct[]>(mainProducts);
  // 페이지네이션 상태 관리
  const [page, setPage] = useState<number>(0);
  // 추가 로딩 상태 관리 (기존 loading은 초기 로딩에만 사용)
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  // 모든 데이터를 불러왔는지 확인하는 상태
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 스크롤 관찰 대상 요소 참조
  const observerTarget = useRef<HTMLDivElement>(null);
  // 스크롤 컨테이너 참조
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  // 필터 옵션을 API 호출 형식으로 변환하는 함수
  const convertFiltersToApiFormat = (filters: Record<FilterType, FilterValue>): ProductSearchFilter => {
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

  // 초기 상품 목록이 변경되면 상태 업데이트
  useEffect(() => {
    if (mainProducts.length > 0) {
      setProducts(mainProducts);
    }
  }, [mainProducts]);

  // 추가 상품 로드 함수
  const loadMoreProducts = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;

      // 필터 옵션 변환
      const searchFilters = filterOptions ? convertFiltersToApiFormat(filterOptions) : {};
      console.log('검색 필터:', searchFilters);

      // 실제 API 호출 (필터 옵션 전달)
      const response = await searchMainPageProducts(nextPage, 10, searchFilters);

      if (response.success && response.data) {
        const newProducts = response.data.content;

        if (newProducts.length > 0) {
          setProducts(prev => [...prev, ...newProducts]);
          setPage(nextPage);
        }

        // 더 이상 불러올 데이터가 없는 경우
        if (newProducts.length === 0) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }

      setLoadingMore(false);
    } catch (error) {
      console.error('추가 상품 로드 실패:', error);
      setLoadingMore(false);
      setHasMore(false);
    }
  };

  // Intersection Observer를 사용한 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && !loadingMore && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 } // 10% 이상 보이면 콜백 실행
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loadingMore, hasMore]);

  return (
    <section className="px-[2rem]">
      <p className="mb-[2rem] mt-[2.4rem] text-body1Normal font-bold text-gray-90">지금 가장 HOT한 스냅 작가!</p>

      <ul
        ref={scrollContainerRef}
        className="relative h-[calc(100vh-20rem)] space-y-[1.7rem] overflow-y-auto scrollbar-hide"
      >
        {loading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">{error}</div>
        )}
        {products.length === 0 && !loading && !error && (
          <div className="relative rounded py-4 text-center text-body1Normal font-semibold text-gray-90">
            상품이 없습니다.
          </div>
        )}
        {products.map((product, index) => (
          <li
            key={`${product.productId}-${index}`}
            className="w-full"
            style={{
              marginBottom: index === products.length - 1 ? '2rem' : undefined,
            }}
          >
            <ProductCard isFirst={index === 0} mainProduct={product} />
          </li>
        ))}

        {/* 무한 스크롤 관찰 대상 */}
        <div ref={observerTarget} className="h-[10px] w-full"></div>

        {/* 추가 로딩 표시 */}
        {loadingMore && (
          <div className="flex justify-center py-4">
            <LoadingSpinner size={30} />
          </div>
        )}

        {/* 더 이상 불러올 데이터가 없는 경우 */}
        {!hasMore && products.length > 0 && (
          <div className="text-caption1Normal text-center text-gray-60">모든 상품을 불러왔습니다.</div>
        )}
      </ul>
    </section>
  );
}
