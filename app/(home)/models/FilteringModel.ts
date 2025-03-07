import { FilterType, FilterValue } from '../type';

// 필터링 관련 상수와 타입 정의
export const PRICE_RANGE_MAP = {
  '20만원 이하': [0, 20],
  '20~40만원대': [21, 40],
  '40~60만원대': [41, 60],
  '60~80만원대': [61, 80],
  '80만원 이상': [81, 100],
} as const;

export const SORT_OPTIONS = ['최신순', '인기순', '좋아요순'] as const;
export const CAMERA_OPTIONS = ['디지털', '필름'] as const;
export const SHOOTING_PERIOD_OPTIONS = ['2025년 상반기', '2025년 하반기', '2026년 상반기'] as const;
export const STYLE_OPTIONS = ['빈티지한', '우아한', '따뜻한', '모던한', '클래식한'] as const;
export const PACKAGE_OPTIONS = ['있음', '없음'] as const;

// 필터 초기 상태
export const INITIAL_FILTER_STATE: Record<FilterType, FilterValue> = {
  정렬: '',
  촬영시기: '',
  카메라종류: '',
  보정스타일: [],
  패키지: '',
  가격: [],
};

// 필터 관련 유틸리티 함수들
export class FilteringUtils {
  static getCurrentPriceButton(price: number): string {
    const selectedRange = Object.entries(PRICE_RANGE_MAP).find(([, range]) => {
      return price >= range[0] && price <= range[1];
    });
    return selectedRange ? selectedRange[0] : '';
  }

  static getPriceRange(value: string) {
    return PRICE_RANGE_MAP[value as keyof typeof PRICE_RANGE_MAP];
  }
}
