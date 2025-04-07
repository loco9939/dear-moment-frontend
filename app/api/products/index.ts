// 상품 관련 API 함수 정의

import { API_ENDPOINTS } from '../config';
import { handleApiError } from '../error';
import { get } from '../utils/http';
import { MainPageProductsResponse, ProductDetailResponse, ProductSearchFilter } from './types';

/**
 * 메인 페이지 상품 목록을 가져오는 API
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @returns 페이지네이션된 상품 목록
 */
export async function fetchMainPageProducts(page: number = 0, size: number = 10): Promise<MainPageProductsResponse> {
  try {
    const endpoint = `${API_ENDPOINTS.products.main}?page=${page}&size=${size}`;
    return await get<MainPageProductsResponse>(endpoint);
  } catch (error) {
    console.error('메인 페이지 상품 목록 가져오기 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 상세 정보를 가져오는 API
 * @param id 상품 ID
 * @returns 상품 상세 정보
 */
export async function fetchProductDetail(id: number): Promise<ProductDetailResponse> {
  try {
    const endpoint = API_ENDPOINTS.products.detail(id);
    return await get<ProductDetailResponse>(endpoint);
  } catch (error) {
    console.error('상품 상세 데이터 가져오기 실패:', error);
    throw handleApiError(error);
  }
}

/**
 * 상품 검색
 * @param page 페이지 번호 (0부터 시작)
 * @param size 페이지 크기
 * @param filters 필터 옵션 (필수)
 * @returns 페이지네이션된 상품 목록
 * @example
 * // 필터를 사용한 검색 예시
 * const filters = {
 *   sortBy: ["PRICE_LOW"],
 *   availableSeasons: ["YEAR_2025_FIRST_HALF", "YEAR_2025_SECOND_HALF"],
 *   cameraTypes: ["DIGITAL"],
 *   retouchStyles: ["MODERN", "FAIRYTALE"],
 *   partnerShopCategories: ["HAIR_MAKEUP"],
 *   minPrice: 0,
 *   maxPrice: 100
 * };
 * const result = await searchMainPageProducts(0, 10, filters);
 */
export async function searchMainPageProducts(
  page: number = 0,
  size: number = 10,
  filters: ProductSearchFilter
): Promise<MainPageProductsResponse> {
  try {
    // 필터 데이터를 쿼리 파라미터로 변환
    let queryParams = `page=${page}&size=${size}`;

    // sortBy 파라미터 추가
    if (filters.sortBy && filters.sortBy.length > 0) {
      filters.sortBy.forEach(sort => {
        queryParams += `&sortBy=${encodeURIComponent(sort)}`;
      });
    }

    // availableSeasons 파라미터 추가
    if (filters.availableSeasons && filters.availableSeasons.length > 0) {
      filters.availableSeasons.forEach(season => {
        queryParams += `&availableSeasons=${encodeURIComponent(season)}`;
      });
    }

    // cameraTypes 파라미터 추가
    if (filters.cameraTypes && filters.cameraTypes.length > 0) {
      filters.cameraTypes.forEach(camera => {
        queryParams += `&cameraTypes=${encodeURIComponent(camera)}`;
      });
    }

    // retouchStyles 파라미터 추가
    if (filters.retouchStyles && filters.retouchStyles.length > 0) {
      filters.retouchStyles.forEach(style => {
        queryParams += `&retouchStyles=${encodeURIComponent(style)}`;
      });
    }

    // partnerShopCategories 파라미터 추가
    if (filters.partnerShopCategories && filters.partnerShopCategories.length > 0) {
      filters.partnerShopCategories.forEach(category => {
        queryParams += `&partnerShopCategories=${encodeURIComponent(category)}`;
      });
    }

    // 가격 범위 파라미터 추가
    if (filters.minPrice !== undefined) {
      queryParams += `&minPrice=${filters.minPrice}`;
    }

    if (filters.maxPrice !== undefined) {
      queryParams += `&maxPrice=${filters.maxPrice}`;
    }

    const endpoint = `${API_ENDPOINTS.products.search}?${queryParams}`;

    // GET 요청으로 쿼리 파라미터를 포함하여 전송
    return await get<MainPageProductsResponse>(endpoint);
  } catch (error) {
    console.error('상품 검색 실패:', error);
    throw handleApiError(error);
  }
}
