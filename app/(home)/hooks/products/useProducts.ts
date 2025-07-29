'use client';

import { searchMainPageProducts } from '@/api/products';
import { MainPageProduct, ProductSearchFilter } from '@/api/products/types';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseProductsProps {
  initialData?: MainPageProduct[];
  filters?: ProductSearchFilter;
  pageSize?: number;
}

export function useProducts({ initialData = [], filters = {}, pageSize = 10 }: UseProductsProps = {}) {
  return useInfiniteQuery({
    queryKey: ['products', filters], // 필터가 변경되면 쿼리 키가 변경되어 자동으로 다시 가져옴
    queryFn: async ({ pageParam = 0 }) => {
      const response = await searchMainPageProducts(pageParam, pageSize, filters);
      if (!response.success) {
        throw new Error('상품을 불러오는 데 실패했습니다.');
      }
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지가 비어있거나 전체 페이지 크기가 pageSize보다 작으면 더 이상 로드할 페이지가 없음
      if (!lastPage || lastPage.content.length < pageSize) {
        return undefined;
      }
      return allPages.length; // 다음 페이지 번호 반환
    },
    initialData:
      initialData.length > 0
        ? {
            pages: [
              { content: initialData, totalElements: initialData.length, page: 0, size: pageSize, totalPages: 1 },
            ],
            pageParams: [0],
          }
        : undefined,
    staleTime: 5 * 60 * 1000, // 5분 동안 신선한 데이터로 간주
    gcTime: 10 * 60 * 1000, // 10분 동안 캐시 유지
  });
}
