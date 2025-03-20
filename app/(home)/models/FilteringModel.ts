import { FilterType, FilterValue, PriceRange } from '../type';

// 필터링 관련 상수와 타입 정의
// 가격 범위 매핑 상수
export const PRICE_RANGE_MAP: Record<string, PriceRange> = {
  '30만원 이하': { min: 0, max: 30 },
  '31-49만원': { min: 31, max: 49 },
  '50-69만원': { min: 50, max: 69 },
  '70만원 이상': { min: 70, max: 100 },
} as const;

export const SORT_OPTIONS = ['최신순', '인기순', '좋아요순'] as const;
export const CAMERA_OPTIONS = ['디지털', '필름'] as const;
export const SHOOTING_PERIOD_OPTIONS = ['2025년 상반기', '2025년 하반기', '2026년 상반기'] as const;
export const STYLE_OPTIONS = ['빈티지한', '우아한', '따뜻한', '모던한', '클래식한'] as const;
export const PACKAGE_OPTIONS = ['있음', '없음'] as const;

// 필터 초기 상태
export const INITIAL_FILTER_STATE: Record<FilterType, FilterValue> = {
  정렬: '',
  촬영시기: [],
  카메라종류: [],
  보정스타일: [],
  패키지: '',
  가격: { min: undefined, max: undefined },
};
